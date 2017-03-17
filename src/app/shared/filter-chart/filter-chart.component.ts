import { Component } from "@angular/core";
import { SocketService } from "app/socket/socket.service";
import { AxesChart } from "app/shared/axes-chart/axes-chart";

@Component({
  selector:    "filter-chart",
  templateUrl: "filter-chart.component.html"
})

export class FilterChartComponent extends AxesChart {
  constructor(socketService: SocketService) {
    let datasets:Array<any> = [
      {data: [], label: "Pitch", key: "pitch"},
      {data: [], label: "Roll", key: "roll"},
      {data: [], label: "Yaw", key: "yaw"}
    ];
    super(socketService, "black_box:filter", datasets);
  }
}
