import { Component, OnInit, Input} from '@angular/core';
import { StateService } from '../service/state.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  user: any;
  public watchTest;
  constructor( private stateService: StateService,
               private userService: UserService,
               private loginService: LoginService,
               private router: Router) {
                 this.setWatch();
                 this.seeWatch();
               }
  setWatch() {
    this.watchTest = this.stateService.user;
  }
  seeWatch() {
    this.watchTest.subscribe((data) => {
        this.user = data;
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
