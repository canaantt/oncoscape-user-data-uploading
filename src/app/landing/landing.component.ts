import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
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
  previousUser: any;
  auth: boolean;
  user$: Observable<any>;
  counter = 0;
  subscription: any;
  constructor( private fb: FormBuilder,
               private stateService: StateService,
               private userService: UserService,
               private loginService: LoginService,
               private ref: ChangeDetectorRef,
               private zone: NgZone,
               private router: Router ) {}
  getUser(): void {
    // console.log('Landing getUser being called', this.counter++);
    this.stateService.user.subscribe(res => {
      this.zone.run(() => { this.user = res; });
    });
  }
  ngOnInit() {
    // this.getUser();
    const timer = Observable.timer(10, 500);
    this.subscription = timer.subscribe(() => {
      this.getUser();
      if (this.user !== null) {
        this.subscription.unsubscribe();
        console.log('This section is called.');
      }
    });
  }
  update() {
    this.stateService.user.subscribe(res => {
      this.user = res;
      console.log('in update');
      this.ref.markForCheck();
      console.log('after ref.markForCheck');
    });
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
