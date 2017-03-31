import { BrowserModule }        from "@angular/platform-browser";
import { NgModule }             from "@angular/core";
import { FormsModule }          from "@angular/forms";
import { HttpModule }           from "@angular/http";
import { RouterModule, Router } from "@angular/router";
import { NgbModule }            from "@ng-bootstrap/ng-bootstrap";

import { AppComponent }           from "./app.component";
import { CatchAllComponent }      from "./catch-all/catch-all.component";
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";

import { HomeModule } from "./home/home.module";
import { SensorModule } from "./sensor/sensor.module";
import { PIDModule } from "./pid/pid.module";

import { ElicopterService } from "./shared/elicopter/elicopter.service";
import { HttpService } from "app/shared/http/http.service";

export const routes = [
  { path: "**", component: CatchAllComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CatchAllComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    HomeModule,
    SensorModule,
    PIDModule
  ],
  providers: [ElicopterService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
