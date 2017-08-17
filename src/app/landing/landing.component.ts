import { Component, OnInit, Input} from '@angular/core';
import { LoginComponent } from '../login/login.component';
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
  private userObjectChange  = new Subject<any>();
  userObjectChange$ = this.userObjectChange.asObservable();
  private user: any;
  @Input()
  set userS (user: any) {
    this.stateService.user
    .subscribe(res => {
      this.userObjectChange.next(res);
      this.user = res;
    });
  }
  get userS (): any {
    return this.user;
  }
  constructor( private stateService: StateService,
               private userService: UserService,
               private loginService: LoginService,
               private router: Router) {
    this.stateService.user
        .subscribe(res => {
          this.user = res;
        });
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
  googleLogin() {
    this.loginService.googleLogin();
  }
  // updateAuth(event) {
  //   this.authenticated = event;
  // }
  googleLogOut() {
    this.loginService.googleLogOut();
  }
 }
