import { Component, Input, Output, SimpleChanges,  AfterViewInit, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../models/project';
import { ProjectService } from '../service/project.service';
import { PermissionService } from '../service/permission.service';
import { File } from '../models/file';
import { FileService } from '../service/file.service';
import { IRB } from '../models/irb';
import { IrbService } from '../service/irb.service';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import { PermissionsComponent } from '../permissions/permissions.component';
import { FilesComponent } from '../files/files.component';
import { StateService } from '../service/state.service';
import { DateFormatter } from '../projects-dashboard/projects-dashboard.component';

enum roles {'full-access', 'read-only'}
@Pipe({
  name: 'IrbDetailService'
})
export class IrbDetailService implements PipeTransform {
  constructor(private irbService: IrbService) {}
  transform(id: string): Observable<string> {
      return this.irbService.getIrbObjIDByIRBNumber(id)
          .map((response, err) => {
              if (err) {
                console.log(err);
                return err;
              } else {
                return  response[0].IRBTitle;
              }
          });
  }
}
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [FileService, IrbService, UserService, FormBuilder, PermissionService]
})
export class ProjectDetailComponent implements  OnInit {
  project: any;
  authenticated: boolean;
  userID: any;
  id: string;
  permission: any;
  role: any;
  files: any;
  statusMsg: any;
  lastModifiedTime: any;
  errorMessage = {Name: '', DataCompliance: ''};
  users$: Observable<any>;
  results$: Observable<any>;
  newAnnotationForm: FormGroup;
  @ViewChild(PermissionsComponent) permissionComponent: PermissionsComponent;
  @ViewChild(FilesComponent) filesComponent: FilesComponent;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private permissionService: PermissionService,
    private fileService: FileService,
    private irbService: IrbService,
    private userService: UserService,
    private stateService: StateService,
    private elementRef: ElementRef,
    private fb: FormBuilder) {
      this.id = this.route.snapshot.params['id'];
      this.stateService.authenticated.subscribe(res => this.authenticated = res);
      this.stateService.user.subscribe(res => {
        this.getUserID(res.email, this.id);
      });
      this.projectService.getProjectByID(this.route.snapshot.params['id'])
                         .subscribe(res0 => {
                           this.project = res0;
                         });
      const eventStreamClick = Observable.fromEvent(elementRef.nativeElement, 'click')
            .map(() => this.project)
            .debounceTime(500)
            .subscribe(input => {
              this.statusMsg = '';
              this.update(this.project);
            });
      const eventStreamKeyUp = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.project)
            .debounceTime(500)
            .subscribe(input => {
              this.statusMsg = '';
              this.update(this.project);
            });
     }
  getUserID(id: string, projectID: string): void {
    this.userService.getUserIDByGmail(id)
              .subscribe(res => {
                this.getPermission(res[0]._id, projectID );
                this.userID = res[0]._id;
              });
    }
  getPermission(userID: string, projectID: string) {
    this.permissionService.getPermissionByUserByProject(userID, projectID)
        .subscribe(res => {
          this.permission = res;
        });
  }
  ngOnInit(): void {
    this.newAnnotationForm = new FormGroup({
        key: new FormControl(''),
        value: new FormControl('')
      });
  }

  update(project: Project): void {
    if ( !this.updatePreChecking(project)) {
      console.log('Please see the error message in red.');

    } else {
       this.projectService.update(project).subscribe(() => {
        this.statusReport();
        this.refresh();
      });
    }
  }

  updatePreChecking (project: Project): boolean {
    if (this.project.Name === '') {
        this.errorMessage.Name = 'Project Name is required.';
        return false;
      } else {
        this.errorMessage.Name = '';
        if (this.project.DataCompliance.ComplianceOption === 'human'
          && this.project.DataCompliance.HumanStudy === '') {
            this.errorMessage.DataCompliance = 'Any dataset derived from human study needs more specification.';
            return false;
      } else {
          if (this.project.DataCompliance.HumanStudy === 'IRBChecked'
              && this.project.DataCompliance.IRBNumber === '') {
                this.errorMessage.DataCompliance = 'IRB option is checked, must fill the IRB number to proceed.';
                return false;
          } else if (this.project.DataCompliance.HumanStudy === 'IECChecked'
              && this.project.DataCompliance.IECBNumber === '') {
                this.errorMessage.DataCompliance = 'IEC option is checked, must fill the IEC number to proceed.';
                return false;
          } else if (this.project.DataCompliance.HumanStudy === 'ExemptedCheckedWithWaiver'
              && this.project.DataCompliance.Waiver === '') {
                this.errorMessage.DataCompliance = 'Waiver option is checked, must fill the Waiver number to proceed.';
                return false;
          } else {
            this.errorMessage.DataCompliance = '';
            return true;
          }
      }
    }
  }

  refresh() {
    this.projectService.getProjectByID(this.route.snapshot.params['id'])
                        .subscribe(res0 => {
                          this.filesComponent.filerefresh();
                          });
  }
  statusReport() {
    this.statusMsg = 'Saving updates...';
    setTimeout(() => this.statusMsg = '', 1000);
    this.lastModifiedTime = Date();
  }
  fileUpdates(event) {
    this.update(this.project);
  }
  submitAnnotations(): void {
    this.project.Annotations.push(this.newAnnotationForm.value);
  }
  collectDataCompliance(value: string) {
    if (value === 'human') {
      this.update(this.project);
    } else if (value === 'non-human') {
      this.project.DataCompliance.IRBNumber = '';
      this.project.DataCompliance.IECNumber = '';
      this.project.DataCompliance.Waiver = '';
      this.project.DataCompliance.HumanStudy = '';
      console.log(this.project);
      this.update(this.project);
    }
  }
}

