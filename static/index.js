//Javascript for index page

// Create dropdown menu
function dropDownEvent() {
	d3.json("/states", function (error, response) {

		if (error) return console.warn(error);

		// console.log(response);

		var selector = document.getElementById("selDataset")

		for (var i = 0; i < response.length; i++) {
			var currentOption = document.createElement("option");
			currentOption.innerHTML = response[i];
			currentOption.value = response[i];
			selector.appendChild(currentOption);
		}
	});
};



// Set the intial values and graphs on the page
var defaultState= "NY"

init(defaultState);
dropDownEvent();