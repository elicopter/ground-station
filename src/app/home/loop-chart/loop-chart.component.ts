import { Component, OnInit, OnDestroy } from "@angular/core";
import { AxesChart } from "app/shared/axes-chart/axes-chart";
import { Subscription } from "rxjs/Subscription";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";

@Component({
  selector:    "loop-chart",
  templateUrl: "loop-chart.component.html"
})

export class LoopChartComponent implements OnInit, OnDestroy {
  private maximumValues = 50;
  private channelName = "black_box:loop";
  private channelSubscription: Subscription;
  public chartData: Array<any> = [
    {data: [], label: "Delta with last loop", key: "delta_with_last_loop"},
    {data: [], label: "Loop Duration", key: "complete_last_loop_duration"},
    {data: [], label: "Delta with last filter update", key: "delta_with_last_filter_update"}
  ];
  public chartLabels: Array<any> = new Array(this.maximumValues);
  public chartOptions: any = {
    responsive: true,
    tooltips: {
      enabled: false
    },
    animation: {
      duration: 0,
      easing: "linear",
      animateScale: false
    }
  };
  public chartLegend = true;
  public chartType = "line";

  constructor(private elicopterService: ElicopterService) {}

  ngOnInit(): void {
    this.channelSubscription = this.elicopterService.onChannelEvent(this.channelName, "data").subscribe(data => {
      for (const dataset of this.chartData) {
        this.addDataPoint(dataset, data[dataset["key"]]);
      }
      this.chartData = this.chartData.slice();
    });
  }

  ngOnDestroy(): void {
    this.channelSubscription.unsubscribe();
  }

  addDataPoint(datashet, value): void {
    if (datashet.data.length > this.maximumValues) {
      datashet.data.shift();
    }
    datashet.data.push(value);
  }
}
