import { Injectable } from "@angular/core";
import { Http, XHRBackend, RequestOptions } from "@angular/http";
import { HttpService } from "app/shared/http/http.service";
import { Observable } from "rxjs/Observable";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";

@Injectable()
export class PidService  {
  constructor(private httpService: HttpService, private elicopterService: ElicopterService) {}

  list(): Observable<any> {
    return this.httpService.get("pids").map(response => response.json());
  }
}