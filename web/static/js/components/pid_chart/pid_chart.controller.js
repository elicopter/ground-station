function PidChartController ($scope, blackBoxPidControllersChannel, $element) {
  var series = [
    [], //error
    [], //output
    [], //proportional term
    [], //integrative term
    []  //derivative term
  ];
  var graph, line, x, y;
  var graphId   = "pid-chart";
  console.log($scope.name)
  var maxValues = 50;
  var margin    = {top: 20, right: 50, bottom: 30, left: 50};


  console.log(d3.select($element[0]).select("#" + graphId))
  var buildGraph = function buildGraph() {
    graph = d3.select($element[0]).select("#" + graphId)
      .append("svg:svg")
        .attr("width",  width())
        .attr("height", height())
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x = d3.scaleLinear().domain([0, maxValues]).range([-5, width() - margin.left - margin.right]);
    y = d3.scaleLinear().domain([450, -450]).range([0, height() - margin.top - margin.bottom]);

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
      .attr("transform", "translate(" + 6 + ",0)")


    graph.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    graph.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(5, " + (height() -  margin.top - margin.bottom) / 2 + ")")
      .call(xAxis);
  };

  var redraw = function redraw() {
    graph.selectAll("path")
      .data(series)
      .attr("d", line)
      .attr("class", function(data) {
        return "tmp " + data[0].type;
      })
      .attr("data-legend",function(data) {return data[0].type})
  };

  var width = function width() {
    return document.getElementById(graphId).clientWidth;
  };

  var height = function height() {
    return document.getElementById(graphId).clientHeight;
  };

  buildGraph();

  blackBoxPidControllersChannel.on($scope.name + "_data", function (payload) {
    series[0].push({timestamp: null, value: payload.error, type: "error"});
    series[1].push({timestamp: null, value: payload.output, type: "output"});
    series[2].push({timestamp: null, value: payload.proportional_term, type: "proportional"});
    series[3].push({timestamp: null, value: payload.integrative_term, type: "integrative"});
    series[4].push({timestamp: null, value: payload.derivative_term, type: "derivative"});

    if (series[0].length > maxValues) {
      series[0].shift();
      series[1].shift();
      series[2].shift();
      series[3].shift();
      series[4].shift();
    }

    redraw();
  });
}

export { PidChartController };
