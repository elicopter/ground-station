import { Component } from "@angular/core";
import { SocketService } from "app/socket/socket.service";
import { AxesChart } from "app/shared/axes-chart/axes-chart";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector:    "mixer-chart",
  templateUrl: "mixer-chart.component.html"
})

export class MixerChartComponent {
  private channelSubscription: Subscription;
  private channelName:string = "black_box:mixer";
  public chartLabels:string[] = ["2", "1", "3", "4"];
  public chartLegend:boolean = false;
  public chartData:any = [
    {data: [0, 0, 0, 0]},
  ];
  public chartOptions:any = {
    responsive: true,
    startAngle: 45,
    layout: {
      padding: {
        top: 10
      }
    },
    animation:{
      duration: 0,
      easing: "linear",
      animateScale: false
    },
    scale: {
      ticks: {
        display: false,
        beginAtZero: true,
        max: 1000
      }
    }
  };

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.channelSubscription = this.socketService.on(this.channelName, "data", 5).subscribe(data => {
      this.chartData = [{data: [data["2"], data["1"], data["3"], data["4"]]}];
    })
  }

  ngOnDestroy(): void {
    this.channelSubscription.unsubscribe();
  }
}
