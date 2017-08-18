import { Component, OnInit, Input, Output, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { ProjectService } from '../service/project.service';
import { Permission } from '../models/permission';
import { PermissionService } from '../service/permission.service';
import { IRB } from '../models/irb';
import { IrbService } from '../service/irb.service';
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
  providers: [IrbService, UserService, PermissionService, FileService]
})
export class ProjectsDashboardComponent implements OnInit {
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
               private irbService: IrbService,
               private fileService: FileService,
               private userService: UserService,
               private stateService: StateService,
               private router: Router) {
                this.stateService.user
                    .subscribe(res => {
                      this.user = res;
                      if (this.user !== null) {
                        this.getUserID(this.user.email);
                      }
                    });
               }
  ngOnInit () {
    console.log('Dashboard Component Init');
  }
  onSelect(Project: Project): void {
    this.selectedProject = Project;
    const id = this.selectedProject._id;
    this.router.navigate([ `/projects/${id}/`]);
  }
  getUserID(id: string): void {
    this.userService.getUserIDByGmail(id)
              .subscribe(res => {
                this.getPermissions(res[0]._id);
                this.userID = res[0]._id;
              });
  }
  getPermissions(id: string): void {
    this.permissionService.getPermissionsByUserID(id)
        .subscribe(res => {
          this.getProjectIDs(res);
          this.permissions = res;
        });
  }
  getProjectIDs(permissions: any): void {
    this.projectIDs = _.uniq(permissions.map(function(r){return r.Project; }));
    this.getProjects();
  }
  getProjects(): void {
    this.projectService.getProjectsByIDs(this.projectIDs)
        .subscribe(res => {
          this.projects = res;
        });
  }
  delete(project: Project): void {
    const confirmDeletion = confirm('Are you absolutely sure you want to delete?');
    if (confirmDeletion) {
      this.projectService.delete(project).subscribe(() => console.log('project is being removed.'));
      const index = this.projectIDs.indexOf(project._id);
      this.projectIDs.splice(index, 1);
      this.getProjects();
      this.fileService.removeFilesByProjectID(project._id);
      this.permissionService.removePermisionsByProjectID(project._id);
    }else {
      console.log('Deletion cancled.');
    }
  }
  add(): void {
    console.log('in add');
    this.newProjectForm = this.fb.group({
      Name: new FormControl('Name Your New Dataset', Validators.required),
      Description: new FormControl('The largest recorded snowflake was in MT during year 1887, 15 inches wide', Validators.minLength(4)),
      Private: new FormControl(true),
      Author: this.userID,
      DataCompliance: {'IRBNumber': null, 'IECNumber': null, 'Waiver': null, 'ComplianceOption': null }
    });
    this.projectService.create(this.newProjectForm.value)
        .subscribe(() => {
          this.getRecentAddedProject();
        });
  }
  getRecentAddedProject(): void {
    this.projectService.getRecentProject(this.userID)
        .subscribe(res => {
          this.addPermission(res['_id']);
          this.newAddedProject = res;
        });
  }
  addPermission(projectID: string): void {
    const newPermission = {
                         'User': this.userID,
                         'Role': 'admin',
                         'Project': projectID};
    this.permissionService.create(newPermission)
        .subscribe(() => this.getPermissions(this.userID));
  }
}
