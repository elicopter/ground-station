function RepartitionsChartController ($scope, blackBoxMixerChannel, $interval) {
  var graphId = "repartitions-chart";

  var margin = {top: 20, right: 20, bottom: 30, left: 70};

  var x, y, arc, data, graph;
  var twoPi = 2 * Math.PI;

  var buildGraph = function buildGraph() {
    graph = d3.select("#repartitions-chart")
      .append("svg:svg")
        .attr("width", width())
        .attr("height", height())
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data = [
      {motor: 1, endAngle: 50 * (Math.PI/180)},
      {motor: 2, endAngle: 100 * (Math.PI/180)},
      {motor: 4, endAngle: 150 * (Math.PI/180)},
      {motor: 4, endAngle: 200 * (Math.PI/180)}
    ];

    arc = d3.arc()
      .innerRadius(25)
      .outerRadius(35)
      .startAngle(0);

    graph.append("path")
      .datum({endAngle: twoPi})
      .style("fill", "#ddd")
      .attr("d", arc)
      .attr("transform", "translate(" + 0 + "," + 20 + ")");

    graph.append("path")
      .datum({endAngle: twoPi})
      .style("fill", "#ddd")
      .attr("d", arc)
      .attr("transform", "translate(" + 90 + "," + 20 + ")");

    graph.append("path")
      .datum({endAngle: twoPi})
      .style("fill", "#ddd")
      .attr("d", arc)
      .attr("transform", "translate(" + 0 + "," + 100 + ")");

    graph.append("path")
      .datum({endAngle: twoPi})
      .style("fill", "#ddd")
      .attr("d", arc)
      .attr("transform", "translate(" + 90 + "," + 100 + ")");

    // TODO REFACTOR
    graph.append("path")
      .datum(data[3])
      .style("fill", "orange")
      .attr("class", "motor4")
      .attr("d", arc)
      .attr("transform", "translate(" + 0 + "," + 20 + ")");

    graph.append("text")
      .attr("class", "motor4-text")
      .attr("transform", "translate(" + 0 + "," + 20 + ")");

    graph.append("path")
      .datum(data[2])
      .style("fill", "orange")
      .attr("class", "motor3")
      .attr("d", arc)
      .attr("transform", "translate(" + 0 + "," + 100 + ")");

    graph.append("text")
      .attr("class", "motor3-text")
      .attr("transform", "translate(" + 0 + "," + 100 + ")");

    graph.append("path")
      .datum(data[0])
      .style("fill", "orange")
      .attr("class", "motor1")
      .attr("d", arc)
      .attr("transform", "translate(" + 90 + "," + 100 + ")");

    graph.append("text")
      .attr("class", "motor1-text")
      .attr("transform", "translate(" + 90 + "," + 100 + ")");

    graph.append("path")
      .datum(data[1])
      .style("fill", "orange")
      .attr("class", "motor2")
      .attr("d", arc)
      .attr("transform", "translate(" + 90 + "," + 20 + ")");

    graph.append("text")
      .attr("class", "motor2-text")
      .attr("transform", "translate(" + 90 + "," + 20 + ")");
  };

  var redraw = function redraw() {
    graph.selectAll("path.motor1")
      .datum(data[0])
      .attr("d", arc);

    graph.selectAll("text.motor1-text")
      .text(data[0].value);

    graph.selectAll("path.motor2")
      .datum(data[1])
      .attr("d", arc);

    graph.selectAll("text.motor2-text")
      .text(data[1].value);

    graph.selectAll("path.motor3")
      .datum(data[2])
      .attr("d", arc);

    graph.selectAll("text.motor3-text")
      .text(data[2].value);

    graph.selectAll("path.motor4")
      .datum(data[3])
      .attr("d", arc);

    graph.selectAll("text.motor4-text")
      .text(data[3].value);
  };

  var width = function width() {
    return document.getElementById(graphId).clientWidth;
  };

  var height = function height() {
    return document.getElementById(graphId).clientHeight;
  };

  buildGraph();

  blackBoxMixerChannel.on("data", function (payload) {
    var index = 0;

    Object.keys(payload).forEach(function(key) {
      data[index] = {motor: key, value: Math.round(payload[key]), endAngle: (payload[key] / 1000) * 360 * (Math.PI/180)};
      index = index + 1;
    });
    redraw();
  });
}

export { RepartitionsChartController };
