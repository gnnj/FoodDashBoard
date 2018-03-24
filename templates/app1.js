// Define the dataset
var booksIReadThisYear = [12, 8, 7, 16, 2, 4, 11];

var namesArray = [
  "Abbott",
  "Barney",
  "Costello",
  "Daisy",
  "Edward",
  "Fred",
  "Georgia"
];

// Store the dimensions of the SVG container
var svgWidth = 800;
var svgHeight = 600;

// Define the margins of the chart
var margin = { top: 50, right: 50, bottom: 50, left: 50 };

// Calculate the dimensions of the chart by subtracting the margin on either side from the width and height of the SVG container
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Define a bandScale which will be used to create our bottom axis and position and size our bars along the x-axis
var xBandScale = d3
  .scaleBand()
  .domain(namesArray)
  .range([0, chartWidth])
  .padding(0.1);

// Define a linearScale which will be used to create our left axis and position and size our bars along the y-axis
var yLinearScale = d3.scaleLinear().domain([0, 20]).range([chartHeight, 0]);

// Configure a bottom axis function using the d3.axisBottom method and the band scale.
var bottomAxis = d3.axisBottom(xBandScale);

// Configure a left axis function using the d3.axisBottom method and the band scale.
var leftAxis = d3.axisLeft(yLinearScale);

// Create, size, and position the SVG container and SVG group which will hold the chart
var svg = d3
  .select("#svg-area1")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  .append("g")
  .attr("height", chartHeight)
  .attr("width", chartWidth)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Append another SVG group and call the bottomAxis function inside
svg
  .append("g")
  .attr("transform", "translate(0," + chartHeight + ")")
  .call(bottomAxis);

// Append another SVG group and call the leftAxis function inside
svg.append("g").call(leftAxis);

// Select all elements with the class "bar" (none on page load)
// Bind the booksIReadThisYear dataset to the empty selection
// Run the enter method, which prepares one DOM element for each piece of data with no selected element
// Append one `rect` for each piece of data
// Give each rect a class of bar
// Set the x coordinate to be the value returned from passing the corresponding name into the bandScale function
svg
  .selectAll(".bar")
  .data(booksIReadThisYear)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function(data, index) {
    return xBandScale(namesArray[index]);
  })
  // Set the y coordinate to be the value returned from passing the data (current books value) into the linearScale function
  .attr("y", function(data) {
    return yLinearScale(data);
  })
  // Set the width of the bar using the bandWidth method attached to the bandScale function
  .attr("width", xBandScale.bandwidth())
  // Set the height of the bar to be the height of the chart minus the size calculated by the linear scale method
  .attr("height", function(data) {
    return chartHeight - yLinearScale(data);
  });
