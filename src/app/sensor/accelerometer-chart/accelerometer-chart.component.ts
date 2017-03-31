import { Component } from "@angular/core";
import { AxesChart } from "app/shared/axes-chart/axes-chart";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";

@Component({
  selector:    "accelerometer-chart",
  templateUrl: "accelerometer-chart.component.html"
})

export class AccelerometerChartComponent extends AxesChart {
  constructor(elicopterService: ElicopterService) {
    super(elicopterService, "black_box:accelerometer");
  }
}
