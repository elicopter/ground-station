import { Component, OnInit, OnDestroy } from "@angular/core";
import { AxesChart } from "app/shared/axes-chart/axes-chart";
import { Subscription } from "rxjs/Subscription";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";

@Component({
  selector:    "pids-chart",
  templateUrl: "pids-chart.component.html"
})

export class PIDsChartComponent implements OnInit, OnDestroy {
  private channelSubscriptions: Array<Subscription> = [];
  private channelName = "black_box:pids";

  public chartOptions = {
    scaleShowVerticalLines: false,
    animation: false,
    responsive: true,
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [{
        ticks: {
          min: -300,
          max: 300
        }
      }]
    },
  };

  public chartPIDs   = ["pitch_rate_pid_controller", "roll_rate_pid_controller", "yaw_rate_pid_controller", "pitch_angle_pid_controller", "roll_angle_pid_controller"];
  public chartLabels = ["Pitch Rate", "Roll Rate", "Yaw Rate", "Pitch Angle", "Roll Angle"];
  public chartLegend = true;
  public chartData   = [
    {data: [], label: "Error"},
    {data: [], label: "Setpoint"},
    {data: [], label: "Propotional"},
    {data: [], label: "Integrative"},
    {data: [], label: "Derivative"},
    {data: [], label: "Output"}
  ];

  constructor(private elicopterService: ElicopterService) {}

  ngOnInit(): void {
    this.chartPIDs.forEach(chartPid => {
      const index = this.chartPIDs.indexOf(chartPid);
      this.channelSubscriptions.push(this.elicopterService.onChannelEvent("black_box:" + chartPid, "data").subscribe(data => {
        this.chartData[0].data[index] = data["error"];
        this.chartData[1].data[index] = data["setpoint"];
        this.chartData[2].data[index] = data["proportional_term"];
        this.chartData[3].data[index] = data["integrative_term"];
        this.chartData[4].data[index] = data["derivative_term"];
        this.chartData[5].data[index] = data["output"];

        this.chartData = this.chartData.slice();
      }));
    });

  }

  ngOnDestroy(): void {
    this.channelSubscriptions.forEach(function(channelSubscription) {
      channelSubscription.unsubscribe();
    });
    this.channelSubscriptions = [];
  }
}
