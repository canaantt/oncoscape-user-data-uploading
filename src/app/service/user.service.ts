import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { StateService } from '../service/state.service';
import { User } from '../models/user';

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = environment.apiBaseUrl + 'users';

  constructor(private stateService: StateService,
    private http: Http ) {
      this.stateService.jwtToken
          .subscribe(res => {
            // this.headers.append('Content-Type', 'application/json');
            // this.headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
            // this.headers.append('Pragma', 'no-cache');
            // this.headers.append('Cache-Control', 'max-age=0');
            if (res !== null) {
              this.headers.append('Authorization', 'Bearer ' + res.token);
            }
          });
    }

  getUserByID(id: string): Observable<Response> {
    const url = `${this.usersUrl}/` + JSON.stringify({'_id': id});
    return this.http.get(url, {headers: this.headers})
               .map(res => res.json());
  }

  getUserByGmail(gmail: string): Observable<Response> {
    const url = environment.apiBaseUrl + 'users/' +  JSON.stringify({'Gmail': gmail});
    return this.http.get(url, {headers: this.headers});
  }

  userValidationByEmail(email: string): Observable<Response> {
    const query = {'$or': [{'Email': email}, {'Gmail': email}]};
    const url = `${this.usersUrl}/` + JSON.stringify(query);
    return this.http.get(url, {headers: this.headers})
               .map(res => res.json());
  }

  create(user: User): Observable<Response> {
    return this.http
      .post(this.usersUrl, user);
  }

  update(user: User): Observable<Response> {
    const url = `${this.usersUrl}/`  + JSON.stringify({'_id': user._id});
    return this.http.put(url, JSON.stringify(user), {headers: this.headers});
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

