function inputsChartDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "InputsChartController",
      templateUrl: "templates/components/inputs_chart/inputs_chart.html",
      scope: {
      }
    };
}
export { inputsChartDirective };
