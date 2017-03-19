import { Component, OnInit } from "@angular/core";
import { PidService } from "app/pid/pid.service";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";

@Component({
  selector:    "pid-index",
  templateUrl: "pid-index.component.html"
})

export class PIDIndexComponent implements OnInit {
  constructor(private pidService: PidService, private elicopterService: ElicopterService) {}
  ngOnInit(): void {
    this.elicopterService.getSelectedElicopter().subscribe(elicopter => {
      this.pidService.list().subscribe(pids => {
        console.log(pids);
      });
    });
  }
}
