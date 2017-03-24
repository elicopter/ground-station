import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";

import { Socket, Channel } from "phoenix";
import { Headers, RequestOptionsArgs, HttpModule, JsonpModule, Http, RequestOptions } from "@angular/http";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/from";
import "rxjs/add/operator/switchMap";
import { Subject } from "rxjs/Subject";
import { Elicopter } from "app/shared/elicopter/elicopter.model";

declare var electron: any;
export const {ipcRenderer} = electron;

@Injectable()
export class ElicopterService {
  private elicopters: Array<Elicopter> = [];
  private SSDPDiscovererURL = "http://localhost:4201";
  private selectedElicopterSubject: ReplaySubject<Elicopter> = new ReplaySubject(1);
  private elicopterSocketSubject: ReplaySubject<Socket> = new ReplaySubject(1);

  constructor (private http: Http) {
    this.getSelectedElicopter().subscribe(elicopter => {
      console.log("Elicopter found " + elicopter.name);
      const elicopterSocket: Socket = new Socket("ws://" + elicopter.address + ":" + elicopter.port + "/socket");
      elicopterSocket.connect();
      this.elicopterSocketSubject.next(elicopterSocket);
    });

    this.pollDiscoveredElicopters().subscribe(discoveredElicopters => {
      discoveredElicopters.map((discoveredElicopter) => {
        const elicopter = new Elicopter(discoveredElicopter);
        const foundElicopter = this.elicopters.find((_elicopter) => {
          return _elicopter.name === elicopter.name;
        });
        if (!foundElicopter) {
          this.elicopters.push(elicopter);
          this.selectedElicopterSubject.next(elicopter);
        }
      });
    });
  }

  pollDiscoveredElicopters(): Observable<any> {
    return Observable.interval(1000)
      .switchMap(() => Observable.from([ipcRenderer.sendSync("getAvailableElicopters", null)]))
      .catch(error => Observable.throw(error));
  }

  getSelectedElicopter(): Subject<any> {
    return this.selectedElicopterSubject;
  }

  onChannelEvent(channelName: string, eventName: string): Observable<Object> {
    let channel: Channel;
    const channelEventObserver = (observer) => {
      this.elicopterSocketSubject.subscribe(elicopterSocket => {
        channel = elicopterSocket.channel(channelName, {});
        channel.join();
        channel.on(eventName, function (payload) {
          observer.next(payload);
        });
      });
      return () => {
        channel.leave();
      };
    };
    return Observable.create(channelEventObserver);
  }
}
