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
      this.zone.run(() => {
        if (res !== null) {
          this.user = res;
        }
      });
    });
  }
  ngOnInit() {
    this.stateService.user.subscribe(res => {
      this.user = res;
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
                this.zone.run(() => { this.router.navigate(['/register']); });
                break;
            case 'loggedOut':
                this.loginService.googleLogOut();
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
        alert('Please Authenticate using your Gmail account. Please refer to Help page should you have any question.');
        this.loginService.googleLogin();
      }
    });
  }

  toggleLogin() {
    if (this.user === null) {
      this.loginService.googleLogin();
    } else {
      this.loginService.googleLogOut();
    }
  }

 }
