function ReceiverChartController ($scope, blackBoxInterpreterChannel, $interval) {
  var graphId = "receiver-chart";

  var margin = {top: 20, right: 20, bottom: 30, left: 70};
      // width  = document.getElementById(graphId).clientWidth - margin.left - margin.right,
      // height = document.getElementById(graphId).clientHeight - margin.top - margin.bottom;

  var x, y, xAxis, yAxis, data, graph;

  var buildGraph = function buildGraph() {
    graph = d3.select("#receiver-chart")
      .append("svg:svg")
        .attr("width", width())
        .attr("height", height())
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x = d3.scaleBand()
      .domain(0, 10)
      .rangeRound([0, width() - margin.left - margin.right])
      .padding(0.1);
    y = d3.scaleLinear()
      .domain(0, 2000)
      .range([height() - margin.top - margin.bottom, 0]);

    xAxis = d3.axisBottom()
      .scale(x)
      .ticks(1);

    yAxis = d3.axisLeft()
      .scale(y)
      .ticks(5);

    data = [
      {channel: 0, value: 0},
      {channel: 1, value: 500},
      {channel: 2, value: 1000},
      {channel: 3, value: 2000},
      {channel: 4, value: 2000},
      {channel: 5, value: 2000},
      {channel: 6, value: 2000},
      {channel: 7, value: 2000},
      {channel: 8, value: 2000},
      {channel: 9, value: 2000}
    ];

    x.domain(data.map(function(d) { return d.channel; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    graph.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + (height() -  margin.top - margin.bottom) + ")")
      .call(xAxis);

    graph.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    graph.selectAll(".bar")
        .data(data)
      .enter()
        .append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.channel); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.value) + 50; })
          .attr("height", function(d) { return height() - 50 - y(d.value); })
          .attr("transform", "translate(0, -50)");

    graph.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height() -  margin.top - margin.bottom) / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Value");
  };

  var redraw = function redraw() {
    graph.selectAll(".bar")
      .data(data)
        .attr("y", function(d) { return y(d.value) + 50; })
        .attr("height", function(d) { return height() - 50 - y(d.value); });

  };

  var width = function width() {
    return document.getElementById(graphId).clientWidth;
  };

  var height = function height() {
    return document.getElementById(graphId).clientHeight;
  };

  buildGraph();

  blackBoxInterpreterChannel.on("data", function (payload) {
    var index = 0;
    var channels = payload.channels;
    Object.keys(channels).forEach(function(key) {
      data[index] = {channel: index, value: channels[key]};
      index = index + 1;
    });
    redraw();
  });
}

export { ReceiverChartController };
