function axesChartDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "AxesChartController",
      templateUrl: "templates/components/axes_chart/axes_chart.html",
      scope: {
      }
    };
}
export { axesChartDirective };
