import { Component, Input, Output, SimpleChanges,  AfterViewInit, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
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
import { UpdateEmitService } from '../service/update-emit.service';

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
  isCompliant= <boolean> false;
  errorMessage : {  Name: {msg: string, pass:boolean}, 
                    PHI:  {msg: string, pass:boolean},
                    Human:{msg: string, pass:boolean}, 
                    Protocol:{
                      IRB:{msg: string, pass:boolean}, 
                      IEC:{msg: string, pass:boolean},
                      Waiver:{msg: string, pass:boolean}, 
                      Exempt:{msg: string, pass:boolean}
                  }}=  
                  { Name : {msg: 'Project Name is required.', pass: false} , 
                    PHI: {msg:'You must agree that all data is free of PHI.', pass:false } , 
                    Human: {msg:'Human Subject research requires additional protocol approval', pass:false }  ,
                    Protocol: {  
                      IRB: {msg:'IRB option is checked, must fill the IRB number to proceed.', pass:false } ,
                      IEC: {msg:'IEC option is checked, must fill the IEC number to proceed.' , pass:false } ,
                      Waiver: {msg:'Waiver option is checked, must fill the Waiver number to proceed.' , pass:false } ,
                      Exempt: {msg:'Waiver option is checked, must fill the Waiver number to proceed.', pass:false } 
                  }} ;
  
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
      this.errorMessage =  
      { Name : {msg: 'Project Name is required.', pass: false} , 
        PHI: {msg:'You must agree that all data is free of PHI.', pass:false } , 
        Human: {msg:'Human Subject research requires additional protocol approval', pass:false }  ,
        Protocol: {  
          IRB: {msg:'IRB option is checked, must fill the IRB number to proceed.', pass:false } ,
          IEC: {msg:'IEC option is checked, must fill the IEC number to proceed.' , pass:false } ,
          Waiver: {msg:'Waiver option is checked, must fill the Waiver number to proceed.' , pass:false } ,
          Exempt: {msg:'Waiver option is checked, must fill the Waiver number to proceed.', pass:false } 
      }} 
      this.stateService.internalUser
      .subscribe(res => {
        this.user = res;
        if (this.user == null) 
          this.loginService.googleLogOut();
        else{
          this.projectService.getProjectByID(this.route.snapshot.params['id'])
                            .subscribe(res => {
                              this.setProject(res[0]);
                              this.updatePreChecking();
                            });        
                            
            this.permissionService.getPermissionByUserByProject(this.user._id, this.route.snapshot.params['id'])
                            .subscribe(r => {
                              this.setPermission(r);
                            });
                          
        }
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
    if (!this.isCompliant) {
      console.log('Dataset error Message: ', this.errorMessage);
    } else {
       this.projectService.update(project).subscribe(() => {
        this.statusReport();
        this.refresh();
      });
    }
  }
  updatePreChecking (): void {
    this.isCompliant = false
    this.errorMessage.Name.pass = this.project.Name === '' ?  false : true;
    this.errorMessage.PHI.pass = this.project.PHI  ?  true : false;

    this.errorMessage.Human.pass = this.project.DataCompliance.HumanStudy == 'false' ?  true : false;  

    var reg = /^\d+$/;

    if (this.project.DataCompliance.HumanStudy === 'IRB' && reg.test(this.project.DataCompliance.IRBNumber)) {
      this.errorMessage.Protocol.IRB.pass = true;       
    } else if (this.project.DataCompliance.HumanStudy === 'IEC' && reg.test(this.project.DataCompliance.IECNumber)) {
      this.errorMessage.Protocol.IEC.pass = true ;       
    } else if (this.project.DataCompliance.HumanStudy === 'ExemptWithWaiver' && reg.test(this.project.DataCompliance.Waiver)) {
      this.errorMessage.Protocol.Waiver.pass = true ;           
    } else if (this.project.DataCompliance.HumanStudy == 'Exempt'){
      this.errorMessage.Protocol.Exempt.pass = true;
    }
    
    
    if ( this.errorMessage.Name.pass  &&   // has project name
          this.errorMessage.PHI.pass   &&  // certify not PHI
         ( this.errorMessage.Human.pass ||      // either not Human Subjects OR provides Protocol# or claims exemption
         (this.errorMessage.Protocol.IRB.pass   || this.errorMessage.Protocol.IEC.pass || 
          this.errorMessage.Protocol.Waiver.pass|| this.errorMessage.Protocol.Exempt.pass) )
        ) {
          this.isCompliant = true;
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
  collectProtocol(value: string) {
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

