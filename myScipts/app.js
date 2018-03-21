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

// Load data from vegetarian_restaurants_US_datafiniti.csv
d3.csv("vegetarian_restaurants_US_datafiniti.csv", function(error, restaurantData) {

  // If the browser encounters error in retrieving the file, generate an error message
  if (error) throw error;

  // Print the tvData
  console.log(restaurantData);

  // Cast the states
  restaurantData.forEach(function(data) {
    data.province = +data.province;
  });

  // Create an ordinal scale using a built in D3 color palette as the range
  var cat20 = d3.schemeCategory20;
  var color = d3.scaleOrdinal(cat20);

  // Set the pie chart's radius to be half of the chart height or half or the chart width, whichever is smaller
  var radius = Math.min(chartWidth, chartHeight) / 2;

  // Configure an arc function that will be used to draw the paths making up the pie chart
  var arc = d3.arc().innerRadius(0).outerRadius(radius);

  // Configure a pie function will be used to size slices in the pie chart according to proviences
  var pie = d3.pie().value(function(data) {
    return data.province;
  });

  // Print the the transformed tvData returned by the pie function
  console.log(pie(restaurantData));

  // transform the restaurantData with the pie function, append one path for each element in restaurantData
  // Use the arc function to draw the pie chart's paths
  svg
    .selectAll("path")
      .data(pie(restaurantData))
      .enter()
      .append("path")
        .attr("d", arc)
        .attr("fill", function(pieData) {
          console.log(pieData);
          console.log(pieData.data);
          console.log(pieData.data.province);
          return color(pieData.data.province);
        });
});