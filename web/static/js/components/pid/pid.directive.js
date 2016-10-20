function pidDirective ($templateCache) {
  return {
      restrict: "E",
      controller: "PidController",
      templateUrl: "templates/components/pid/pid.html",
      scope: {
        name: "@name",
      }
    };
}
export { pidDirective };
