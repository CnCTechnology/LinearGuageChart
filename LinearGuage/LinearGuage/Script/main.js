//
var $container = d3.select('#linear-gauge');
var width = parseFloat($container.style("width"));
var height = parseFloat($container.style("height"));

window.onresize = resize;

var ticker = window.setInterval(function () {
    result = Math.random();
    changeMarkerPosition();
}, 1000)

function updateSizes() {
    $container = d3.select('#linear-gauge');
    width = parseFloat($container.style("width"));
    height = parseFloat($container.style("height"));

    chart_w = width;
    resultPos = chart_w * result;
}
function resize() {
    updateSizes();
    var newTicks = d3.selectAll(".tick")[0];
    for (var i = 0; i <= 20; i++) {
        var tickHeight = i % 5 === 0 ? 8 : 5;
        d3.select(newTicks[i]).attr("x", i * (width / 20))
            .attr("y", gauge_h - tickHeight)
            .attr("height", tickHeight);
    }
    changeMarkerPosition();
}
function changeMarkerPosition() {
    updateSizes();
    var xScale = d3.scale.linear()
        .domain([0, 20])
        .range([(resultPos - 15), (resultPos + 15)]);

    var trianglePoints = xScale(1) + ' ' + yScale(20) + ', ' +
        xScale(20) + ' ' + yScale(20) + ', ' +
        xScale(10) + ' ' + yScale(1) + ', ' +
        xScale(10) + ' ' + yScale(1) + ', ' +
        xScale(1) + ' ' + yScale(20);

    d3.select("line")
        .transition()
        .attr("x1", resultPos)
        .attr("y1", chart_y_pos)
        .attr("x2", resultPos)
        .attr("y2", gauge_h + chart_y_pos);

    d3.select("polyline")
        .transition()
        .attr('points', trianglePoints);

    d3.select("text").transition()
        .attr("x", (resultPos - 10))
        .text(Math.floor(resultPos));
}

// Tick mark

var LF = 35;

var gauge_h = 35;

var chart_w = width;
var chart_y_pos = 0;

var result = 0.46; // in a scale [0 1]
var resultPos = chart_w * result;

var text_margins = {
    top: chart_y_pos + gauge_h + 14,
    right: 10,
    bottom: 0,
    left: 10
};

var xScale = d3.scale.linear()
    .domain([0, 20])
    .range([(resultPos - 10), (resultPos + 10)]);

var yScale = d3.scale.linear()
    .domain([0, 20])
    .range([10, 0]);

var trianglePoints = xScale(1) + ' ' + yScale(20) + ', ' + xScale(20) + ' ' + yScale(20) + ', ' + xScale(10) + ' ' + yScale(1) + ', ' + xScale(10) + ' ' + yScale(1) + ', ' + xScale(1) + ' ' + yScale(20);

// Chart size -----------

var svg = d3.select('#linear-gauge').append("svg")
    .attr("width", '100%')
    .attr("height", '100%');

svg.append("g")
    .append("rect")
    .attr("x", 0)
    .attr("y", chart_y_pos)
    .attr("width", "100%")
    .attr("height", gauge_h);

var ticks = svg.append("g");
for (var i = 0; i <= 20; i++) {
    var tickHeight = i % 5 === 0 ? 8 : 5;
    ticks.append("rect")
        .attr("x", i * (width / 20))
        .attr("y", gauge_h - tickHeight)
        .attr("width", 1)
        .attr("class", "tick")
        .attr("height", tickHeight);
}

/****************************************
 * Result
 *****************************************/

var marker = svg.append("g");

marker.append("line")
    .attr("x1", resultPos)
    .attr("y1", chart_y_pos)
    .attr("x2", resultPos)
    .attr("y2", gauge_h + chart_y_pos)
    .attr("stroke-width", 3)
    .attr("stroke", "black");

marker.append('polyline')
    .attr('points', trianglePoints);

marker.append("g")
    .append("text")
    .attr("x", (resultPos - 5))
    .attr("y", text_margins.top)
    .attr("style", "font-size: 12;")
    .text(Math.floor(resultPos));