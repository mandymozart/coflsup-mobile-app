import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// import { Config } from '../config/config'

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string;

  constructor(
    // private config: Config, 
    public http: Http
  ) {
    // config.load()
    // this.url = config.get('apiUrl')
    this.url = 'https://intranet-test.intern.cflex.com/rest/api';
  }

  /**
   * Authorization Header
   * Set temporary authentification header 
   * TODO: remove once Login is implemented
   * (https://jira.foryouandyourteam.com/browse/COFLSUP-297)
   * @param headers 
   */
  private createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic Zm9yeW91YW5keW91cmN1c3RvbWVyczplcUVSKjIzX296'); 
  }

  
  /**
   * Get a specific endpoint
   * @param endpoint 
   * @param params 
   * @param options 
   */
  public get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    let headers = new Headers()
    this.createAuthorizationHeader(headers)
    options.headers = headers
    
    return this.http.get(this.url + '/' + endpoint, options);
  }

  public post(endpoint: string, body: any, options?: RequestOptions) {
    let headers = new Headers()
    this.createAuthorizationHeader(headers)
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  public put(endpoint: string, body: any, options?: RequestOptions) {
    let headers = new Headers()
    this.createAuthorizationHeader(headers)
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  public delete(endpoint: string, options?: RequestOptions) {
    let headers = new Headers()
    this.createAuthorizationHeader(headers)
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  public patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
