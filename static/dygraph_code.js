
$(document).ready(function(){
    
d3.json("/states", function(error, data) {
    if (error) return console.warn(error);

    for (var i = 0; i < data.length; i++) {
        console.log(data[i+1]); // this is your data
        }
    
});

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

// Set the intial values and graphs on the page
/*var defaultState= "NY"

init(defaultState);*/

//////////////////////////////////////////////////////////////////////////////////
//Javascript for dygraph

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

dropDownEvent();

});

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


