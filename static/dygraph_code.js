//declare cleaned array of price/rating as var without assignment definition 
var newArr = new Array();
var flatArr = new Array();
var test = [];

$(document).ready(function(){
function stateList(){    
d3.json("/states", function(error, data) {
    if (error) return console.warn(error);

    for (var i = 0; i < data.length; i++) {
        console.log(data[i+1]); // this is your data
        }
    
    });
};

// Create dropdown menu
function dropDownEvent() {
    d3.json("/states", function (error, response) {

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
    d3.json("/by_state/" + state, function(error, response){
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
            newArr.push([response[i][1],response[i][2]]);
            //console.log(newArr);
        }  
        
        //flatArr = newArr.reshape(newArr.length,1);
        console.log(newArr);

        // --------------------------------------------------------------------------------
        // do something with `response` or `newArr` here
        // NOTE: it has to be here (after the for loop, but before the close of d3.json)
        // --------------------------------------------------------------------------------
        updateDygraph(newArr);
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
                labels: [ "Price Range", "Rating" ],
                showRangeSelector: true,
                rangeSelectorHeight: 30,
                legend: 'always',
                //rangeSelectorPlotStrokeColor: 'yellow',
                //rangeSelectorPlotFillColor: 'lightyellow',
                ylabel: "Rating",
                xlabel: "Price range",
                showLabelsOnHighlight: true
    })

};

dropDownEvent();
init(defaultState);

var data_for_dygraph;
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


