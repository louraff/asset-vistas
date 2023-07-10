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

        const svg = select(svgRef.current);

        const xScale = scaleTime()
            .domain(extent(data, d => new Date(d.datetime)))
            .range([margin.left, width - margin.right]);

        const yScale = scaleLinear()
            .domain(extent(data, d => d.value))
            .range([height - margin.bottom, margin.top]);
        

        const lineGenerator = line()
            .x(d => xScale(new Date(d.datetime)))
            .y(d => yScale(d.value));
        

    // Render the line
    svg
        .selectAll(".line")
        .data([data]) // Line generator expects an array of arrays
        .join("path")
        .attr("class", "line")
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "steelblue");

    // Render the axes
    svg
        .select(".x-axis")
        .style("transform", `translateY(${height - margin.bottom}px)`)
        .call(axisBottom(xScale));

    svg
        .select(".y-axis")
        .style("transform", `translateX(${margin.left}px)`)
        .call(axisLeft(yScale));

}, [data]);

return (
  <svg ref={svgRef} width="800" height="600">
    <g className="x-axis" />
    <g className="y-axis" />
  </svg>
);
}