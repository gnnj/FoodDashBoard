//declare cleaned array of price/rating as var without assignment definition 

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
     
       /* for (var i = 0; i < response.length; i++) {
            console.log(response[i+1]); 
        }*/
        //console.log(response[0]);
        //console.log(response[0][0]);
        for (var i = 0; i < response.length; i++) {
            var value = response[i][1];

            // if (value > );

            //change yelp $ symbols to approx changes or 1,2,3,4 seqeuence
            response[i][2] = parseInt(response[i][2]);
            if (value == "$"){
                response[i][1] = 1;
            } else if (value == "$$"){
                response[i][1] = 2;
            } else if (value == "$$$"){
                response[i][1] = 3;
            } else if (value == "$$$$"){
                response[i][1] = 4;
            } else {
                response[i][1] = 0;
            }
        }  
        console.log(response)
        // =========
        // you can call a function here and send it the updated response array.
        // NOTE: you must do it here before the next close curly and parenthesis.
        // =========
        //dygraph_format(response);
    });
};

function dygraph_format(response){
    data_for_dygraph = map(response, function(n) {
              return [ [ new Date(n[0]), n[1] ] ];
    
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


