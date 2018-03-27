/* SVG BUbble chart from youtube video: 
1. https://www.youtube.com/watch?v=yxr1IZ3MrAw

2. https://www.youtube.com/watch?v=FUJjNG4zkWY
*/

	console.log("Begiining Plot");
	var width = 500,
	height = 500;

	var svg = d3.select("#chart")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")

	/*
	<defs>
		<pattern id="jon-snow" height="100%" width="100% patternContentUnits="objectBoundingBox">
			<image height="1", width="1" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="snow.jpg"></image>
		</pattern>
	</defs>
	*/

	var defs = svg.append("defs");

	/*defs.append("pattern")
		.attr("id", "jon-snow")
		.attr("height", "100%")
		.attr("width", "100%")
		.attr("patternContentUnits", "objectBoundingBox")
		.append("image")
		.attr("height", 1)
		.attr("width", 1)
		.attr("preserveAspectRatio", "none")
		.attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
		.attr("xlink:href", "snow.jpg")
*/
	

	var radiusScale = d3.scale.sqrt().domain([1, 300]).range([10,80])
	console.log(radiusScale);
	var simulation = d3.forceSimulation()
		.force("x", d3.forceX(width / 2).strength(0.05))
		.force("y", d3.forceY(height / 2).strength(0.05))
		.force("collide", d3.forceCollide(function(d) {
			return radiusScale(d.clean);
			}))
	console.log(simulation);

	d3.queue()
		.defer(d3.csv, "//clean.csv")
		.await(ready)

	function ready (error, datapoints) {
		console.log(datapoints);
	var circles = svg.selectAll(".restaurant_name")
		.data(datapoints)
		.enter().append("circle")
		.attr("class", "restaurant_name")
		.attr("r", function(d) {
			console.log(d)
		})

		defs.selectAll(".restaurant-pattern")
			.data(datapoints)
			.enter().append("pattern")
			.attr("class", "restaurant-pattern")
			.attr("id", function(d) {
				//jon-snow
				//Madonna
				return d.name.toLowerCase().replace(/ /g, "-")
			})
			.attr("height", "100%")
			.attr("width", "100%")
			.attr("patternContentUnits", "objectBoundingBox")
			.append("image")
			.attr("height", 1)
			.attr("width", 1)
			.attr("preserveAspectRatio", "none")
			.attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
			.attr("xlink:href", function(d){
				return d.image_path
			});

	var circles = svg.selectAll(".restaurant")
		.data(datapoints)
		.enter().append("circle")
		.attr("class", "restaurant")
		.attr("r", function(d) {
			return radiusScale(d.rating);
		})
		.attr("fill", function(d) {
			// "url(jon-snow)"
			return "url(#" + d.name.toLowerCase().replace(/ /g, "-") + ")"
		})
		.on('click', function(d) {
			console.log(d)

		})


		simulation.nodes(datapoints)
			.on('tick',ticked)

		function ticked(){
			circles
			.attr("cx", function(d){
				return d.x 
			})
			.attr("cy", function(d){
				return d.y
			})
			}
		}
	