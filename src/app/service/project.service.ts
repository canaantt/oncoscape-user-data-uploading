import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { StateService } from '../service/state.service';
import { Project } from '../models/project';

@Injectable()
export class ProjectService {
  private headers = new Headers();
  private projectsUrl = environment.apiBaseUrl + 'projects';
  constructor(private stateService: StateService,
              private http: Http ) {
                this.stateService.jwtToken
                    .subscribe(res => {
                      this.headers.append('Authorization', 'Bearer ' + res);
                      this.headers.append('Content-Type', 'application/json');
                    });
              }

  getProjects(): Observable<Response> {
    return this.http.get(this.projectsUrl);
  }

  getRecentProject(userID: string): Observable<Response> {
     return this.http.get(this.projectsUrl)
                 .map(res => {
                   const filtered = res.json().filter(value => value.Author === userID);
                   return filtered[filtered.length - 1];
                  });
  }

  getProjectByID(id: string): Observable<Response> {
    const url = `${this.projectsUrl}/` + id;
    return this.http.get(url).map(res => res.json());
  }
  getProjectsByIDs(ids: string[]): Observable<Response> {
    return this.http.get(this.projectsUrl)
               .map(res => res.json().filter(value => ids.indexOf(value._id) > -1));

  }

  getProjectByUserID(id: string): Observable<Response> {
    const url = `${this.projectsUrl}/` + id;
    return this.http.get(url).map(res => res.json());
  }
  delete(project: Project): Observable<Response> {
    const url = `${this.projectsUrl}/` + project._id;
    return this.http.delete(url, {headers: this.headers});
  }

  create(project: Project): Observable<Response> {
    return this.http
      .post(this.projectsUrl, JSON.stringify(project), {headers: this.headers});
  }

  update(project: Project): Observable<Response> {
    const url = `${this.projectsUrl}/` + project._id;
    return this.http
      .put(url, JSON.stringify(project), {headers: this.headers});
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

