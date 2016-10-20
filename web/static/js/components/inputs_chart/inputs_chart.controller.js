function InputsChartController ($scope, socket, $interval) {
  var graphId = "inputs-chart";

  var margin = {top: 20, right: 20, bottom: 30, left: 70};
      // width  = document.getElementById(graphId).clientWidth - margin.left - margin.right,
      // height = document.getElementById(graphId).clientHeight - margin.top - margin.bottom;

  var x, y, xAxis, yAxis, xZeroAxis, data, graph;

  var channel = socket.channel("computations:inputs", {});

  var buildGraph = function buildGraph() {
    graph = d3.select("#inputs-chart")
      .append("svg:svg")
        .attr("width", width())
        .attr("height", height())
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    data = [
      {target: "yaw", value: - 50},
      {target: "roll", value: 100},
      {target: "pitch", value: 10}
    ];

    x = d3.scaleBand()
      .domain(data.map(function(d) { return d.target; }))
      .rangeRound([0, width() - margin.left - margin.right])
      .padding(0.1);
    y = d3.scaleLinear()
      .domain([-30, 30])
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

  channel.join()
    .receive("ok", function (response) {
      console.log("Waiting for inputs data.", response);
      buildGraph();
    })
    .receive("error", function (response) {
      console.log("Unable to listen inputs data.", response);
    });

  channel.on("data", function (payload) {
    var index = 0;

    Object.keys(payload).forEach(function(key) {
      data[index] = {target: key, value: payload[key]};
      index = index + 1;
    });
    redraw();
  });
}

export { InputsChartController };
