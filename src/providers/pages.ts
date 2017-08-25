import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Page } from '../models/page'

@Injectable()
export class Pages {

  constructor(public api: Api) {
  }

  query(params?: any) {
    return this.api.get('content', params)
      .map(resp => resp.json());
  }

  getPage(id: string) {
    return this.api.get('content/'+id+'?expand=body.view')
      .map(resp => resp.json())
  }

}
