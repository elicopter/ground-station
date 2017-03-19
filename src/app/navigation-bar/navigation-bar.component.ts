import { Component, OnInit } from "@angular/core";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";
import { Elicopter } from "app/shared/elicopter/elicopter.model";

@Component({
  selector:    "navigation-bar",
  templateUrl: "navigation-bar.component.html",
  styleUrls:   ["navigation-bar.component.scss"]
})

export class NavigationBarComponent {
  private elicopter: Elicopter;
  constructor(private elicopterService: ElicopterService) {
    this.elicopterService.getSelectedElicopter().subscribe(elicopter => {
      this.elicopter = elicopter;
    });
  }

}
