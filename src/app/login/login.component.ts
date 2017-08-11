import { Component, Output, Input, EventEmitter, OnInit, ElementRef} from '@angular/core';
import * as hello from 'hellojs';
import { StateService } from '../service/state.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  GOOGLE_CLIENT_ID = '1098022410981-p7n5ejjji8qlvdtff274pol54jo5i8ks.apps.googleusercontent.com';
  authenticated = false;
  user: any;
  internalUser: any;

  constructor(private stateService: StateService,
              private elementRef: ElementRef,
              private userService: UserService,
              private router: Router) {
      this.stateService.authenticated
          .subscribe(res => this.authenticated = res);
      this.stateService.user
          .subscribe(res => this.user = res );
      this.stateService.internalUser
          .subscribe(res => this.internalUser = res);
      hello.init({
        google: this.GOOGLE_CLIENT_ID
      }, {
        force: true,
        redirect_uri: '/landing'});
      hello.on('auth.login', this.authLogin.bind(this));
      hello.on('auth.logout', this.authLogout.bind(this));
      hello.on('auth.change', function() {alert('state changed!'); });
  }
  googleLogin(): any {
    this.googleLogOut();
    this.stateService.user.next(null);
    hello.login('google', {
                 display: 'popup',
                 response_type: 'token',
                 scope: 'email',
                 redirect_uri: '/landing'
              }, this.updateAuth.bind(this, true));
  }
  googleLogOut(): any {
    hello.logout('google', {}, this.updateAuth.bind(this, false));
  }
  authLogin(auth) {
    hello('google').api('me').then( this.updateUserInfo.bind(this) );
  }
  authLogout(auth) {
    this.updateUserInfo.bind(this, null);
    this.updateAuth.bind(this, false);
    this.router.navigate(['/landing']);
  }
  updateUserInfo(v) {
    console.log('In LOGIN COMPONENT, updateUserInfo... v is, ', v);
    this.stateService.user.next(v);
    this.user = v;
    if (this.internalUser !== null && this.internalUser.Gmail === '') {
      console.log('This is the registration process.');
      this.internalUser.Gmail = v.email;
      this.stateService.internalUser.next(this.internalUser);
      this.userService.create(this.internalUser)
          .subscribe(() => {
            setTimeout(() => {
              this.router.navigate(['projects', 'dashboard']);
            }, 1000);
          });
    } else {
      this.userService.getUserIDByGmail(v.email)
          .subscribe(res => {
            if (typeof(res[0]) !== 'undefined') {
              this.internalUser = res[0];
              this.stateService.internalUser.next(this.internalUser);
              this.router.navigate(['projects', 'dashboard']);
            } else {
              alert('User is not registered yet. ');
              setTimeout(() => {
                this.router.navigate(['projects', 'dashboard']);
              }, 1000);
            }
          });
    }
  }
  updateAuth(v) {
    this.stateService.authenticated.next(v);
  }
}
