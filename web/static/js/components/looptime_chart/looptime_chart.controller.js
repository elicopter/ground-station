function LooptimeChartController ($scope, blackBoxBrainChannel) {
  var series = [
    [],
    []
    // []
  ];
  var graph, line, x, y;
  var graphId   = "looptime-chart";
  var maxValues = 50;
  var margin    = {top: 20, right: 50, bottom: 30, left: 50};

  var buildGraph = function buildGraph() {
    graph = d3.select("#" + graphId)
      .append("svg:svg")
        .attr("width",  width())
        .attr("height", height())
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x = d3.scaleLinear().domain([0, maxValues]).range([-5, width() - margin.left - margin.right]);
    y = d3.scaleLinear().domain([0, 40]).range([height() - margin.top - margin.bottom, 0]);

    var xAxis = d3.axisBottom()
      .scale(x)
      .ticks(0);

    var yAxis = d3.axisLeft()
      .scale(y)
      .ticks(10);

    line = d3.line()
      .x(function(data, i) {
        return x(i);
      })
      .y(function(data) {
        return y(data.value);
      })
      .curve(d3.curveCatmullRom.alpha(0.5));

    graph.selectAll("path")
      .data(series)
    .enter()
      .append("path")
      .attr("transform", "translate(" + 6 + ",0)");

    graph.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    graph.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(5, " + y(0) + ")")
      .call(xAxis);

    graph.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height() -  margin.top - margin.bottom) / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Milliseconds");
  };

  var redraw = function redraw() {
    graph.selectAll("path")
      .data(series)
      .attr("d", line)
      .attr("class", function(data) {
        return "line " + data[0].type;
      });
  };

  var width = function width() {
    return document.getElementById(graphId).clientWidth;
  };

  var height = function height() {
    return document.getElementById(graphId).clientHeight;
  };

  buildGraph();

  blackBoxBrainChannel.on("data", function (payload) {
    series[0].push({timestamp: null, value: payload.complete_last_loop_duration, type: "complete"});
    series[1].push({timestamp: null, value: payload.delta_with_last_loop, type: "delta"});
    if (series[0].length > maxValues) {
      series[0].shift();
      series[1].shift();
    }
    redraw();
  });
}

export { LooptimeChartController };
