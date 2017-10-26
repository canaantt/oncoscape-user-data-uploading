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
                      // console.log('Permission service: ', res);
                      this.headers.append('Content-Type', 'application/json');
                      if (res !== null) {
                        this.headers.append('Authorization', 'Bearer ' + res.token);
                      }
                    });
              }

  getPermissions():  Observable<Response> {
    return this.http.get(this.permissionsUrl, {headers: this.headers});
  }
  getPermissionByID(id: string): Observable<Response> {
    return this.http.get(this.permissionsUrl, {headers: this.headers})
            .map(res => res.json().filter(value => value._id === id));
  }
  getPermissionsByProjectID(id: string): Observable<Response> {
    return this.http.get(this.permissionsUrl, {headers: this.headers})
            .map(res => res.json().filter(value => value.Project === id));
  }
  getPermissionsByUserID(id: string): Observable<Response> {
    return this.http.get(this.permissionsUrl, {headers: this.headers})
            .map(res => res.json().filter(value => value.User === id));
  }
  getPermissionsByIDs(ids: string[]): Observable<Response> {
    return this.http.get(this.permissionsUrl, {headers: this.headers})
            .map(res => res.json().filter(value => ids.indexOf(value._id) > -1));
  }
  getPermissionByUserByProject(userID: string, projectID: string): Observable<Permission> {
    return this.http.get(this.permissionsUrl, {headers: this.headers})
            .map(res => res.json().filter(value => (value.User === userID && value.Project === projectID))[0]);
  }
  removePermisionsByProjectID(id: string): any  {
    this.http.get(this.permissionsUrl, {headers: this.headers})
        .map(res => res.json().filter(value => value.Project === id)
        .map(permission => permission._id))
        .subscribe(res => {
          this.deletePermissions(res).subscribe();
        });
  }

  deletePermissions( inputObject ) {
    const observableBatch = [];
    inputObject.forEach(( item, key ) => {
      observableBatch.push(this.http.delete(this.permissionsUrl + '/' + item, {headers: this.headers}).map((res: Response) => res.json()) );
    });
    return Observable.forkJoin(observableBatch);
  }

  delete(permission: Permission): Observable<Response> {
    const url = `${this.permissionsUrl}/` + permission._id;
    return this.http.delete(url, {headers: this.headers});
  }
  deleteById(id: string): Observable<Response> {
    const url = `${this.permissionsUrl}/` + id;
    return this.http.delete(url, {headers: this.headers});
  }
  create(permission: any): Observable<Response> {
    console.log('In Permission service create: ', permission);
    return this.http
      .post(this.permissionsUrl, JSON.stringify(permission), {headers: this.headers});
  }

  update(permission: Permission, permissionRole: roles): Observable<Response> {
    const url = `${this.permissionsUrl}/` + permission._id;
    permission.Role = permissionRole;
    return this.http.put(url, JSON.stringify(permission), {headers: this.headers});
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

