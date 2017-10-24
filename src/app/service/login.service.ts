import { Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import * as hello from 'hellojs';
import { StateService } from '../service/state.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
@Injectable()
export class LoginService {

    
  GOOGLE_CLIENT_ID = '459144121975-lp2p5kahpqahm2gffgtl31vv0nes9hj4.apps.googleusercontent.com';
  oauthServiceStatus: EventEmitter<any> ;
  constructor(private stateService: StateService,
              private userService: UserService,
              private http: Http,
              private router: Router) {
      this.oauthServiceStatus = new EventEmitter<any>();
      hello.init({
        google: this.GOOGLE_CLIENT_ID,
      }, {
        force: true,
        redirect_uri: environment.oAuthRedirectUri, 
        display: 'popup',
        response_type: 'token',
        scope: 'email'

      });
      hello.on('auth', function() {console.log('state changed!'); });
      hello.on('auth.login', this.authLogin.bind(this));
      hello.on('auth.logout', this.authLogout.bind(this));
  }

  // Google service called by authLogin & authLogout using hello
  googleLogin(): any {
    this.googleLogOut();
    hello.login('google', {force:true});
  }
  googleLogOut(): any {
    window.location.assign("/");
    hello.logout('google', {force:true});
    // this.stateService.user.next(null);
    // this.stateService.jwtToken.next(null);
    // this.router.navigate(['/landing']);
  }

  authLogin(auth) {
    var token = auth.authResponse.access_token;
    this.http.post(environment.apiBaseUrl + 'token', {'token': token})
        .map(res => res.json())
        .subscribe((res) => {
          console.log('Google Access Token Recieved from Server: ', res);
          this.stateService.jwtToken.next(res);
          if ('token' in res) {
            hello('google').api('me').then( this.updateUserInfo.bind(this));
          } else if('gmail' in res) {
            console.log('in authLogin but not register situation: ', res);
            this.stateService.internalUser.next({'Gmail': res});
            this.oauthServiceStatus.emit('register');
          }
        });
  }
  authLogout(auth) {
    this.oauthServiceStatus.emit('loggedOut');
  }

  updateUserInfo (v) {
    console.log('Update User Info');
    this.userService.getUserByGmail(v.email)
    .map(res => res.json())
    .subscribe(r => {
      console.log('LOGIN SERVICE, USER SERVICE.getUserByGmail...', r);
      if (r.user !== null) {
        this.stateService.user.next(v);
        this.oauthServiceStatus.emit('loggedIn');
      }
    });

    // this.stateService.internalUser.subscribe(res => {
    //   const internalUser = res;
    //   console.log('internal user: ', res);
    //   if (internalUser !== null && internalUser.Gmail === '') {
    //     internalUser.Gmail = v.email;
    //     console.log('-- email'+ v.email);

    //     this.userService.create(internalUser)
    //         .subscribe(() => console.log('New User is added to database'));
    //   } else {
    //     this.userService.getUserByGmail(v.email)
    //         .map(res => res.json())
    //         .subscribe(r => {
    //           console.log('LOGIN SERVICE, USER SERVICE.getUserByGmail...', r);
    //           if (r.user !== null) {
    //             this.stateService.user.next(v);
    //             this.oauthServiceStatus.emit('loggedIn');
    //           } else {
    //             console.log('Email subscriber undefined');
    //             this.oauthServiceStatus.emit('register');
    //           }
    //         });
    //     }
    // });
  }
}
