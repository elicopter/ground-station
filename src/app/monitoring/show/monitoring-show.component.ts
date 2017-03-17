import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { SocketService } from "../../socket/socket.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector:    "monitoring-show",
  templateUrl: "monitoring-show.component.html",
  styleUrls:   ["monitoring-show.component.scss"]
})

export class MonitoringShowComponent implements OnInit, OnDestroy {
  private blackBoxLoopSubscription: Subscription;

  constructor(
    private socketService: SocketService) {}

  ngOnInit(): void {
    console.log(this.socketService)
    // this.blackBoxLoopSubscription = this.socketService.on("black_box:loop", "data").subscribe(test => {
      // console.log(test);
    // })
  }

  ngOnDestroy(): void {
    // this.blackBoxLoopSubscription.unsubscribe();
    console.log("DESTRPU");
  }
}
