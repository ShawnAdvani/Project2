var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .style("background-color","lightgray");

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "US";
var chosenYAxis = "Likes";

// function used for updating x-scale var upon click on axis label
function xScale(vidData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(vidData, d => (d[chosenXAxis]) * 0.8),
      d3.max(vidData, d => d[chosenXAxis]) * 1.2])
    .range([0, width]);

  return xLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating y-scale var upon click on axis label
function yScale(vidData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(vidData, d => (d[chosenYAxis]) * 0.8),
      d3.max(vidData, d => (d[chosenYAxis]) + 5)])
    .range([height, 0]);

  return yLinearScale;
}


// function used for updating YAxis var upon click on axis label
function renderYaxes(newYScale, yAxis) {
  var leftAxis = d3.axisBottom(newYScale);

  xAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}


// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}


// function used for updating texts group with a transition to
// new texts
function renderTexts(textsGroup, newXScale, chosenXAxis) {

    textsGroup.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]));
  
    return textsGroup;
}
  

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "US") {
    var label = "United States Likes";
  }
  else {
    var label = "Great Britain Likes";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`Category ID: ${d.category_id}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Import Data
d3.csv("db/raw_data/USvideos_catID.csv").then(function(vidData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    vidData.forEach(function(data) {
      data.category_id = parseFloat(data.category_id);
      data.views = parseFloat(data.views);
      data.likes = parseFloat(data.likes);
      data.dislikes = parseFloat(data.dislikes);
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = xScale(vidData, chosenXAxis);
    var yLinearScale = yScale(vidData, chosenYAxis);


    // Create axis functions

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(leftAxis);

    //Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(vidData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", "12")
    .style("stroke-width", 1.5)
    .style("fill", "blue")
    .style("opacity", ".5")
    .style("stroke", "black");
    
    // Create group for  2 x- axis labels
    var xlabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var USviewsLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("United States Likes");

    var GBviewsLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Great Britain Likes");

    // Create y axis labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height/1.5))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

    //circle labels
    let textsGroup = chartGroup.selectAll("null")
    .data(povData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    //.attr("color", "white")
    //.attr("font-size", 15)
    .attr('x', d => xLinearScale(d[chosenXAxis])-10)
    .attr('y', d => yLinearScale(d.healthcare)+5);


    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);


// x axis labels event listener
labelsGroup.selectAll("text")
.on("click", function() {
  // get value of selection
  var value = d3.select(this).attr("value");
  if (value !== chosenXAxis) {

    // replaces chosenXAxis with value
    chosenXAxis = value;

    // functions here found above csv import
    // updates x scale for new data
    xLinearScale = xScale(povData, chosenXAxis);

    // updates x axis with transition
    xAxis = renderAxes(xLinearScale, xAxis);

    // updates circles with new x values
    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

    // updates the texts locations
   textsGroup = renderTexts(textsGroup, xLinearScale, chosenXAxis);
    
    // updates tooltips with new info
    circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // changes classes to change bold text
    if (chosenXAxis === "US") {
        USviewsLabel
            .classed("active", true)
            .classed("inactive", false);
        GBviewsLabel
            .classed("active", false)
            .classed("inactive", true);
    }
    else {
        ageLabel
            .classed("active", false)
            .classed("inactive", true);
        povertyLabel
            .classed("active", true)
            .classed("inactive", false);
    }
  }
});

  }).catch(function(error) {
    console.log(error);
});
