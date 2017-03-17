import { NgModule }            from "@angular/core";
import { FormsModule }         from "@angular/forms";
import { RouterModule }        from "@angular/router";
import { BrowserModule }       from "@angular/platform-browser";
import { DashboardShowComponent } from "./show/dashboard-show.component";

export const routes = [
  { path: "dashboard", component: DashboardShowComponent }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    BrowserModule
  ],
  declarations: [
    DashboardShowComponent
  ]
})

export class DashboardModule { }
