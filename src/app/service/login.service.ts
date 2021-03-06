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
import '../../../aws-sdk/aws-sdk.min.js';
@Injectable()
export class LoginService {

  GOOGLE_CLIENT_ID = '459144121975-lp2p5kahpqahm2gffgtl31vv0nes9hj4.apps.googleusercontent.com';
  oauthServiceStatus: EventEmitter<any> ;
  window: any = window;
  AWS: any = this.window.AWS;
  constructor(private stateService: StateService,
              private userService: UserService,
              private http: Http,
              private router: Router) {
      this.AWS.config.region = 'us-west-2';
      this.AWS.config.credentials = new this.AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:e9a312b9-f572-4e09-831f-fedd7bbd8134'
      });

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
      hello.on('auth.login', this.authLogin.bind(this));
      hello.on('auth.logout', this.authLogout.bind(this));
  }

  // Google service called by authLogin & authLogout using hello
  googleLogin(): any {
    hello.login('google', {force: true});
  }
  googleLogOut(): any {
    window.location.assign('/');
    this.stateService.jwtToken = null;
    hello.logout('google', {force: true});
  }

  authLogin(auth) {
    const token = auth.authResponse.access_token;
    this.stateService.googleToken.next(token);
    this.http.post(environment.apiBaseUrl + 'token', {'token': token})
        .map(res => res.json())
        .subscribe((res) => {
          console.log(res);
          if ('token' in res) {
            this.stateService.jwtToken.next(res);
            hello('google').api('me').then( this.updateUserInfo.bind(this));
          } else  {
            this.stateService.user.next(res);
            this.oauthServiceStatus.emit('register');
          }
        });
  }
  authLogout(auth) {
    console.log('logging out..');
    this.oauthServiceStatus.emit('loggedOut');
  }

  updateUserInfo (v) {
    console.log('in updateUserInfo');
    console.log(v);
    this.userService.getUserByGmail(v.email)
    .map(res => res.json())
    .subscribe(r => {
      console.log('r: ', r);
      if (typeof r !== 'undefined') {
        console.log('are we here?');
        console.log('logging in...');
        this.stateService.user.next(v);
        this.stateService.internalUser.next(r);
        this.oauthServiceStatus.emit('loggedIn');
      }
    });
  }
}
