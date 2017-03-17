import { NgModule }            from "@angular/core";
import { FormsModule }         from "@angular/forms";
import { RouterModule }        from "@angular/router";
import { BrowserModule }       from "@angular/platform-browser";
import { HomeShowComponent } from "./show/home-show.component";

export const routes = [
  { path: "", component: HomeShowComponent }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    BrowserModule
  ],
  declarations: [
    HomeShowComponent
  ]
})

export class HomeModule { }
