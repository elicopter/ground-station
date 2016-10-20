function receiverChartDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "ReceiverChartController",
      templateUrl: "templates/components/receiver_chart/receiver_chart.html",
      scope: {
      }
    };
}
export { receiverChartDirective };
