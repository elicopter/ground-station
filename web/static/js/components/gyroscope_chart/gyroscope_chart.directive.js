function gyroscopeChartDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "GyroscopeChartController",
      templateUrl: "templates/components/gyroscope_chart/gyroscope_chart.html",
      scope: {
      }
    };
}

export { gyroscopeChartDirective };
