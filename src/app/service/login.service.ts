import { Injectable } from '@angular/core';
import { Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import * as hello from 'hellojs';
import { StateService } from '../service/state.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
@Injectable()
export class LoginService {

    GOOGLE_CLIENT_ID = '1098022410981-p7n5ejjji8qlvdtff274pol54jo5i8ks.apps.googleusercontent.com';

    loggedIn: EventEmitter<any> ;
    userGoogleProfile: EventEmitter<any> ;
    constructor(private stateService: StateService,
                private userService: UserService,
                private router: Router) {
        this.loggedIn = new EventEmitter<any>();
        this.userGoogleProfile = new EventEmitter<any>();

        hello.init({
          google: this.GOOGLE_CLIENT_ID,
        }, {
          force: true,
          redirect_uri: '/landing',
          display: 'popup',
          response_type: 'token',
          scope: 'email'
        });
          hello.on('auth.login', this.authLogin.bind(this));
          hello.on('auth.logout', this.authLogout.bind(this));
          hello.on('auth.change', function() {alert('state changed!'); });
    }
    googleLogin(): any {
      this.googleLogOut();
      this.stateService.user.next(null);
      hello.login('google');
    }
    googleLogOut(): any {
      hello.logout('google', {}, this.updateAuth.bind(this, false));
    }
    authLogin(auth) {
      hello('google').api('me').then( this.updateUserInfo.bind(this) );
    }
    authLogout(auth) {
      alert("LOGOUIT");
      this.updateUserInfo.bind(this, null);
      this.updateAuth.bind(this, false);
      this.router.navigate(['/landing']);
    }

    updateUserInfo(v) {
    debugger;
      this.stateService.user.next(v);
      this.loggedIn.emit(true);
      this.userGoogleProfile.emit(v);
      let internalUser;
      this.stateService.internalUser.subscribe(res => {
        internalUser = res;
      });
      if (internalUser !== null && internalUser.Gmail === '') {
        console.log('This is the registration process.');
        internalUser.Gmail = v.email;
        // this.stateService.internalUser.next(internalUser);
        this.userService.create(internalUser)
            .subscribe(() => console.log('New User is added to database'));
      } else {
        this.userService.getUserIDByGmail(v.email)
            .subscribe(res => {
              if (typeof(res[0]) !== 'undefined') {
                internalUser = res[0];
                this.stateService.internalUser.next(internalUser);
                // this.router.navigate(['projects', 'dashboard']);
              } else {
                alert('User is not registered yet. ');
                this.router.navigate(['/landing']);
              }
            });
      }
    }
    getRegisteredUser(user: User) {
      this.stateService.user.subscribe(res => {
        user.Gmail = res.email;
        this.stateService.internalUser.next(user);
        this.userService.create(user)
            .subscribe(() => console.log('A new user is added to database.'));
      });
    }
    updateAuth(v) {
      debugger;
      this.stateService.authenticated.next(v);
    }
}
