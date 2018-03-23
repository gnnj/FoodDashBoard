// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
    .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
    .append("g")
      .attr("transform", "translate(" + chartWidth / 2 + ", " + chartHeight / 2 + ")");

// Load data from clean_no_index.json
d3.json("clean_no_index.geojson", function(data) {
    console.log(data);

  // If the browser encounters error in retrieving the file, generate an error message
 // if (error) throw error;

  // Print the restaurantData
  console.log(data);

  // Cast the rate
  data.features.forEach(function(response) {
    response.cuisine_type = +response.cuisine_type;
  });

  // Create an ordinal scale using a built in D3 color palette as the range
  var cat20 = d3.schemeCategory20;
  var color = d3.scaleOrdinal(cat20);

  // Set the pie chart's radius to be half of the chart height or half or the chart width, whichever is smaller
  var radius = Math.min(chartWidth, chartHeight) / 2;

  // Configure an arc function that will be used to draw the paths making up the pie chart
  var arc = d3.arc().innerRadius(0).outerRadius(radius);

  // Configure a pie function will be used to size slices in the pie chart according to cuisine_type
  var pie = d3.pie().value(function(data) {
    return data.cuisine_type;
  });
console.log(data.features.cuisine_type);
  // Print the the transformed tvData returned by the pie function
  console.log(pie(data));

  // transform the restaurantData with the pie function, append one path for each element in restaurantData
  // Use the arc function to draw the pie chart's paths
  svg
    .selectAll("path")
      .data(pie(data.features))
      .enter()
      .append("path")
        .attr("d", arc)
        .attr("fill", function(pieData) {
          console.log(pieData);
          console.log(pieData.data);
          console.log(pieData.data.cuisine_type);
          return color(pieData.data.cuisine_type);
        });
});