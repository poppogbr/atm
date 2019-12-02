import {Injectable, OnDestroy} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedInterceptorService implements HttpInterceptor, OnDestroy {

  constructor(
    private router: Router) {
  }

  ngOnDestroy() {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

      return next.handle(req).pipe(tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.redirectToLogin();
          }
        }));

  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

}
