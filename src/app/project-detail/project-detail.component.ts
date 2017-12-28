import { Component, Input, Output, SimpleChanges,  AfterViewInit, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Pipe, PipeTransform, NgZone, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';

import { User } from '../models/user';
import { Project } from '../models/project';
import { File } from '../models/file';

import { StateService } from '../service/state.service';
import { UserService } from '../service/user.service';
import { LoginService } from '../service/login.service';
import { ProjectService } from '../service/project.service';
import { PermissionService } from '../service/permission.service';
import { FileService } from '../service/file.service';

import { PermissionsComponent } from '../permissions/permissions.component';
import { FilesComponent } from '../files/files.component';
import { DateFormatter } from '../projects-dashboard/projects-dashboard.component';

enum roles {'full-access', 'read-only'}

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [FileService, UserService, FormBuilder, PermissionService]
})
export class ProjectDetailComponent implements  OnInit {
  user: any;
  project: any ;
  permission: any ;
  protocols= ['IRB', 'IEC', 'Exempt with Waiver', 'Exempt'];
  isCompliant= <boolean> false;
  errorMessage : {  Name: {msg: string, pass:boolean}, 
                    PHI:  {msg: string, pass:boolean},
                    Human:{msg: string, pass:boolean}, 
                    Protocol:{msg: string, pass:boolean}
                  }=  
                  { Name : {msg: 'Project Name is required.', pass: false} , 
                  PHI: {msg:'You must agree that all data is free of PHI.', pass:false } , 
                  Human: {msg:'Human Subject research requires additional protocol approval', pass:false }  ,
                  Protocol: {msg:'A protocol ID is required for non-exempt studies.', pass:false }   
                } ;
  
  newAnnotationForm: FormGroup;
  @ViewChild(PermissionsComponent) permissionComponent: PermissionsComponent;
  @ViewChild(FilesComponent) filesComponent: FilesComponent;

  @Input()
    filesExist: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private projectService: ProjectService,
    private permissionService: PermissionService,
    private fileService: FileService,
    private userService: UserService,
    private loginService: LoginService,
    private stateService: StateService,
    private elementRef: ElementRef,
    private fb: FormBuilder) {
      this.errorMessage =  
      { Name : {msg: 'Project Name is required.', pass: false} , 
        PHI: {msg:'You must agree that all data is free of PHI.', pass:false } , 
        Human: {msg:'Human Subject research requires additional protocol approval', pass:false }  ,
        Protocol: {msg:'A protocol ID is required for non-exempt studies.', pass:false }   
      } 
      this.stateService.internalUser
      .subscribe(res => {
        
        if (res === null) {
          this.checkLogin()
        }else{
          this.user = res;
          this.projectService.getProjectByID(this.route.snapshot.params['id'])
                            .subscribe(res => {
                              this.zone.run(() => {
                                this.setProject(res[0]);
                                this.updatePreChecking();
                              });
                            });        
                            
            this.permissionService.getPermissionByUserByProject(this.user._id, this.route.snapshot.params['id'])
                            .subscribe(r => {
                              this.zone.run(() => {
                                this.setPermission(r);
                              })
                            });
            
                          
        }
    });
    const eventStreamClick = Observable.fromEvent(elementRef.nativeElement, 'click')
      .map(() => this.project)
      .debounceTime(1000)
      .subscribe(input => {
        this.update(this.project);
    });
    const eventStreamKeyUp = Observable.fromEvent(elementRef.nativeElement, 'keyup')
      .map(() => this.project)
      .debounceTime(1000)
      .subscribe(input => {
        this.update(this.project);
    });
  }


  checkLogin() {
    const self = this
    setTimeout(function () {
        if (typeof self.user === "undefined") {
            self.loginService.googleLogOut();
        }
    }, 2000);
  }

  setPermission(permission: any): void {
    this.permission = permission;
  }

  setProject(project: any): void {
    this.project = project;
  }
  
  ngOnInit(): void {
    this.newAnnotationForm = new FormGroup({
        key: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required)
      });    
  }

  update(project: Project): void {
    
    this.updatePreChecking();
    console.log('STATUS:', this.isCompliant);
    
    if (!this.isCompliant) 
      console.log('Dataset error Message: ', this.errorMessage);
    
    this.projectService.update(project).subscribe(() => {
      if(this.project.File.size !== 0)
        this.filesComponent.filerefresh();                
    });
    
  }

  updatePreChecking (): void {
    this.isCompliant = false
    this.errorMessage.Name.pass = this.project.Name === '' ?  false : true;
    this.errorMessage.PHI.pass = this.project.PHI  ?  true : false;

    this.errorMessage.Human.pass = this.project.DataCompliance.HumanStudy == 'false' ?  true : false;  

    console.log(this.project.DataCompliance.Protocol)
    var reg = /^\d+$/;
    if (this.project.DataCompliance.Protocol == 'Exempt'){
      this.project.DataCompliance.ProtocolNumber = ''
      this.errorMessage.Protocol.pass = true;
    } else if (reg.test(this.project.DataCompliance.ProtocolNumber)){
      this.errorMessage.Protocol.pass = true; 
    } else {
      this.errorMessage.Protocol.pass = false; 
    }
    
    if ( this.errorMessage.Name.pass  &&   // has project name
          this.errorMessage.PHI.pass   &&  // certify not PHI
         ( this.errorMessage.Human.pass ||      // either not Human Subjects OR provides Protocol# or claims exemption
         this.errorMessage.Protocol.pass  )
        ) {
          this.isCompliant = true;
    }
  }
  
  submitAnnotations(): void {
    if (this.newAnnotationForm.valid) {
      this.project.Annotations.push(this.newAnnotationForm.value);
      this.newAnnotationForm.reset({key: '', value: ''});
    }
  }

}

