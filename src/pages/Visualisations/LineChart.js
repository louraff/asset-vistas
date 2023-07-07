import React, { useRef, useEffect, useState } from "react";
import { fetchIntradayData } from '../../utilities/data-integration-api';
import { scaleTime, scaleLinear, line, axisBottom, axisLeft, extent, select } from 'd3';


export default function LineChart() {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchIntradayData('IBM');
      setData(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    const svg = select(svgRef.current);

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 50, left: 70 };

    const xScale = scaleTime()
      .domain(extent(data, d => new Date(d.datetime)))
      .range([margin.left, width - margin.right]);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.close))
      .range([height - margin.bottom, margin.top]);

    const lineGenerator = line()
      .x(d => xScale(new Date(d.datetime)))
      .y(d => yScale(d.close));

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


// import {
//   select,
//   line,
//   curveCardinal,
//   scaleLinear,
//   axisBottom,
//   axisLeft,
// } from "d3";
// //data
// const data = [
//   { x: 0, y: 10 },
//   { x: 1, y: 20 },
//   { x: 2, y: 15 },
//   { x: 3, y: 25 },
//   { x: 4, y: 30 },
// ];

// //chart component
// const LineChart = () => {
//   //refs
//   const svgRef = useRef();

//   //draws chart
//   useEffect(() => {
//     const svg = select(svgRef.current);

//     //scales
//     const xScale = scaleLinear()
//       .domain([0, data.length - 1])
//       .range([0, 300]);

//     const yScale = scaleLinear().domain([0, 100]).range([100, 0]);

//     //axes
//     const xAxis = axisBottom(xScale).ticks(data.length);
//     svg.select(".x-axis").style("transform", "translateY(100px)").call(xAxis);

//     const yAxis = axisLeft(yScale);
//     svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);

//     //line generator
//     const myLine = line()
//       .x((d, i) => xScale(i))
//       .y((d) => yScale(d.y))
//       .curve(curveCardinal);

//     //drawing the line
//     svg
//       .selectAll(".line")
//       .data([data])
//       .join("path")
//       .attr("class", "line")
//       .attr("d", myLine)
//       .attr("fill", "none")
//       .attr("stroke", "#00bfa6");
//   }, [data]);

//   return (
    
//       <svg ref={svgRef}>
        
        
//       </svg>
    
//   );
// };

// export default LineChart;