//Javascript for index page
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





dropDownEvent();
});