import { Injectable } from "@angular/core";
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs, Response, Request } from "@angular/http";
import { ElicopterService } from "app/shared/elicopter/elicopter.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpService extends Http {
  private apiUrl: string;

  constructor(backend: XHRBackend, options: RequestOptions, elicopterService: ElicopterService) {
    elicopterService.getSelectedElicopter().subscribe(elicopter => {
      this.apiUrl = "http://" + elicopter.address + "/"
      console.log("Build API url: " + this.apiUrl);
    });
    super(backend, options);    
  }

  request(request: Request, options?: RequestOptionsArgs): Observable<Response> {
    request.url = this.apiUrl + request.url;
    return super.request(request, options);
  }
}