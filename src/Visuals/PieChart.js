import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import "../components/css/Donut.css";

export default function PieChart({data, width=300, height=300, user, portfolio, setPortfolio}) {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const colorScale = d3.scaleOrdinal()
            .domain(Object.keys(data))
            .range(['#af53e3', '#B7E353', '#00e2cb', '#ff8677', '#149c8c', '#257ff0', '#fa5279', '#fcdf95', '#420f8d', '#53C1E3', '#91c46c', '#E353C4'  ]);

        const pie = d3.pie().value(d => d[1]);
        const data_ready = pie(Object.entries(data));

        const arcGenerator = d3.arc().innerRadius(width/3).outerRadius(width / 2);

        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", ".8")
            .style("height", "7.5vmin")

        const totalValue = Object.values(data).reduce((acc, value) => acc + value, 0); // Calculate the total value


        let path = svg.selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', d => colorScale(d.data[0]))
            .attr('stroke', '')
            .style('stroke-width', '0px')
            .style('opacity', '0.8')
            .on("mouseover", (event, d) => {
                tooltip.style('visibility', 'visible');
                tooltip.html(d.data[0] + "<br/>" + ((d.data[1] / totalValue) * 100).toFixed(0) + "%")
              })
              .on('mousemove', (event) => {
                // move the tooltip with the cursor
                const [x, y] = d3.pointer(event);
                tooltip.style('top', (event.pageY - 90) + "px").style("left", (event.pageX) + "px");
            })
            .on('mouseout', () => {
                // hide the tooltip
                tooltip.style('visibility', 'hidden');
            });


        path.transition()
            .duration(1000)
            .attrTween('d', function(d) { 
                var i = d3.interpolate(d.startAngle+0.1, d.endAngle); 
                return function(t) { 
                    d.endAngle = i(t); 
                    return arcGenerator(d)
                }
            });
    }, [data]);

    return <svg className="actual-donut" ref={ref} />
}
