import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '@core/services/http-client.service';
import { BaseService } from '@core/models/services.model';
import { Observable } from 'rxjs';
import { apis } from '@core/models/api-configuration.model';
import { Atm } from './atm.model';

@Injectable()
export class AtmSearchService extends BaseService {

  constructor(
    http: ApplicationHttpClient
  ) {
    super(http);
  }

  public search(filter: string): Observable<Atm[]> {
    return this.execute<Atm[]>(apis.atm, apis.atm.services.atmSearch, {queryParams: {query: filter}});
  }
}
