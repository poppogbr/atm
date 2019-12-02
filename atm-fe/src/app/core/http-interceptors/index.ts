/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { UnauthorizedInterceptorService } from './unauthorized-interceptor.service';
import { NocacheRestInterceptorService } from './nocache-rest-interceptor.service';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NocacheRestInterceptorService, multi: true },
];
