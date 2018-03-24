# create dropdown from Flask
d3.json("/names", function(error, response){

	if (error) return console.warn(error);

	console.log(response);

	var $dropdown = document.getElementById("selDataset")

	for (var i=0; i< response.length; i++){
		var $stateChoice = document.creatElement("States");
		$stateChoice.innerHTML = response[i];
        $stateChoice.setAttribute("value", response[i]);
        $dropDown.appendChild($stateChoice);
	}


});

//Set the initial state value and graphs on the page
var defaultState = "New Jersey"

//Not sure if we need this function. This is for to display data for selected state.
 function init(sample){
    // Sample metadata panel
    d3.json("/metadata/" + sample, function(error, response){
        if (error) return console.warn(error);

        // Get list of keys from response
        var responseKeys = Object.keys(response);

        // Identify the correct div
        var $sampleInfoPanel = document.querySelector("#sample-metadata");
       
        // Reset HTML to nothing
        $sampleInfoPanel.innerHTML = null;

        // Loop through response keys and create a P element for each
        for (var i=0; i<responseKeys.length; i++){
            var $dataPoint = document.createElement('p');
            $dataPoint.innerHTML = responseKeys[i] + ": " + response[responseKeys[i]];
            $sampleInfoPanel.appendChild($dataPoint)
        };

 // Pie Chart
 // Get the response for the default sample
 d3.json("/samples/" + sample,function (error ,sampleResponse){

 	if (error) return console.warn(error);
 	console.log(sample)


        // Parse the repsonse data and take sice of first ten
        // data returns sorted from schalchemy/flask
 		resLabels = sampleResponse[0]["States"].slice(0,10)
        resValues = sampleResponse[1]["VeganRestaurants"].slice(0,10)

        for (var i=0; i<10; i++){
            if (resLabels[i] == 0){
                resLabels = resLabels.slice(0,i)
            }
            if (resValues[i] == 0){
                resValues[i] = resValues.slice(0,i)
            }

		 }

		console.log(resLabels)
        console.log(resValues)

}

	//Set up th edata for pie chart
	var data = [{
	values : resValues,
	labels : resLabels,
	//hovetext: States
	//hoverinfo : {bordercolor :'green'},
	type : 'pie'
	}];

	  // Setup the layout for plot

          var layout = {
                    // width: 675,
                    margin: 
                    {
                        top: 10,
                        bottom: 10,
                        right: 10,
                        left: 10
                    },
                    height: 500,
                    title: "Top Vegan VeganRestaurants " //+ sample
                  };
        // Plot the default value
          Plotly.newPlot('piePlot', data, layout);

        console.log(sampleResponse);
        

// Update the pie chart function
function updatePie(newValues, newLabels, newNames, sample_name){
    Plotly.restyle("piePlot", "values", [newValues])
    Plotly.restyle("piePlot", "labels", [newLabels])
    Plotly.restyle("piePlot", "hovertext", [newNames])
    Plotly.relayout("piePlot", "title", "Vegan VeganRestaurants " //+ sample_name)
    console.log("Pass")
};
//Handle the new get request for choice
d3.jason("/samples" + )