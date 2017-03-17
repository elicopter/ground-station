import { Component } from "@angular/core";
import { SocketService } from "app/socket/socket.service";
import { AxesChart } from "app/shared/axes-chart/axes-chart";

@Component({
  selector:    "gyroscope-chart",
  templateUrl: "gyroscope-chart.component.html"
})

export class GyroscopeChartComponent extends AxesChart {
  constructor(socketService: SocketService) {
    super(socketService, "black_box:gyroscope");
  }
}
