import { Component } from "@angular/core";
import { AxesChart } from "app/shared/axes-chart/axes-chart";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";

@Component({
  selector:    "filter-chart",
  templateUrl: "filter-chart.component.html"
})

export class FilterChartComponent extends AxesChart {
  constructor(elicopterService: ElicopterService) {
    let datasets:Array<any> = [
      {data: [], label: "Pitch", key: "pitch"},
      {data: [], label: "Roll", key: "roll"}
      // {data: [], label: "Yaw", key: "yaw"}
    ];
    super(elicopterService, "black_box:filter", datasets);
  }
}
