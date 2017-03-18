import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Socket }     from "phoenix";

@Injectable()
export class SocketService {
  private socket: Socket;

  constructor () {
    this.socket = new Socket("ws://192.168.88.200/socket");
    this.socket.connect();
  }

  on(channelName: string, eventName: string): Observable<Object> {
    let observer = (observer) => {
      let count = 0;
      let channel = this.socket.channel(channelName, {});
      channel.join();
      channel.on(eventName, function (payload) {
        observer.next(payload);
      });
    }
    return Observable.create(observer);
  }
}