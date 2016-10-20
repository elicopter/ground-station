function looptimeChartDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "LooptimeChartController",
      templateUrl: "templates/components/looptime_chart/looptime_chart.html",
      scope: {
      }
    };
}
export { looptimeChartDirective };
