import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector:    "sensor-index",
  templateUrl: "sensor-index.component.html"
})

export class SensorIndexComponent {
  private blackBoxLoopSubscription: Subscription;

  constructor() {}
}
