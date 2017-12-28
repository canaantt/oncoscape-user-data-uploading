import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

import { IRB } from '../models/irb';

@Injectable()
export class IrbService {

  private headers = new Headers({'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'});
  // private irbsUrl = 'http://localhost:3000/irbs';
  private irbsUrl =  environment.apiBaseUrl + 'irbs';
  constructor(private http: Http) {}

  getIrbs():  Observable<Response> {
    return this.http.get(this.irbsUrl)
               .map(res => res.json());
  }
  getIrbsByProjID(id: string): Observable<Response> {
    return this.http.get(this.irbsUrl)
               .map(res => res.json().filter(value => value._id === id));
  }
  getIrbObjIDByIRBNumber(id: string): Observable<Response> {
    return this.http.get(this.irbsUrl)
               .map(res => res.json().filter(value => value.IRBNumber === id));
  }
  delete(irb: IRB): Observable<Response> {
    const url = `${this.irbsUrl}/` + irb._id;
    return this.http.delete(url, {headers: this.headers});
  }

  create(irb: IRB): Observable<Response> {
    return this.http
      .post(this.irbsUrl, JSON.stringify(irb), {headers: this.headers});
  }

  update(irb: IRB): Observable<Response> {
    const url = `${this.irbsUrl}/` + irb._id;
    return this.http
      .put(url, JSON.stringify(irb), {headers: this.headers});
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

