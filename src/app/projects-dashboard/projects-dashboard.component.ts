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
               private router: Router) {}

  onSelect(Project: Project): void {
    console.log('in onSelect');
    this.selectedProject = Project;
    console.log(this.selectedProject.Name);
    const id = this.selectedProject._id;
    this.router.navigate([ `/projects/${id}/`]);
  }
  getUserID(id: string): void{
    console.log('in getting user id');
    this.userService.getUserIDByGmail(id)
              .subscribe(res => {
                console.log(res);
                this.getPermissions(res[0]._id);
                this.userID = res[0]._id;
              });
  }
  getPermissions(id: string): void {
    console.log('in getting permissions');
    this.permissionService.getPermissionsByUserID(id)
        .subscribe(res => {
          console.log('Are we getting new permission?. ', res);
          this.getProjectIDs(res);
          this.permissions = res;
          console.log('get permissions ....', this.permissions);
        });
  }
  getProjectIDs(permissions: any): void {
    console.log('in getting projectIDs');
    console.log(permissions);
    this.projectIDs = _.uniq(permissions.map(function(r){return r.Project; }));
    console.log('this project IDs...', this.projectIDs);
    this.getProjects();
  }
  getProjects(): void {
    console.log('***this is getProjects', this.projectIDs);
    this.projectService.getProjectsByIDs(this.projectIDs)
        .subscribe(res => {
          this.projects = res;
          console.log('**********', this.projects);
        });
  }
  delete(project: Project): void {
    alert('Are you sure you would like to delete the entire dataset?');
    this.projectService.delete(project).subscribe(() => console.log('project is being removed.'));
    const index = this.projectIDs.indexOf(project._id);
    console.log('The index of projectID that is being removed is..', index);
    this.projectIDs.splice(index, 1);
    this.getProjects();
    this.fileService.removeFilesByProjectID(project._id);
    this.permissionService.removePermisionsByProjectID(project._id);
  }
  add(): void {
    console.log('in adding new project');
    this.newProjectForm = this.fb.group({
      Name: new FormControl('Name Your New Dataset', Validators.required),
      Description: new FormControl('The largest recorded snowflake was in MT during year 1887, 15 inches wide', Validators.minLength(4)),
      Private: new FormControl(true),
      Author: this.userID,
      DataCompliance: {'IRBNumber': null, 'IECNumber': null, 'Waiver': null, 'ComplianceOption': null }
    });
    this.projectService.create(this.newProjectForm.value)
        .subscribe(() => {
          console.log('project is being added');
          this.getRecentAddedProject();
        });
  }
  getRecentAddedProject(): void {
    console.log('in dashboard getRecentAddedProject');
    this.projectService.getRecentProject(this.userID)
        .subscribe(res => {
          this.addPermission(res['_id']);
          console.log('newly aded project id is ... ', res);
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

  ngOnInit() {
     this.stateService.authenticated
        .subscribe(res => {
          this.authenticated = res;
          console.log('in project dashboard');
          console.log(this.authenticated);
        });
    this.stateService.user
        .subscribe(res => {
          console.log('in project dashboard');
          console.log(res);
          this.getUserID(res.email);
          this.user = res;
          console.log(this.user.email);
        });
  }
}
