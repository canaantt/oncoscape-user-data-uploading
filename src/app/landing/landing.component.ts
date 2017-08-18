import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { StateService } from '../service/state.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { LoginService } from '../service/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  user: any;
  newForm: FormGroup;
  constructor( private fb: FormBuilder,
               private stateService: StateService,
               private userService: UserService,
               private loginService: LoginService,
               private router: Router,
               private ref: ChangeDetectorRef ) {
                this.stateService.user.subscribe(data => {
                  this.user = data;
                });
                console.log('Landing component is being called.');
               }
  ngOnInit() {
    this.newForm = this.fb.group({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required)
    });
    this.OnChanges();
  }
  OnChanges(): void {
    this.newForm.valueChanges.subscribe(val =>
    console.log(val));
  }
  submit() {
    console.log(this.newForm.value);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
  googleLogin() {
    this.loginService.googleLogin();
  }
  googleLogOut() {
    this.loginService.googleLogOut();
  }
 }
