import React, { Component } from 'react';
import './Line.css';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from "d3";

class LineChart extends Component {

  render() {
    // let data = this.props.data,
    //   width = this
    let data = [
      {date:'21-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'20-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'19-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'18-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'17-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'16-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'15-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'14-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'13-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'12-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'11-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'10-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'9-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'8-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'7-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'6-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'5-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'4-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'3-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'2-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'1-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'31-Mar-2017',count:Math.floor(Math.random() * 11)},
      {date:'30-Mar-2017',count:Math.floor(Math.random() * 11)},
      {date:'29-Mar-2017',count:Math.floor(Math.random() * 11)},
      {date:'28-Mar-2017',count:Math.floor(Math.random() * 11)},
      {date:'27-Mar-2017',count:Math.floor(Math.random() * 11)}
    ]
    // set the dimensions and margins of the graph
    let width = 900,
        height = 550,
        padding = 75;

    // parse the date / time
    let formatTime = d3.timeFormat("%x");
    let xTime = d3.timeFormat("%b %-d");

    // Formatting data
    data.forEach(function(d) {
      d.date = Date.parse(d.date);
      d.count = +d.count;
    });

    // set the ranges
    let x = d3.scaleTime()
      .range([padding, width - padding]);
    let y = d3.scaleLinear()
      .range([height - padding, padding]);

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
        .attr("width", width + padding)
        .attr("height", height + padding)

    // Get the data and load it to the domain
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);

    // Add gridlines
    let xGridlines = d3.axisBottom()
      .tickFormat("")
      .tickSize(height - padding * 2)
      .scale(x);

    let yGridlines = d3.axisRight()

      .tickFormat("")
      .tickSize(width - padding * 2)
      .scale(y);

    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${(padding)})`)
      .call(xGridlines);

    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${padding},0)`)
      .call(yGridlines);

    // Add the valueline path.
    svg.append("g")
      .attr("class", "line")
      .append("path")
        .data([data])
        .attr("d", line);

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", 4)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.count); })
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
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
    .attr("class", "xaxis axis")  // two classes, one for css formatting, one for selection below
      .attr("transform", `translate(0,${(height - padding)})`)
      .call(d3.axisBottom(x).ticks(10).tickFormat(xTime));

    // Add the Y Axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${padding},0)`)
        .call(d3.axisLeft(y));

    // now rotate text on x axis
    // solution based on idea here: https://groups.google.com/forum/?fromgroups#!topic/d3-js/heOBPQF3sAY
    // first move the text left so no longer centered on the tick
    // then rotate up to get 45 degrees.
    svg.selectAll(".xaxis text")  // select all the text elements for the xaxis
      .attr("transform", function(d) {
         return "translate(" + this.height*-2 + "," + this.height + ")rotate(-45)";
     });

    // now add titles to the axes
    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Habits Completed");

    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")")  // centre below axis
        .text("Date");

    // Return as a react jsx
    return div.toReact()
  }
}

export default LineChart;
