import { Component } from "@angular/core";
import { SocketService } from "app/socket/socket.service";
import { AxesChart } from "app/shared/axes-chart/axes-chart";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector:    "loop-chart",
  templateUrl: "loop-chart.component.html"
})

export class LoopChartComponent {
  private maximumValues: number = 50;
  private channelName:string = "black_box:loop";
  private channelSubscription: Subscription;
  public chartData:Array<any> = [
    {data: [], label: "Delta", key: "delta_with_last_loop"},
    {data: [], label: "Loop Duration", key: "complete_last_loop_duration"}
  ];
  public chartLabels:Array<any> = new Array(this.maximumValues);
  public chartOptions:any = {
    responsive: true,
    animation:{
      duration: 0,
      easing: "linear",
      animateScale:true
    }
  };
  public chartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public chartLegend:boolean = true;
  public chartType:string = 'line';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.channelSubscription = this.socketService.on(this.channelName, "data", 5).subscribe(data => {
      for (let dataset of this.chartData) {
        this.addDataPoint(dataset, data[dataset["key"]])
      }
      this.chartData = this.chartData.slice();
    })
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
