import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";

@Component({
  selector: "home-show",
  templateUrl: "home-show.component.html",
  styleUrls: ["./home-show.component.scss"]
})

export class HomeShowComponent implements OnInit, OnDestroy {
  private loggerChannelSubscriptions: Array<Subscription> = [];
  private statusChannelSubscriptions: Subscription;
  
  private logs: Array<Object> = [];
  private status: Object;

  constructor(private elicopterService: ElicopterService) {}
  
  ngOnInit(): void {
    ["error", "info", "warn", "debug"].forEach((level) => {
      this.loggerChannelSubscriptions.push(this.elicopterService.onChannelEvent("logger:" + level, "data").subscribe(data => {
        this.logs.unshift({
          level: level,
          timestamp: data["timestamp"],
          message: data["message"]
        });
        if (this.logs.length > 50) {
          this.logs.pop();
        }
      }));
    });

    this. statusChannelSubscriptions = this.elicopterService.onChannelEvent("black_box:status", "data").subscribe(data => {
      this.status = data;
    });
  }

  ngOnDestroy(): void {
    this.loggerChannelSubscriptions.forEach((loggerChannelSubscription) => {
      loggerChannelSubscription.unsubscribe();
    });
  }
}