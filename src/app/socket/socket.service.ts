import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Socket }     from "phoenix";

@Injectable()
export class SocketService {
  private socket: Socket;

  constructor () {
    this.socket = new Socket("ws://localhost:4000/socket");
    this.socket.connect();
  }

  on(channelName: string, eventName: string, takeEvery?: number): Observable<Object> {
    takeEvery = takeEvery || 1;
    let observer = (observer) => {
      let count = 0;
      let channel = this.socket.channel(channelName, {});
      channel.join();
      channel.on(eventName, function (payload) {
        count = count + 1;
        if (count % takeEvery == 0) {
          count = 0;
          observer.next(payload);
        }
      });
    }
    return Observable.create(observer);
  }
}