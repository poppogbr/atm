import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { ApplicationHttpClient } from '../services/http-client.service';
import { StringHelper } from '../helpers/string-helper';

export interface ServiceConfiguration {
  path: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers?: { [id: string]: string };
}

export interface ApiConfiguration {
  endpoint: string;
  services: { [id: string]: ServiceConfiguration };
}

export declare interface ApiConfigurations {
  [id: string]: ApiConfiguration;
}

export declare interface ServiceConfigurationParameters {
  pathParams?: { [id: string]: string | number };
  queryParams?: { [id: string]: string | number | string[]};
  bodyParams?: string | object;
  extraOptions?: { [id: string]: any };
}

export abstract class BaseService {

  constructor(protected http: ApplicationHttpClient) {
  }

  private objectValues(obj) {
    const res = [];
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            res.push(obj[i]);
        }
    }
    return res;
  }

  private computeUrl(api: ApiConfiguration, sc: ServiceConfiguration, pathParams): string {
    const found = this.objectValues(api.services).find(service => service === sc);
    if (!found) {
      throw new Error(`The service ${sc.path} was not found for the current API`);
    }
    return StringHelper.formatStringByObj(api.endpoint + found.path, pathParams);
  }

  execute<T>(api: ApiConfiguration, sc: ServiceConfiguration, scp: ServiceConfigurationParameters = {}): Observable<T> {
    const serviceHeaders = Object.assign({}, sc.headers);
    const bodyIsString = !!scp.bodyParams && (typeof scp.bodyParams === 'string' || scp.bodyParams instanceof String);
    serviceHeaders['Content-Type'] = bodyIsString ? serviceHeaders['Content-Type'] || 'text/plain' :
      serviceHeaders['Content-Type'] || 'application/json';
    const headers = Object.keys(serviceHeaders || []).reduce((h, cur) => h.set(cur, serviceHeaders[cur]), new HttpHeaders());
    const body = bodyIsString ? scp.bodyParams : JSON.stringify(scp.bodyParams);
    const params = scp.queryParams;
    const opts: any = Object.assign({headers, params, body}, scp.extraOptions);
    return this.http.request(sc.method || 'GET', this.computeUrl(api, sc, scp.pathParams), opts);
  }
}
