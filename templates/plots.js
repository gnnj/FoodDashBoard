// Part 1
var trace1 = {
  x: ["NJ", "CA", "NY", "FL",
      "GA", "OH", "TX", "NV"],
  y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: "bar"
};

var data = [trace1];

var layout = {
  title: "'Bar' Chart"
};

Plotly.newPlot("plot", data, layout);


// Part 2 - Adding attributes
var trace1 = {
  x: ["NJ", "CA", "NY", "FL",
      "GA", "OH", "TX", "NV"],
  y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: "bar"
};

var data = [trace1];

var layout = {
  title: "Pie Chart",
  xaxis: { title: "States"},
  yaxis: { title: "% Restaurants"}
};

Plotly.newPlot("plot", data, layout);


// Part 3 - Line Chart
var trace1 = {
  x: ["NJ", "CA", "NY", "FL",
      "GA", "OH", "TX", "NV"],
  y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: "line"
};

var data = [trace1];

var layout = {
  title: "Pie Chart",
};

Plotly.newPlot("plot", data, layout);

// Part 4 - Broken Pie Chart
var trace1 = {
  x: ["NJ", "CA", "NY", "FL",
      "GA", "OH", "TX", "NV"],
  y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: "pie"
};

var data = [trace1];

var layout = {
  title: "Pie Chart",
};

Plotly.newPlot("plot", data, layout);


// Part 5 - Working Pie Chart
var trace1 = {
  labels: ["NJ", "CA", "NY", "FL",
      "GA", "OH", "TX", "NV"],
  values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: 'pie'
};

var data = [trace1];

var layout = {
  title: "Pie Chart",
};

Plotly.newPlot("plot", data, layout);

