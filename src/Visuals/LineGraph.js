import React, { useState, useEffect, useRef } from "react";
import { select, scaleLinear, scaleTime, axisBottom, axisLeft, line, extent } from 'd3';
import * as d3 from 'd3';
import '../components/css/LineGraph.css'

const margin = { top: 40, right: 40, bottom: 60, left: 80 };

export default function LineGraph({ data }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Set dimensions to wrapper's client width and height
    useEffect(() => {
        const currentWrapperRef = wrapperRef.current;
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            });
        });

        resizeObserver.observe(currentWrapperRef);

        return () => {
            resizeObserver.unobserve(currentWrapperRef);
        };
    }, []);

    useEffect(() => {
        if (!dimensions.width || !dimensions.height) {
            return;
        }

        const width = dimensions.width - margin.left - margin.right;
        const height = dimensions.height - margin.top - margin.bottom;

        const svg = select(svgRef.current)
            .attr('width', dimensions.width)
            .attr('height', dimensions.height);

        const g = svg.selectAll('g')
            .data([null]) // Pass a dummy dataset of one element
            .join('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xScale = scaleTime()
            .domain(extent(data, d => new Date(d.datetime)))
            .range([0, width]);

        const yScale = scaleLinear()
            .domain(extent(data, d => d.value))
            .range([height, 0]);

        const lineGenerator = line()
            .x(d => xScale(new Date(d.datetime)))
            .y(d => yScale(d.value));

        const xAxis = axisBottom(xScale)
            .ticks(12) // set the number of ticks
            .tickFormat(d3.timeFormat("%b")); // format the date

        const yAxis = axisLeft(yScale)
            .ticks(8); // set the number of ticks

        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", ".8")
            .style("margin-bottom", "1vmin")


        const bisectDate = d3.bisector(d => new Date(d.datetime)).left;

        data.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

        let monthlyData = [];
        let previousMonth = null;

        for(let i = 0; i < data.length; i++) {
            const currentMonth = new Date(data[i].datetime).getMonth();
            if (currentMonth !== previousMonth) {
                monthlyData.push(data[i]);
                previousMonth = currentMonth;
            }
        }

        const circles = g.selectAll(".circle")
            .data(monthlyData)
            .join("circle")
            .attr("class", "circle")
            .attr("cx", d => xScale(new Date(d.datetime)))
            .attr("cy", d => yScale(d.value))
            .attr("r", 5)
            .style("opacity", 1)
            .style("fill", "#1f8ef1")

        g
            .selectAll(".line")
            .data([data]) // Line generator expects an array of arrays
            .join("path")
            .attr("class", "line")
            .attr("d", lineGenerator)
            .attr("fill", "none")
            .attr("stroke", "#1f8ef1")
            .style("filter", "url(#shadow)")
            .attr("stroke-dasharray", function() {
                const length = this.getTotalLength();
                return `${length} ${length}`;
            })
            .attr("stroke-dashoffset", function() {
                return this.getTotalLength();
            })
            .transition().duration(2000)
            .attr("stroke-dashoffset", 0)


        g.selectAll('.x-axis')
            .data([null]) // Pass a dummy dataset of one element
            .join('g')
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)
            .call(g => g.selectAll(".tick line") // select all the tick lines
                .clone() // clone them
                .attr("y2", -height) // extend them to the top of the graph
                .attr("stroke-opacity", 0.1) // make them slightly transparent
                .attr("stroke", "pink")
            )
            .call(g => g.select(".domain").remove()); // remove the domain line


        g.selectAll('.y-axis')
            .data([null]) // Pass a dummy dataset of one element
            .join('g')
            .attr("class", "y-axis")
            .call(yAxis)
            .call(g => g.select(".domain").remove()) // remove the domain line
            .call(g => g.selectAll(".tick line").remove()); // remove all the tick lines

        circles
            .on('mouseover', (event, d) => { // 'd' is the datum for the circle being hovered
                // Show the tooltip
                tooltip.style('visibility', 'visible');
                // Set the text for the tooltip. This is where you can format the string to display the date and value.
                tooltip.html(`${d3.timeFormat("%b")(new Date(d.datetime)).toUpperCase()}<br>£${d.value.toLocaleString()}`);
            })
            .on('mousemove', (event) => {
                // move the tooltip with the cursor
                const [x, y] = d3.pointer(event);
                tooltip.style('top', (y + 50) + 'px').style('left', (x + 400) + 'px');
                
            })
            .on('mouseout', () => {
                // hide the tooltip
                tooltip.style('visibility', 'hidden');
            });
    
    }, [data, dimensions]);

    return (
        <div ref={wrapperRef} className="line-graph-wrapper">
            <svg ref={svgRef}>
            <defs>
                <filter id="shadow" x="0%" y="0%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                    <feOffset dx="0" dy="5" result="offsetblur" />
                    <feFlood floodColor="#1f8ef1" floodOpacity="0.9" />
                    <feComposite in2="offsetblur" operator="in" />
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            </svg>
        </div>
    );
}
