import { Component, OnInit, Input, Output, Pipe, PipeTransform, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { ProjectService } from '../service/project.service';
import { Permission } from '../models/permission';
import { PermissionService } from '../service/permission.service';
import { LoginService } from '../service/login.service';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { FileService } from '../service/file.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { StateService } from '../service/state.service';
import { Router } from '@angular/router';
import * as _ from 'underscore';
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
  providers: [UserService, PermissionService, FileService]
})
export class ProjectsDashboardComponent {
  projects: any;
  selectedProject: Project;
  newProjectForm: FormGroup;
  user: any;
  userID: string;
  authenticated: boolean;
  projectIDs: any;
  newAddedProject: any;
  permissions: any;

  constructor( private fb: FormBuilder,
               private projectService: ProjectService,
               private permissionService: PermissionService,
               private loginService: LoginService,
               private fileService: FileService,
               private userService: UserService,
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
  
  // getUserID(id: string): void {
  //   this.userService.getUserByGmail(id)
  //             .map(res => res.json())
  //             .subscribe(res => {
  //               // this.getPermissions(res.user._id);
  //               this.userID = res.user._id;
  //             });
  // }
  
  getProjectIDs(permissions: any): void {
    this.projectIDs = _.uniq(permissions.map(r => r.Project));
    this.getProjects();
  }
  getProjects(): void {
    this.projectService.getProjectsByIDs(this.projectIDs)
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
          this.getProjectIDs(res);
          this.permissions = res;
        });
  }

  delete(project: Project): void {
    const confirmDeletion = confirm('Are you absolutely sure you want to delete?');
    if (confirmDeletion) {
      this.permissionService.getPermissionByUserByProject(this.userID, project._id)
          .subscribe(res => {
            if (res.Role !== 'admin') {
              alert ('You do not have permission to delete this dataset. Please contact author.');
              return;
            } else {
              this.projectService.delete(project).subscribe(() => console.log('project is being removed.'));
              const index = this.projectIDs.indexOf(project._id);
              this.projectIDs.splice(index, 1);
              this.getProjects();
              this.fileService.removeFilesByProjectID(project._id);
              this.permissionService.removePermisionsByProjectID(project._id)
                  .subscribe(() => console.log('permissions are deleted.'));
            }
          });
    } else {
      console.log('Deletion cancled.');
    }
  }
  add(): void {
    console.log('in add');
    this.newProjectForm = this.fb.group({
      Name: new FormControl('Dataset Name', Validators.required),
      Description: new FormControl('Description'),
      Private: new FormControl(true),
      Source: new FormControl('File'),
      Author: this.userID,
      PHI: false,
      DataCompliance: {'IRBNumber': null, 'IECNumber': null, 'Waiver': null, 'ComplianceOption': 'human' , 'HumanStudy': null}
    });
    this.projectService.create(this.newProjectForm.value)
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
          this.permissions.push(permission.json().Project);
          this.onSelect(permission.json().Project)
        });
  }
  onSelect(ProjectID: string): void {
    this.router.navigate([ `/projects/${ProjectID}/`]);
  }

}
