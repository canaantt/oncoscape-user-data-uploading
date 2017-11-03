import { Component, Input, Output, SimpleChanges,  AfterViewInit, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../models/project';
import { ProjectService } from '../service/project.service';
import { PermissionService } from '../service/permission.service';
import { File } from '../models/file';
import { FileService } from '../service/file.service';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { LoginService } from '../service/login.service';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import { PermissionsComponent } from '../permissions/permissions.component';
import { FilesComponent } from '../files/files.component';
import { StateService } from '../service/state.service';
import { DateFormatter } from '../projects-dashboard/projects-dashboard.component';
import { UpdateEmitService } from '../service/update-emit.service';
enum roles {'full-access', 'read-only'}

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [FileService, UserService, FormBuilder, PermissionService]
})
export class ProjectDetailComponent implements  OnInit {
  project: any;
  user: any;
  authenticated: boolean;
  userID: any;
  id: string;
  permission: any;
  role: any;
  files: any;
  statusMsg = false;
  lastModifiedTime: any;
  errorMessage = { Name: '', PHI: '', DataCompliance: ''};

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
    private userService: UserService,
    private stateService: StateService,
    private elementRef: ElementRef,
    private updateEmitService: UpdateEmitService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder) {
      this.id = this.route.snapshot.params['id'];
      this.stateService.user.subscribe(res => {
        if (res !== null) {
          this.user = res;
          this.getUserID(res.email, this.id);
        } else {
          this.loginService.googleLogOut();
        }
      });
      this.projectService.getProjectByID(this.route.snapshot.params['id'])
                         .subscribe(res0 => {
                           this.project = res0[0];
                           this.updatePreChecking();
                         });
      const eventStreamClick = Observable.fromEvent(elementRef.nativeElement, 'click')
            .map(() => this.project)
            .debounceTime(500)
            .subscribe(input => {
              this.update(this.project);
            });
      const eventStreamKeyUp = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.project)
            .debounceTime(500)
            .subscribe(input => {
              this.update(this.project);
            });
     }

  getUserID(id: string, projectID: string): void {
    this.userService.getUserByGmail(id)
              .map(res => res.json())
              .subscribe(res => {
                // this.getPermission(res.user._id, projectID );
                this.userID = res.user._id;
                this.permissionService.getPermissionByUserByProject(res.user._id, projectID)
                .subscribe(r => {
                  console.log(r);
                  console.log(res.user._id);
                  this.permission = r;
                });
              });
    }
  // getPermission(userID: string, projectID: string) {
  //   this.permissionService.getPermissionByUserByProject(userID, projectID)
  //       .subscribe(res => this.permission = res);
  // }
  ngOnInit(): void {
    this.newAnnotationForm = new FormGroup({
        key: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required)
      });
  }
  update(project: Project): void {
    this.updatePreChecking();
    console.log('STATUS:', this.statusMsg);
    if (!this.statusMsg) {
      console.log('Dataset error Message: ', this.errorMessage);
    } else {
       this.projectService.update(project).subscribe(() => {
        this.statusReport();
        this.refresh();
      });
    }
  }
  updatePreChecking (): void {
    if (this.project.Name === '') {
        this.errorMessage.Name = 'Project Name is required.';
        // this.statusMsg = false;
      } else {
        this.errorMessage.Name = '';
        // this.statusMsg = true;
      }
    if (this.project.DataCompliance.ComplianceOption === 'human'
      && (this.project.DataCompliance.HumanStudy === ''
      || typeof(this.project.DataCompliance.HumanStudy) === 'undefined')
      ) {
      console.log('no exempt is checked.');
      this.errorMessage.DataCompliance = 'Any dataset derived from human study needs more specification.';
      // this.statusMsg = false;
    } else {
      if (this.project.DataCompliance.HumanStudy === 'IRBChecked'
          && this.project.DataCompliance.IRBNumber === '') {
            this.errorMessage.DataCompliance = 'IRB option is checked, must fill the IRB number to proceed.';
            // this.statusMsg = false;
      } else if (this.project.DataCompliance.HumanStudy === 'IECChecked'
          && this.project.DataCompliance.IECNumber === '') {
            this.errorMessage.DataCompliance = 'IEC option is checked, must fill the IEC number to proceed.';
            // this.statusMsg = false;
      } else if (this.project.DataCompliance.HumanStudy === 'ExemptedCheckedWithWaiver'
          && this.project.DataCompliance.Waiver === '') {
            this.errorMessage.DataCompliance = 'Waiver option is checked, must fill the Waiver number to proceed.';
            // this.statusMsg = false;
      } else {
        this.errorMessage.DataCompliance = '';
        // this.statusMsg = true;
      }
    }
    if (!this.project.PHI) {
      this.errorMessage.PHI = 'You must agree that all data is free of PHI.';
      // this.statusMsg = false;
    } else {
      this.errorMessage.PHI = '';
      // this.statusMsg = true;
    }
    if (this.errorMessage.Name === '' &&
        this.errorMessage.PHI === '' &&
        this.errorMessage.DataCompliance === '') {
          this.statusMsg = true;
        } else {
          this.statusMsg = false;
        }
  }
  refresh() {
    this.projectService.getProjectByID(this.route.snapshot.params['id'])
                       .subscribe(res0 => {
                         this.filesComponent.filerefresh();
                        });
  }
  statusReport() {
    setTimeout(() => this.updateEmitService.updateState());
  }
  fileUpdates(event) {
    this.update(this.project);
  }
  submitAnnotations(): void {
    if (this.newAnnotationForm.valid) {
      this.project.Annotations.push(this.newAnnotationForm.value);
      this.newAnnotationForm.reset({key: '', value: ''});
    }
  }
  collectDataCompliance(value: string) {
    if (value === 'human') {
      this.update(this.project);
    } else if (value === 'non-human') {
      this.project.DataCompliance.IRBNumber = '';
      this.project.DataCompliance.IECNumber = '';
      this.project.DataCompliance.Waiver = '';
      this.project.DataCompliance.HumanStudy = '';
      this.update(this.project);
    }
  }
}

