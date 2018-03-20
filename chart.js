numberRecordsND
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){return d; })
    .group(all);


  timeChart
    .width(650)
    .height(140)
    .margins({top: 10, right: 50, bottom: 20, left: 20})
    .dimension(dateDim)
    .group(numRecordsByDate)
    .transitionDuration(500)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .elasticY(true)
    .yAxis().ticks(4);

  genderChart
        .width(300)
        .height(100)
        .dimension(genderDim)
        .group(genderGroup)
        .ordering(function(d) { return -d.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .xAxis().ticks(4);

  ageSegmentChart
    .width(300)
    .height(150)
        .dimension(ageSegmentDim)
        .group(ageSegmentGroup)
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(10)
        .xAxis().ticks(4);

  phoneBrandChart
    .width(300)
    .height(310)
        .dimension(phoneBrandDim)
        .group(phoneBrandGroup)
        .ordering(function(d) { return -d.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .xAxis().ticks(4);

    locationChart
      .width(200)
    .height(510)
        .dimension(locationdDim)
        .group(locationGroup)
        .ordering(function(d) { return -d.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(10)
        .xAxis().ticks(4);

        var map = L.map('map');

        var drawMap = function(){

    map.setView([31.75, 110], 4);
    mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 15,
        }).addTo(map);

    //HeatMap
    var geoData = [];
    _.each(allDim.top(Infinity), function (d) {
        geoData.push([d["latitude"], d["longitude"], 1]);
    });
    var heat = L.heatLayer(geoData,{
        radius: 10,
        blur: 20, 
        maxZoom: 1,
    }).addTo(map);

};

drawMap();

