import { Component } from "@angular/core";
import { Router } from "@angular/router";

// import { Socket } from "phoenix";

// const socket = new Socket("ws://localhost:4000/socket");
// socket.connect();

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  title = "app works!";
}
