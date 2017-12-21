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
    this.stateService.user.subscribe(res => {
      this.zone.run(() => { this.user = res; });
    });
  }
  ngOnInit() {
    const timer = Observable.timer(10, 200);
    this.subscription = timer.subscribe(() => {
      this.getUser();
      if (typeof this.user !== "undefined") {
        this.subscription.unsubscribe();
      }
    });
    this.loginService.oauthServiceStatus
        .subscribe((msg) => {
          console.log(msg);
          switch (msg) {
            case 'loggedIn':
                this.router.navigate(['/projects', 'dashboard']);
                break;
            case 'register':
                // alert('User is not registered yet. Please register. Be sure to turn on the browser pop-up window.');
                this.zone.run(() => {this.router.navigate(['/register'])});
                break;
            case 'loggedOut':
                this.googleLogOut();
                this.router.navigate(['/landing']);
                break;
            default:
                console.log('default');
          }
        });
  }

  goRegister() {
    this.stateService.internalUser.subscribe(res => {
      if (res !== null) {
        this.router.navigate(['/register']);
      } else {
        // alert('Please Authenticate using your Gmail account. Please refer to Help page should you have any question.');
        this.loginService.googleLogin();
      }
    });
  }

  toggleLogin() {
    if(this.user === null) this.googleLogin()
    else this.googleLogOut()
  }
  
  googleLogin() {
    this.loginService.googleLogin();
  }

  googleLogOut() {
    console.log('in landing component, googleLogout...');
    this.loginService.googleLogOut();
  }
 }
