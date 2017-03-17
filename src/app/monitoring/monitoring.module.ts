import { NgModule, OnInit }       from "@angular/core";
import { FormsModule }            from "@angular/forms";
import { RouterModule }           from "@angular/router";
import { BrowserModule }          from "@angular/platform-browser";
import { MonitoringShowComponent } from "./show/monitoring-show.component";
import { ChartsModule } from "ng2-charts/ng2-charts";

import { GyroscopeChartComponent } from "../shared/gyroscope-chart/gyroscope-chart.component";
import { AccelerometerChartComponent } from "../shared/accelerometer-chart/accelerometer-chart.component";
import { FilterChartComponent } from "../shared/filter-chart/filter-chart.component";
import { MixerChartComponent } from "../shared/mixer-chart/mixer-chart.component";
import { PIDsChartComponent } from "../shared/pids-chart/pids-chart.component";
import { LoopChartComponent } from "../shared/loop-chart/loop-chart.component";

export const routes = [
  { path: "monitoring", component: MonitoringShowComponent }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    BrowserModule,
    ChartsModule
  ],
  declarations: [
    GyroscopeChartComponent,
    AccelerometerChartComponent,
    FilterChartComponent,
    MixerChartComponent,
    PIDsChartComponent,
    LoopChartComponent,
    MonitoringShowComponent
  ]
})

export class MonitoringModule {}
