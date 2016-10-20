function pidChartDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "PidChartController",
      templateUrl: "templates/components/pid_chart/pid_chart.html",
      scope: {
        name: "@name"
      }
    };
}
export { pidChartDirective };
