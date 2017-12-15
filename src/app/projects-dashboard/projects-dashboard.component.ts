import { Component, OnInit, Input, Output, Pipe, PipeTransform, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import * as _ from 'underscore';

import { Project } from '../models/project';
import { Permission } from '../models/permission';
import { User } from '../models/user';

import { StateService } from '../service/state.service';
import { LoginService } from '../service/login.service';
import { PermissionService } from '../service/permission.service';
import { ProjectService } from '../service/project.service';
import { FileService } from '../service/file.service';

@Pipe({
  name: 'DateFormatter'
})
export class DateFormatter implements PipeTransform {
  constructor() {}
  transform(id: string, option: string): string {
      const d = id.split('T');
      const d1 = d[0].split('-');
      switch (option) {
        case 'Date':
          return d1[1] + '/' + d1[2] + '/' + d1[0];
      case 'WithTime':
          const d2 = d[1].substr(0, 8);
          return d1[1] + '/' + d1[2] + '/' + d1[0] + ' ' + d2;
      }
  }
}

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss'],
  providers: [PermissionService, FileService]
})
export class ProjectsDashboardComponent {
  user: any;
  projects: any;

  constructor( private fb: FormBuilder,
               private projectService: ProjectService,
               private permissionService: PermissionService,
               private loginService: LoginService,
               private fileService: FileService,
               private stateService: StateService,
               private zone: NgZone,
               private router: Router) {
                console.log('Dashboard Component constructor');
                this.stateService.internalUser
                    .subscribe(res => {
                      this.user = res;
                      if (this.user !== null) {
                        this.getPermissions(this.user._id);
                      } else {
                        this.loginService.googleLogOut();
                      }
                    });
               }
  
  getProjects(permissions: any): void {
    let projectIDs: string[] =  _.uniq(<string> permissions.map(r => r.Project));
    this.projectService.getProjectsByIDs(projectIDs)
        .subscribe(res => {
          this.zone.run(() => {
            this.projects = res;
            this.projects = this.projects.reverse();
          });
        });
    }
  getPermissions(id: string): void {
    this.permissionService.getPermissionsByUserID(id)
        .subscribe(res => {
          this.getProjects(res);
        });
  }

  delete(project: Project): void {
    const confirmDeletion = confirm('Are you absolutely sure you want to delete?');
    if (confirmDeletion) {
      this.permissionService.getPermissionByUserByProject(this.user._id, project._id)
          .subscribe(res => {
            if (res.Role !== 'admin') {
              alert ('You do not have permission to delete this dataset. Please contact author.');
              return;
            } else {
              this.projectService.delete(project).subscribe(() => console.log('project is being removed.'));
              this.fileService.removeFilesByProjectID(project._id);
              this.permissionService.removePermisionsByProjectID(project._id)
                  .subscribe(() => console.log('permissions are deleted.'));
              this.getPermissions(res.User);
            }
          });
    } else {
      console.log('Deletion cancled.');
    }
  }
  add(): void {
    console.log('in add');
    const newProjectForm = this.fb.group({
      Name: new FormControl('', Validators.required),
      Description: new FormControl(''),
      Private: new FormControl(true),
      Source: new FormControl('File'),
      Author: this.user._id,
      PHI: false,
      DataCompliance: {'ProtocolNumber': '', 'Protocol': '' , 'HumanStudy': ''}
    });
    this.projectService.create(newProjectForm.value)
        .subscribe((newProject) => {
          this.addPermission(newProject.json())
        });
  }
  
  addPermission(Project: Project): void {
    const newPermission = {
                         'User': Project.Author,
                         'Role': 'admin',
                         'Project': Project._id};
    this.permissionService.create(newPermission)
        .subscribe((permission) => {
          this.onSelect(permission.json().Project)
        });
  }
  onSelect(ProjectID: string): void {
    this.router.navigate([ `/projects/${ProjectID}/`]);
  }

}
