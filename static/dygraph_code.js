//declare cleaned array of price/rating as var without assignment definition 
var newArr = new Array();
var flatArr = new Array();
var test = [];

$(document).ready(function(){
function stateList(){    
d3.json("/states_d", function(error, data) {
    if (error) return console.warn(error);

    for (var i = 0; i < data.length; i++) {
        console.log(data[i+1]); // this is your data
        }
    
    });
};

// Create dropdown menu
function dropDownEvent() {
    d3.json("/states_d", function (error, response) {

        if (error) return console.warn(error);

        // console.log(response);

        var selector = document.getElementById("selDataset")

        for (var i = 1; i < response.length; i++) {
            var currentOption = document.createElement("option");
            currentOption.innerHTML = response[i];
            currentOption.value = response[i];
            selector.appendChild(currentOption);
        }
    });
};

var defaultState = "NY"

function init(state){
    d3.json("/by_state_d/" + state, function(error, response){
        if (error) return console.warn(error);
    
        // loop through the response array
        for (var i = 0; i < response.length; i++) {

            // create a new variable that stores the second item in each array
            // this will equal, $, $$, $$$, or $$$$
            var value = response[i][1];
            response[i][2] = parseFloat(response[i][2]);

            // check to see if our new variable is $, $$, $$$, or $$$$
            if (value == "$"){
                // if it's $ then replace the value in the array with the integer 1
                response[i][1] = 1;
            } else if (value == "$$"){
                // if it's $$ then replace the value in the array with the integer 2
                response[i][1] = 2;
            } else if (value == "$$$"){
                // if it's $$$ then replace the value in the array with the integer 3
                response[i][1] = 3;
            } else if (value == "$$$$"){
                // if it's $$$$ then replace the value in the array with the integer 4
                response[i][1] = 4;
            } else {
                // if anything else other than $, $$, $$$, or $$$$ then just put in a zero
                response[i][1] = 0;
            }
            // NOTE: because we just replaced the element that used to be the dollar sign with the integer
            //       we don't need to do anything else. The response now has the updated data.

            // create a new array with just the second and third elements of the response array
            newArr.push([response[i][2],response[i][1]]);
            //console.log(newArr);
        }  
        
        //flatArr = newArr.reshape(newArr.length,1);
        console.log(newArr);

        // --------------------------------------------------------------------------------
        // do something with `response` or `newArr` here
        // NOTE: it has to be here (after the for loop, but before the close of d3.json)
        // --------------------------------------------------------------------------------
        updateDygraph(newArr);
        updateDygraph2(newArr);
        //console.log(newArr);
    });
};




function flatten(newArr) {
    return newArr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
};

Array.prototype.reshape =function(rows, cols) {
  var copy = this.slice(0); // Copy all elements.
  this.length = 0; // Clear out existing array.

  for (var r = 0; r < rows; r++) {
    var row = [];
    for (var c = 0; c < cols; c++) {
      var i = r * cols + c;
      if (i < copy.length) {
        row.push(copy[i]);
      }
    }
    this.push(row);
  }
};




//////////////////////////////////////////////////////////////////////////////////
//Javascript for dygraph
function updateDygraph(newArr){
    new Dygraph(

    // containing div
    document.getElementById("graphdiv"),

            //Dygraph chart data in array format
                //[dygraphdata]
                /*[1,10],
                [2,20],
                [3,30],
                [4,40]*/
                newArr
                //create an array each loop grab value from array ---> then push to extermine
              ,
                { //Dygraph chart options
                title: "Rating and Price Range Interactive Charts",
                labels: [  "Rating","Price Range" ],
                showRangeSelector: true,
                rangeSelectorHeight: 30,
                legend: 'always',
                //rangeSelectorPlotStrokeColor: 'yellow',
                //rangeSelectorPlotFillColor: 'lightyellow',
                xlabel: "Rating",
                ylabel: "Price range",
                showLabelsOnHighlight: true,
                connectSeparatedPoints: true,
                rightGap:40,
                highlightCircleSize: 15,
                strokeWidth: 1,
                strokeBorderWidth: 1,
                logScale: true,
                sigma: 2.0,
                //errorBars:true,

    })

};

function updateDygraph2(newArr){
      var g, regression, clearLines;  // defined below
      document.getElementById("ry1").onclick = function() { regression(1); };
      //document.getElementById("ry2").onclick = function() { regression(2); };
      document.getElementById("clear").onclick = function() { clearLines(); };

      var data = [];
      for (var i = 0; i < 120; i++) {
        data.push([i,
                   i / 5.0 + 10.0 * Math.sin(i / 3.0),
                   30.0 - i / 5.0 - 10.0 * Math.sin(i / 3.0 + 1.0)]);
      }

      // coefficients of regression for each series.
      // if coeffs = [ null, [1, 2], null ] then we draw a regression for series 1
      // only. The regression line is y = 1 + 2 * x.
      var coeffs = [ null, null, null ];
      regression = function(series) {
        // Only run the regression over visible points.
        var range = g.xAxisRange();

        var sum_xy = 0.0, sum_x = 0.0, sum_y = 0.0, sum_x2 = 0.0, num = 0;
        for (var i = 0; i < g.numRows(); i++) {
          var x = g.getValue(i, 0);
          if (x < range[0] || x > range[1]) continue;

          var y = g.getValue(i, series);
          if (y === null || y === undefined) continue;
          if (y.length == 2) {
            // using fractions
            y = y[0] / y[1];
          }

          num++;
          sum_x += x;
          sum_y += y;
          sum_xy += x * y;
          sum_x2 += x * x;
        }

        var a = (sum_xy - sum_x * sum_y / num) / (sum_x2 - sum_x * sum_x / num);
        var b = (sum_y - a * sum_x) / num;

        coeffs[series] = [b, a];
        if (typeof(console) != 'undefined') {
          console.log("coeffs(" + series + "): [" + b + ", " + a + "]");
        }

        g.updateOptions({});  // forces a redraw.
      };



      clearLines = function() {
        for (var i = 0; i < coeffs.length; i++) coeffs[i] = null;
        g.updateOptions({});
      };

      function drawLines(ctx, area, layout) {
        if (typeof(g) == 'undefined') return;  // won't be set on the initial draw.

        var range = g.xAxisRange();
        for (var i = 0; i < coeffs.length; i++) {
          if (!coeffs[i]) continue;
          var a = coeffs[i][1];
          var b = coeffs[i][0];

          var x1 = range[0];
          var y1 = a * x1 + b;
          var x2 = range[1];
          var y2 = a * x2 + b;

          var p1 = g.toDomCoords(x1, y1);
          var p2 = g.toDomCoords(x2, y2);

          var c = Dygraph.toRGB_(g.getColors()[i - 1]);
          c.r = Math.floor(255 - 0.5 * (255 - c.r));
          c.g = Math.floor(255 - 0.5 * (255 - c.g));
          c.b = Math.floor(255 - 0.5 * (255 - c.b));
          var color = 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      }

      g = new Dygraph(
              document.getElementById("graphdiv2"),
              newArr,
              {
                labels: ['Price range', 'Rating'],
                underlayCallback: drawLines,
                showRangeSelector: true,
                drawPoints: true,
                drawAxesAtZero: true,
                strokeWidth: 0.0,
                highlightCircleSize: 10,
                connectSeparatedPoints: true,
                rightGap:40,
                showRangeSelector: true,
                valueRange:[0,5],
                xlabel: "Rating",
                ylabel: "Price range",
                logScale: false,
                highlightSeriesOpts: {
                      strokeWidth: 1,
                      strokeBorderWidth: 0.5,
                      highlightCircleSize: 4
        }
                //errorBars:true 
            }
          );
         var onclick = function(ev) {
            if (g.isSeriesLocked()) {
              g.clearSelection();
            } else {
              g.setSelection(g.getSelection(), g.getHighlightSeries(), true);
            }
            }  
            console.log(g);
    };

dropDownEvent();
init(defaultState);


});




//display as key on hover (if possible)
/*$= under $10 (5-10)
$$= $11-$30 [11]
$$$= $31-$60 [31]
$$$$= above $61*/ 

//State? - string/varchar
//Flask route that returns price translated to the above the approx range for signs
// and is responsive by state
//http://dygraphs.com/options.html#Chart%20labels
//https://developers.google.com/chart/interactive/docs/reference?csw=1#QueryResponse_getDataTable
//https://developers.google.com/chart/interactive/docs/reference?csw=1#DataTable


