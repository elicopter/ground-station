function setpointsChartDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "SetpointsChartController",
      templateUrl: "templates/components/setpoints_chart/setpoints_chart.html",
      scope: {
      }
    };
}
export { setpointsChartDirective };
