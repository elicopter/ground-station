function accelerometerChartDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "AccelerometerChartController",
      templateUrl: "templates/components/accelerometer_chart/accelerometer_chart.html",
      scope: {
      }
    };
}

export { accelerometerChartDirective };
