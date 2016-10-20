function PidController ($scope, blackBoxPidControllersChannel, commanderCommandsChannel) {

  $scope.tunings = {
    kp: 0,
    ki: 0,
    kd: 0
  }
  $scope.newKp = null;
  $scope.newKi = null;
  $scope.newKd = null;

  $scope.tuneKp = function (form) {
    if ($scope.newKp != null || $scope.newKp != undefined) {
      commanderCommandsChannel.push("tune", {pid_controller: $scope.name, kp: $scope.newKp})
    }

  }

  $scope.tuneKi = function (form) {
    if ($scope.newKi != null || $scope.newKi != undefined) {
      commanderCommandsChannel.push("tune", {pid_controller: $scope.name, ki: $scope.newKi})
    }

  }

  $scope.tuneKd = function (form) {
    if ($scope.newKd != null || $scope.newKd != undefined) {
      commanderCommandsChannel.push("tune", {pid_controller: $scope.name, kd: $scope.newKd})
    }
  }

  $scope.reset = function (form) {
    console.log("RESET");
    commanderCommandsChannel.push("reset", {pid_controller: $scope.name});
  }

  blackBoxPidControllersChannel.on($scope.name + "_data", function (payload) {
    $scope.$apply(function () {
      $scope.tunings.kp = payload.kp;
      $scope.tunings.ki = payload.ki;
      $scope.tunings.kd = payload.kd;
    })
    if ($scope.newKp == null) {
      $scope.newKp = payload.kp;
    }

    if ($scope.newKi == null) {
      $scope.newKi = payload.ki;
    }

    if ($scope.newKd == null) {
      $scope.newKd = payload.kd;
    }
  });
}

export { PidController };
