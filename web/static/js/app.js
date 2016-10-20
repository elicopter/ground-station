import "phoenix_html";

import socket from "./socket";

import { GyroscopeChartController } from "./components/gyroscope_chart/gyroscope_chart.controller";
import { gyroscopeChartDirective } from "./components/gyroscope_chart/gyroscope_chart.directive";

import { AccelerometerChartController } from "./components/accelerometer_chart/accelerometer_chart.controller";
import { accelerometerChartDirective } from "./components/accelerometer_chart/accelerometer_chart.directive";

import { AxesChartController } from "./components/axes_chart/axes_chart.controller";
import { axesChartDirective } from "./components/axes_chart/axes_chart.directive";

import { ReceiverChartController } from "./components/receiver_chart/receiver_chart.controller";
import { receiverChartDirective } from "./components/receiver_chart/receiver_chart.directive";

import { InputsChartController } from "./components/inputs_chart/inputs_chart.controller";
import { inputsChartDirective } from "./components/inputs_chart/inputs_chart.directive";

import { SetpointsChartController } from "./components/setpoints_chart/setpoints_chart.controller";
import { setpointsChartDirective } from "./components/setpoints_chart/setpoints_chart.directive";

import { PidsChartController } from "./components/pids_chart/pids_chart.controller";
import { pidsChartDirective } from "./components/pids_chart/pids_chart.directive";

import { LooptimeChartController } from "./components/looptime_chart/looptime_chart.controller";
import { looptimeChartDirective } from "./components/looptime_chart/looptime_chart.directive";

import { RepartitionsChartController } from "./components/repartitions_chart/repartitions_chart.controller";
import { repartitionsChartDirective } from "./components/repartitions_chart/repartitions_chart.directive";

import { PidChartController } from "./components/pid_chart/pid_chart.controller";
import { pidChartDirective } from "./components/pid_chart/pid_chart.directive";

import { PidController } from "./components/pid/pid.controller";
import { pidDirective } from "./components/pid/pid.directive";

import { HomeIndexController } from "./home/index/index.controller";
import { PidsIndexController } from "./pids/index/index.controller";

var blackBoxBrainChannel = socket.channel("black_box:brain", {});
var blackBoxPidControllersChannel = socket.channel("black_box:pid_controllers", {});
var blackBoxInterpreterChannel = socket.channel("black_box:interpreter", {});
var blackBoxMixerChannel = socket.channel("black_box:mixer", {});

var commanderCommandsChannel = socket.channel("commander:commands", {});

angular.module("GroundStation", ["ui.router"])
.config(function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider
    .state("root", {
      abstract: true,
      views: {
        "navbar": {
          templateUrl: "templates/components/navbar/navbar.html"
        },
        "content": {
          template: "<ui-view />"
        }
      }

    })
    .state("root.home", {
      url: "/",
      abstract: true,
      template: "<ui-view />"
    })
    .state("root.home.index", {
      url: "",
      templateUrl: "templates/home/index/index.html",
      controller: "HomeIndexController"
    })
    .state("root.pids", {
      url: "/pids",
      abstract: true,
      template: "<ui-view />"
    })
    .state("root.pids.index", {
      url: "",
      templateUrl: "templates/pids/index/index.html",
      controller: "PidsIndexController"
    });
})
.constant("socket", socket)
.constant("blackBoxBrainChannel", blackBoxBrainChannel)
.constant("blackBoxPidControllersChannel", blackBoxPidControllersChannel)
.constant("blackBoxMixerChannel", blackBoxMixerChannel)
.constant("blackBoxInterpreterChannel", blackBoxInterpreterChannel)
.constant("commanderCommandsChannel", commanderCommandsChannel)

.controller("GyroscopeChartController", GyroscopeChartController)
.directive("gyroscopeChart", gyroscopeChartDirective)

.controller("AccelerometerChartController", AccelerometerChartController)
.directive("accelerometerChart", accelerometerChartDirective)

.controller("AxesChartController", AxesChartController)
.directive("axesChart", axesChartDirective)

.controller("ReceiverChartController", ReceiverChartController)
.directive("receiverChart", receiverChartDirective)

.controller("InputsChartController", InputsChartController)
.directive("inputsChart", inputsChartDirective)

.controller("SetpointsChartController", SetpointsChartController)
.directive("setpointsChart", setpointsChartDirective)

.controller("PidsChartController", PidsChartController)
.directive("pidsChart", pidsChartDirective)

.controller("LooptimeChartController", LooptimeChartController)
.directive("looptimeChart", looptimeChartDirective)

.controller("RepartitionsChartController", RepartitionsChartController)
.directive("repartitionsChart", repartitionsChartDirective)

.controller("PidChartController", PidChartController)
.directive("pidChart", pidChartDirective)

.controller("PidController", PidController)
.directive("pid", pidDirective)

.controller("HomeIndexController", HomeIndexController)
.controller("PidsIndexController", PidsIndexController);

blackBoxBrainChannel.join()
  .receive("ok", function (response) {
    console.log("Waiting for brain data.", response);
  })
  .receive("error", function (response) {
    console.log("Unable to listen brain data", response);
  });

blackBoxPidControllersChannel.join()
  .receive("ok", function (response) {
    console.log("Waiting for pid controllers data.", response);
  })
  .receive("error", function (response) {
    console.log("Unable to listen pid controllers data", response);
  });

blackBoxInterpreterChannel.join()
  .receive("ok", function (response) {
    console.log("Waiting for interpreter data.", response);
  })
  .receive("error", function (response) {
    console.log("Unable to listen interpreter data", response);
  });

blackBoxMixerChannel.join()
  .receive("ok", function (response) {
    console.log("Waiting for mixer data.", response);
  })
  .receive("error", function (response) {
    console.log("Unable to listen mixer data", response);
  });


commanderCommandsChannel.join()
  .receive("ok", function (response) {
    console.log("Waiting for mixer data.", response);
  })
  .receive("error", function (response) {
    console.log("Unable to listen mixer data", response);
  });
