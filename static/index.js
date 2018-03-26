//Javascript for index page

// Create dropdown from Flask
d3.json("/state", function(error, response) {

    if (error) return console.warn(error);

    console.log(response);
   	

    var $dropDown = document.getElementById("selDataset")

    for (var i=0; i< response.length; i++){
        var $optionChoice = document.createElement("option");
        $optionChoice.innerHTML = response[i];
        $optionChoice.setAttribute("value", response[i]);
        $dropDown.appendChild($optionChoice);
    }
});