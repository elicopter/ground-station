import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";

import { Socket, Channel } from "phoenix";
import { Headers, RequestOptionsArgs, HttpModule, JsonpModule, Http, RequestOptions } from "@angular/http";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Subject } from "rxjs/Subject";
import { Elicopter } from "app/shared/elicopter/elicopter.model";

@Injectable()
export class ElicopterService {
  private elicopters:Array<Elicopter> = [];
  private SSDPDiscovererURL: string = "http://localhost:4201";
  private selectedElicopterSubject: Subject<Elicopter> = new Subject();
  private elicopterSocketSubject: ReplaySubject<Socket> = new ReplaySubject(1);

  constructor (private http: Http) {
    this.getSelectedElicopter().subscribe(elicopter => {
      let elicopterSocket: Socket = new Socket("ws://" + elicopter.address + "/socket");
      elicopterSocket.connect();
      this.elicopterSocketSubject.next(elicopterSocket);
    });
    
    this.getDiscoveredElicopters().subscribe(discoveredElicopters => {
      discoveredElicopters.map((discoveredElicopter) => {
        this.elicopters.push(new Elicopter(discoveredElicopter));
      })
      this.selectedElicopterSubject.next(this.elicopters[0]);
    });
  }

  getDiscoveredElicopters(): Observable<any> {
    return this.http.get(this.SSDPDiscovererURL)
                    .map(response => response.json())
                    .catch(error => Observable.throw(error));
  }

  getSelectedElicopter(): Subject<any> {
    return this.selectedElicopterSubject;
  }

  onChannelEvent(channelName: string, eventName: string): Observable<Object> {
    let channel: Channel;
    let observer = (observer) => {
      this.elicopterSocketSubject.subscribe(elicopterSocket => {
        channel = elicopterSocket.channel(channelName, {});
        channel.join();
        channel.on(eventName, function (payload) {
          observer.next(payload);
        });
      });
      return () => {
        channel.leave();
      }
    }
    return Observable.create(observer);
  }
}