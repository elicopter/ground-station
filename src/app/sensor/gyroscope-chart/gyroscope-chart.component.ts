import { Component } from "@angular/core";
import { AxesChart } from "app/shared/axes-chart/axes-chart";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";

@Component({
  selector:    "gyroscope-chart",
  templateUrl: "gyroscope-chart.component.html"
})

export class GyroscopeChartComponent extends AxesChart {
  constructor(elicopterService: ElicopterService) {
    super(elicopterService, "black_box:gyroscope");
  }
}
