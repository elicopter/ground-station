import { Component } from "@angular/core";
import { SocketService } from "app/socket/socket.service";
import { Subscription } from "rxjs/Subscription";

export class AxesChart {
  private maximumValues: number = 20;
  private channelSubscription: Subscription;
  public chartData:Array<any> = [
    {data: [], label: "X", key: "x"},
    {data: [], label: "Y", key: "y"},
    {data: [], label: "Z", key: "z"}
  ];
  public chartLabels:Array<any> = new Array(this.maximumValues);
  public chartOptions:any = {
    responsive: true,
    tooltips: {
      enabled: false
    },
    animation:{
      duration: 0,
      easing: "linear",
      animateScale: false
    }
  };
  public chartColors:Array<any> = [
    { // purple
      backgroundColor: 'rgba(132,65,213,0.2)',
      borderColor: 'rgba(132,65,213,1)',
      pointBackgroundColor: 'rgba(132,65,213,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(132,65,213,0.8)'
    },
    { // orange
      backgroundColor: 'rgba(192,92,11,0.2)',
      borderColor: 'rgba(192,92,11,1)',
      pointBackgroundColor: 'rgba(192,92,11,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(192,92,11,1)'
    },
    { // green
      backgroundColor: 'rgba(118,138,92,0.2)',
      borderColor: 'rgba(118,138,92,1)',
      pointBackgroundColor: 'rgba(118,138,92,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(118,138,92,0.8)'
    }
  ];
  public chartLegend:boolean = true;
  public chartType:string = 'line';

  constructor(
    private socketService: SocketService,
    private channelName: string, datasets?: Array<any>) {
      this.chartData = datasets || this.chartData;
    }

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
