import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { StateService } from '../service/state.service';
import { Permission } from '../models/permission';
import { User } from '../models/user';
import 'rxjs/add/observable/forkJoin';

enum roles {'admin', 'read-write', 'read-only'}
@Injectable()
export class PermissionService {
  private headers = new Headers();
  private permissionsUrl =  environment.apiBaseUrl + 'permissions';
  constructor(private stateService: StateService,
              private http: Http ) {
                this.stateService.jwtToken
                    .subscribe(res => {
                      this.headers.append('Content-Type', 'application/json');
                      this.headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
                      this.headers.append('Pragma', 'no-cache');
                      this.headers.append('Cache-Control', 'max-age=0');
                      if (res !== null) {
                        this.headers.append('Authorization', 'Bearer ' + res.token);
                      }
                    });
              }

  getPermissionByID(id: string): Observable<Response> {
    const url = `${this.permissionsUrl}/` + '_id:' + id;
    return this.http.get(url, {headers: this.headers});
  }

  getPermissionsByProjectID(id: string): Observable<Response> {
    const url = `${this.permissionsUrl}/` + 'Project:' + id;
    return this.http.get(url, {headers: this.headers})
            .map(res => res.json());
  }

  getPermissionsByUserID(id: string): Observable<Response> {
    const url = `${this.permissionsUrl}/` + 'User:' + id;
    return this.http.get(url, {headers: this.headers})
            .map(res => res.json().filter(value => value.User === id));
  }

  getPermissionByUserByProject(userID: string, projectID: string): Observable<Permission> {
    const url = `${this.permissionsUrl}/` + 'Project:' + projectID + ';User:' + userID;
    console.log('in getPermissionByUserByProject: ', url);
    debugger;
    return this.http.get(url, {headers: this.headers}).map(res => res.json()[0]);
  }

  removePermisionsByProjectID(id: string): any  {
    const url = `${this.permissionsUrl}/` + 'Project:' + id;
    return this.http.delete(url, {headers: this.headers});
  }

  deleteById(id: string): Observable<Response> {
    const url = `${this.permissionsUrl}/` + '_id:' + id;
    return this.http.delete(url, {headers: this.headers});
  }

  create(permission: any): Observable<Response> {
    return this.http
      .post(this.permissionsUrl, JSON.stringify(permission), {headers: this.headers});
  }

  update(permission: Permission, permissionRole: roles): Observable<Response> {
    const url = `${this.permissionsUrl}/` + '_id:' + permission._id;
    permission.Role = permissionRole;
    return this.http.put(url, JSON.stringify(permission), {headers: this.headers});
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

