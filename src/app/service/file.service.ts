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
  private headers = new Headers({'Content-Type': 'application/json'});
  private filesUrl = environment.apiBaseUrl + 'files';
  constructor(private stateService: StateService,
              private http: Http) {
                this.stateService.jwtToken
                .subscribe(res => {
                  // console.log('Project service: ', res);
                  this.headers.append('Content-Type', 'application/json');
                  if (res !== null) {
                    this.headers.append('Authorization', 'Bearer ' + res.token);
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

  removeFilesByProjectID(id: string): any {
    const url = `${this.filesUrl}/` + id;
    this.http.delete(url, {headers: this.headers}).subscribe(err => console.log(err));
  }
  create(file: File): Observable<Response> {
    return this.http
      .post(this.filesUrl, JSON.stringify(file), {headers: this.headers});
  }

  uploadingValidation(id: string): Observable<Response> {
    return this.http.get(this.filesUrl + '/' + id, {headers: this.headers});
                    // .map(res => res.json());
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

