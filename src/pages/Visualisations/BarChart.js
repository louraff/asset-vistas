import React, {useState, useEffect} from "react";
import * as d3 from "d3";

export default function BarChart() {

    const [data, setData] = useState([
        {
            name: "A",
            value: 50,
          },
          {
            name: "B",
            value: 20,
          },
          {
            name: "C",
            value: 40,
          },
          {
            name: "D",
            value: 70,
          },
    ])


useEffect(() => {

    const margin = { top: 20, right: 20, bottom: 30, left: 40}
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3
        .select(".bar-chart").html("")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(
        data.map(function (d) {
            return d.name;
        })
    );
    y.domain([
        0, 
        d3.max(data, function (d) {
            return d.value;
        }),
    ]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.name);
        })
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("height", function (d) { 
            return height - y(d.value);
        })
        .style("fill", function (d, i) {
            return color(i); // Apply color to each bar
        });

    svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("fill", "orange");

    svg.append("g").call(d3.axisLeft(y));
}, []);

return <div className="bar-chart"></div>
; }; 

