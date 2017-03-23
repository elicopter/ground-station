import { Component, OnInit } from "@angular/core";
import { PidService } from "app/pid/pid.service";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";

@Component({
  selector:    "app-pid-index",
  templateUrl: "pid-index.component.html",
  styleUrls:   ["./pid-index.component.scss"]
})

export class PIDIndexComponent implements OnInit {
  private pids: Array<any>;
  private tuneStep: number = 1 / 10;

  constructor(private pidService: PidService, private elicopterService: ElicopterService) {}

  ngOnInit(): void {
    this.elicopterService.getSelectedElicopter().subscribe(elicopter => {
      this.pidService.list().subscribe(pids => {
        this.pids = pids;
      });
    });
  }

  tune(pid, parameter, operation) {
    let newValue = pid[parameter];
    if (operation === "up") {
      newValue += this.tuneStep;
    } else {
      newValue -= this.tuneStep;
    }
    newValue = Math.round(newValue * 100) / 100;
    this.pidService.tune(pid, parameter, newValue).subscribe(() => {
      pid[parameter] = newValue;
    });
  }
}
