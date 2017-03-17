import { Component } from "@angular/core";
import { SocketService } from "app/socket/socket.service";
import { AxesChart } from "app/shared/axes-chart/axes-chart";

@Component({
  selector:    "accelerometer-chart",
  templateUrl: "accelerometer-chart.component.html"
})

export class AccelerometerChartComponent extends AxesChart {
  constructor(socketService: SocketService) {
    super(socketService, "black_box:accelerometer");
  }
}
