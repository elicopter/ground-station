import { NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { PIDIndexComponent } from "./index/pid-index.component";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { PIDsChartComponent } from "./pids-chart/pids-chart.component";
import { PidService } from "app/pid/pid.service";

export const routes = [
  { path: "pids", component: PIDIndexComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  declarations: [
    PIDsChartComponent,
    PIDIndexComponent
  ],
  providers: [
    PidService
  ]
})

export class PIDModule {}
