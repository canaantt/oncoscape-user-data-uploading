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
export class LoginComponent implements OnInit {
  GOOGLE_CLIENT_ID = '1098022410981-p7n5ejjji8qlvdtff274pol54jo5i8ks.apps.googleusercontent.com';
  authenticated = false;
  user: any;
  internalUser: any;

  constructor(private stateService: StateService,
              private elementRef: ElementRef,
              private userService: UserService,
              private router: Router) {
      hello.init({
        google: this.GOOGLE_CLIENT_ID
      }, {
        force: true,
        redirect_uri: '/landing'});
      hello.on('auth.login', this.authLogin.bind(this));
      hello.on('auth.logout', this.authLogout.bind(this));
      hello.on('auth.change', function() {alert('state changed!'); });
      this.stateService.authenticated
          .subscribe(res => {
            this.authenticated = res;
          });
      this.stateService.user
          .subscribe(res => {
            this.user = res;
          });
      this.stateService.internalUser
          .subscribe(res => {
            this.internalUser = res;
          });
  }
  ngOnInit() {
    console.log('Login Component ngOnInit');
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
    this.stateService.user.next(v);
    if (this.internalUser !== null) {
      this.internalUser.Gmail = v.email;
      this.stateService.internalUser.next(this.internalUser);
      this.userService.create(this.internalUser)
          .subscribe(() => console.log('Registered User Gmail is linked.'));
    } else {
      console.log('Couldn\'t find this user from user collection');
      setTimeout(() => {
        this.router.navigate(['/register']);
      }, 100);
    }
    // this.userService.getUserIDByGmail(this.user.email)
    //                 .subscribe( res => {
    //                 if (typeof(res[0]) !== 'undefined') {
    //                   console.log('Found user', res[0]);
    //                 } else {
    //                   console.log('Couldn\'t find this user from user collection');
    //                   setTimeout(() => {
    //                     this.router.navigate(['/register']);
    //                   }, 100);
    //                 }
    //               });

  }
  updateAuth(v) {
    this.stateService.authenticated.next(v);
  }
  goRegister() {
    this.router.navigate(['/register']);
  }
}
