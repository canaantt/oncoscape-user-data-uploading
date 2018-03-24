import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StateService } from '../service/state.service';
import { File } from '../models/file';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';

@Injectable()
export class FileService {
  private headers; 
  private filesUrl = environment.apiBaseUrl + 'files';
  constructor(private stateService: StateService,
              private http: Http) {
                this.stateService.jwtToken
                .subscribe(res => {
                  this.headers = new Headers({'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'});
                  if (res !== null) {
                    // this.headers.append('Authorization', 'Bearer ' + res.token);
                    this.headers.append('Authorization', res.token);
                  }
                });
              }

  getFilesByProjectID(id: string): Observable<Response> {
    const url = `${this.filesUrl}/` + id;
    return this.http.get(url, {headers: this.headers})
               .map(res => {
                  return res.json();
                });
  }
  getCollectionsByProjectID(id: string): Observable<Response> {
    const url = environment.apiBaseUrl + id + '_collections';
    return this.http.get(url, {headers: this.headers})
               .map(res => {
                  return res;
                });
  }

  removeFilesByProjectID(id: string): Observable<Response> {
    const url = `${this.filesUrl}/` + id;
    console.log('Removing Files: ', id);
    return this.http.delete(url, {headers: this.headers})
      .map((msg) => {
        console.log(msg);
        return msg;
      });
  }
  create(file: File): Observable<Response> {
    return this.http
      .post(this.filesUrl, JSON.stringify(file), {headers: this.headers});
  }

  getFileDescriptions(id: string): Observable<Response> {
    return this.http.get(this.filesUrl + '/' + id, {headers: this.headers});
                    // .map(res => res.json());
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

