import { HttpHandler,
  HttpProgressEvent,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpUserEvent,
  HttpRequest,
  HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NocacheRestInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    // Only turn off caching for API calls to the server.
    if (req.url.indexOf(environment.ATM_ENDPOINT) >= 0 && req.method === 'GET') {
        const nextReq = req.clone({
            headers: req.headers
              .set('Cache-Control', 'no-cache')
              .set('Pragma', 'no-cache')
              .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
              .set('If-Modified-Since', '0')
        });

        return next.handle(nextReq);
    } else {
        // Pass the request through unchanged.
        return next.handle(req);
    }
  }
}
