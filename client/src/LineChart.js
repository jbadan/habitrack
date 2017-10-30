import React, { Component } from 'react';
import './Line.css';
import ReactFauxDOM from 'react-faux-dom';
import {cyanA700, redA700} from 'material-ui/styles/colors'
import * as d3 from "d3";

class LineChart extends Component {

  render() {
    let data;
    // this.props.data.length < 10
    //   ? data = [
    //     {date:'21-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'20-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'19-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'18-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'17-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'16-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'15-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'14-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'13-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'12-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'11-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'10-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'9-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'8-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'7-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'6-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'5-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'4-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'3-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'2-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'1-Apr-2017',count:Math.floor(Math.random() * 11)},
    //   ]
      // : 
      data = this.props.data;
    // data.forEach(d => {
    //   d.date = Date.parse(d.date);
    //   d.count = +d.count;
    // })
    // set the dimensions and margins of the graph
    let width = this.props.width - 50,
        height = width * 0.25;

    // parse the date / time
    let formatTime = d3.timeFormat("%x");
    let xTime = d3.timeFormat("%b %-d");

    let scale = d3.scaleLinear()
      .domain( [0, 100] )
      .range( [0, width] );
    // set the ranges
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    // define the line
    let line = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.count, d.y1); })
      .curve(d3.curveBasis);

    // Add tooltip
    let tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const div = new ReactFauxDOM.Element('div')

    //Pass it to d3.select and proceed as normal
    let svg = d3.select(div).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", 'line-chart');

    let chartWrapper = svg.append("g")

    // Get the data and load it to the domain
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);

    // Add gridlines
    let xGridlines = d3.axisBottom(x)
      .tickFormat("")
      .tickSize(height)
      .scale(x);

    let yGridlines = d3.axisRight(y)
      .tickFormat("")
      .tickSize(width)
      .scale(y);

    svg.append("g")
      .attr("class", "grid")
      .call(xGridlines);

    svg.append("g")
      .attr("class", "grid")
      .call(yGridlines);

    // Add the valueline path.
    svg.append("g")
      .attr("class", "line")
      .append("path")
        .data([data])
        .attr("d", line)
        .attr("stroke", cyanA700);

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "circle")
        .attr("fill", redA700)
        .attr("r", 4)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.count); })
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", 1);
            tooltip.html(`
              <table>
                <tr>
                  <th>
                    <b>Date:</b>
                  </th>
                  <td>
                    ${formatTime(d.date)}
                  </td>
                </tr>
                <tr>
                  <th>
                    <b>Achieved:</b>
                  </th>
                  <td>
                    ${d.count}
                  </td>
                </tr>
              </table>
            `)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axis")
        .call(d3.axisBottom(x).ticks(10).tickFormat(xTime));

    // Add the Y Axis
    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

    // Return as a react jsx
    return div.toReact()
  }
}

export default LineChart;
