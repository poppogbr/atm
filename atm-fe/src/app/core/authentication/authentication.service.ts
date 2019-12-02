import { Injectable } from '@angular/core';
import { BaseService } from '../models/services.model';
import { Credentials } from '../models/login.model';
import { apis } from '../models/api-configuration.model';
import { ApplicationHttpClient } from '../services/http-client.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService extends BaseService {

  constructor(
    http: ApplicationHttpClient
  ) {
    super(http);
  }

  public login(credentials: Credentials): Observable<any> {
    return this.execute<void>(apis.atm, apis.atm.services.login, {bodyParams: credentials});
  }

  public logout(): Observable<any> {
    return this.execute<void>(apis.atm, apis.atm.services.logout);
  }
}
