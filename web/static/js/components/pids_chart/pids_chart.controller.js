function PidsChartController ($scope, blackBoxPidControllersChannel, $interval) {
  var graphId = "pids-chart";

  var margin = {top: 20, right: 20, bottom: 30, left: 70};
      // width  = document.getElementById(graphId).clientWidth - margin.left - margin.right,
      // height = document.getElementById(graphId).clientHeight - margin.top - margin.bottom;

  var x, y, xAxis, yAxis, xZeroAxis, data, graph;

  var buildGraph = function buildGraph() {
    graph = d3.select("#pids-chart")
      .append("svg:svg")
        .attr("width", width())
        .attr("height", height())
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    data = [
      {target: "YR", value: - 50},
      {target: "RR", value: 100},
      {target: "PR", value: 10},
      {target: "RA", value: 10},
      {target: "PA", value: 10}
    ];

    x = d3.scaleBand()
      .domain(data.map(function(d) { return d.target; }))
      .rangeRound([0, width() - margin.left - margin.right])
      .padding(0.1);
    y = d3.scaleLinear()
      .domain([-200, 200])
      .range([height() - margin.top - margin.bottom, 0]).nice();

    xZeroAxis = d3.axisBottom()
      .scale(x)
      .tickFormat("");

    xAxis = d3.axisBottom()
      .scale(x);

    yAxis = d3.axisLeft()
      .scale(y);

    graph.append("g")
      .attr("class", "x-zero axis")
      .attr("transform", "translate(0, " + y(0) + ")")
      .call(xZeroAxis);

    graph.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + (height() -  margin.top - margin.bottom) + ")")
      .call(xAxis);

    graph.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    graph.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.target); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(Math.max(0, d.value)); })
        .attr("height", function(d) { return Math.abs(y(d.value) - y(0)); })
        // .attr("transform", "translate(0, " + - (margin.top + margin.bottom) + ")");

    // graph.append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 0 - margin.left)
    //   .attr("x", 0 - (height() -  margin.top - margin.bottom) / 2)
    //   .attr("dy", "1em")
    //   .style("text-anchor", "middle")
    //   .text("Test");
  };

  var redraw = function redraw() {
    graph.selectAll(".bar")
        .data(data)
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.target); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(Math.max(0, d.value)); })
        .attr("height", function(d) { return Math.abs(y(d.value) - y(0)); });
  };

  var width = function width() {
    return document.getElementById(graphId).clientWidth;
  };

  var height = function height() {
    return document.getElementById(graphId).clientHeight;
  };

  buildGraph();

  blackBoxPidControllersChannel.on("yaw_rate_pid_controller_data", function (payload) {
    data[0] = {target: "YR", value: payload.output};
    redraw();
  });

  blackBoxPidControllersChannel.on("roll_rate_pid_controller_data", function (payload) {
    data[1] = {target: "RR", value: payload.output};
    redraw();
  });

  blackBoxPidControllersChannel.on("pitch_rate_pid_controller_data", function (payload) {
    data[2] = {target: "PR", value: payload.output};
    redraw();
  });

  blackBoxPidControllersChannel.on("roll_angle_pid_controller_data", function (payload) {
    data[3] = {target: "RA", value: payload.output};
    redraw();
  });

  blackBoxPidControllersChannel.on("pitch_angle_pid_controller_data", function (payload) {
    data[4] = {target: "PA", value: payload.output};
    redraw();
  });
}

export { PidsChartController };
