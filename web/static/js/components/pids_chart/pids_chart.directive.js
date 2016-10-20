function pidsChartDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "PidsChartController",
      templateUrl: "templates/components/pids_chart/pids_chart.html",
      scope: {
      }
    };
}
export { pidsChartDirective };
