//Javascript for dygraph

d3.json("/states", function(error, response) {

    if (error) return console.warn(error);

    // console.log(response);

    var $dropDown = document.getElementById("selDataset")

    for (var i=0; i< response.length; i++){
        var $optionChoice = document.createElement("option");
        $optionChoice.innerHTML = response[i];
        $optionChoice.setAttribute("value", response[i]);
        $dropDown.appendChild($optionChoice);
    }
});

// Set the intial values and graphs on the page
var defaultState= "NY"

init(defaultState);
dropDownEvent();



//////////////////////////////////////////////////////////////////////////////////


$(document).ready(function () {
    new Dygraph(

    // containing div
    document.getElementById("graphdiv"),

            [//Dygraph chart data in array format
                [1,10], //first y column down is X axis
                [2,20],
                [3,50],
                [4,70]
                //create an array each loop grab value from array ---> then push to extermine
              ],
              { //Dygraph chart options
                labels: [ "Price Range", "Rating" ],
                showRangeSelector: true,
                rangeSelectorHeight: 30,
                legend: 'always',
                //rangeSelectorPlotStrokeColor: 'yellow',
                //rangeSelectorPlotFillColor: 'lightyellow',
                ylabel: 'Rating',
                xlabel: 'Price range',
                showLabelsOnHighlight: true
    })
 });   


//Price - string/varchar
//Rating - int

//display as key on hover (if possible)
/*$= under $10 (5-10)
$$= $11-$30
$$$= $31-$60
$$$$= above $61*/

//State? - string/varchar


//Flask route that returns price translated to the above the approx range for signs
// and is responsive by state

//http://dygraphs.com/options.html#Chart%20labels

//https://developers.google.com/chart/interactive/docs/reference?csw=1#QueryResponse_getDataTable
//https://developers.google.com/chart/interactive/docs/reference?csw=1#DataTable


