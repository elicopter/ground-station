import { NgModule, OnInit }       from "@angular/core";
import { FormsModule }            from "@angular/forms";
import { RouterModule }           from "@angular/router";
import { BrowserModule }          from "@angular/platform-browser";
import { SensorIndexComponent } from "./index/sensor-index.component";
import { ChartsModule } from "ng2-charts/ng2-charts";

import { GyroscopeChartComponent } from "./gyroscope-chart/gyroscope-chart.component";
import { AccelerometerChartComponent } from "./accelerometer-chart/accelerometer-chart.component";
import { FilterChartComponent } from "./filter-chart/filter-chart.component";

export const routes = [
  { path: "sensors", component: SensorIndexComponent }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    BrowserModule,
    ChartsModule
  ],
  declarations: [
    FilterChartComponent,
    AccelerometerChartComponent,
    GyroscopeChartComponent,
    SensorIndexComponent
  ]
})

export class SensorModule {}
