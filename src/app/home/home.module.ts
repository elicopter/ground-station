import { NgModule }            from "@angular/core";
import { FormsModule }         from "@angular/forms";
import { RouterModule }        from "@angular/router";
import { BrowserModule }       from "@angular/platform-browser";
import { HomeShowComponent } from "./show/home-show.component";
import { LoopChartComponent } from "app/home/loop-chart/loop-chart.component";
import { ChartsModule } from "ng2-charts";

export const routes = [
  { path: "", component: HomeShowComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  declarations: [
    LoopChartComponent,
    HomeShowComponent
  ]
})

export class HomeModule { }
