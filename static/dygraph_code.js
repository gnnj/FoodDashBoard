
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
        var newArr = [];
       /* for (var i = 0; i < response.length; i++) {
            console.log(response[i+1]); 
        }*/

        //console.log(response[0][0]);
        for (var i = 0; i < response.length; i++) {
            newArr = response.shift();
            newArr.shift();
            newArr = newArr;

            //change rating column to int type
            newArr[1]=parseInt(newArr[1]);

            //change yelp $ symbols to approx changes or 1,2,3,4 seqeuence
            if (newArr[0] == "$"){
                newArr[0] = 1
            }
            if (newArr[0] == "$$"){
                newArr[0] = 2
            }
            if (newArr[0] == "$$$"){
                newArr[0] = 3
            }
            if (newArr[0] == "$$$$"){
                newArr[0] = 4
            }
            console.log(newArr);
        }  

        });
};

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
init(defaultState);
});




//display as key on hover (if possible)
/*$= under $10 (5-10)
$$= $11-$30 [11]
$$$= $31-$60 [31]
$$$$= above $61*/ [61]

//State? - string/varchar
//Flask route that returns price translated to the above the approx range for signs
// and is responsive by state
//http://dygraphs.com/options.html#Chart%20labels
//https://developers.google.com/chart/interactive/docs/reference?csw=1#QueryResponse_getDataTable
//https://developers.google.com/chart/interactive/docs/reference?csw=1#DataTable


