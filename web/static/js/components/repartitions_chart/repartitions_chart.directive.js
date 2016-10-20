function repartitionsChartDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "RepartitionsChartController",
      templateUrl: "templates/components/repartitions_chart/repartitions_chart.html",
      scope: {
      }
    };
}
export { repartitionsChartDirective };
