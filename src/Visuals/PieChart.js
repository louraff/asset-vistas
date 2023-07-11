import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

export default function PieChart({data, width=500, height=500}) {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const colorScale = d3.scaleOrdinal()
            .domain(Object.keys(data))
            .range(d3.schemeCategory10);

        const pie = d3.pie().value(d => d[1]);
        const data_ready = pie(Object.entries(data));

        const arcGenerator = d3.arc().innerRadius(0).outerRadius(width / 2);

        svg.selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', d => colorScale(d.data[0]))
            .attr('stroke', 'black')
            .style('stroke-width', '2px')
            .style('opacity', '0.7');
    }, [data]);

    return <svg ref={ref} />
}