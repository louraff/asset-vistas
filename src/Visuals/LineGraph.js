import React, {useState, useRef, useEffect} from "react";
import { scaleTime, scaleLinear, line, axisBottom, axisLeft, extent, select } from 'd3';

// Basic chart with variables

const margin = { top: 40, right:80, bottom:60, left:50},
    width = 960 - margin.left - margin.right,
    height = 280 - margin.top - margin.bottom,
    color = "DarkPurple";

export default function LineGraph({data}) {
    const svgRef = useRef();

    useEffect(() => {
        console.log('Rendering graph with data:', data);
        if (data.length === 0) {
          return;
        }

        const svg = select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        const g = svg.append('g')
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
        

    // Render the line
    g
        .selectAll(".line")
        .data([data]) // Line generator expects an array of arrays
        .join("path")
        .attr("class", "line")
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "steelblue");

    // Render the axes
    g
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(axisBottom(xScale));

    g
        .append("g")
        .attr("class", "y-axis")
        .call(axisLeft(yScale));

    return () => {
        svg.selectAll("*").remove();
        };

}, [data]);

return (
    <svg ref={svgRef}>
        </svg>
);
}