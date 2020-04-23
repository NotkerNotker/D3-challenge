// @TODO: YOUR CODE HERE!
//set margins
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// create svg wrapper
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// read data and begin formatting
d3.csv("assets/data/data.csv").then(function(healthData) {
    console.log(healthData)
    healthData.forEach(function(data) {
      // read data
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        
      });
    // set scale
    var xLinearScale = d3.scaleLinear()
      .domain([7, d3.max(healthData, d => d.poverty)+7])
      .range([7, width -4]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.healthcare)])
      .range([height+10, 0]);
    // set axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    chartGroup.append("g").call(leftAxis);

    // create circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(healthData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "13")
      .style("stroke", "black")
      .attr("fill", "lightblue")

    // append text abbreviations
    var circlesGroup = chartGroup.selectAll()
      .data(healthData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare))
      .style("font-size", "11px")
      .style("text-anchor", "middle")
      .text(d => (d.abbr));
    // set y axis
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2)-30)
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("% Lacking Healthcare");
    
    // set x axis
    chartGroup.append("text")
      .attr("transform", `translate(${(width) / 2}, ${height + margin.top + 20})`)
      .attr("dx", "1em")
      .classed("axis-text", true)
      .text("% In Poverty");

}).catch(function(error) {
    console.log(error);
});