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
        // redirect_uri: 'https://dev.oncoscape.sttrcancer.io/upload/',
        redirect_uri: environment.oAuthRedirectUri,
        display: 'popup',
        response_type: 'token',
        scope: 'email'

      });
      //hello.on('auth', function() { console.log('state changed!'); });
      hello.on('auth.login', this.authLogin.bind(this));
      hello.on('auth.logout', this.authLogout.bind(this));
  }

  // Google service called by authLogin & authLogout using hello
  googleLogin(): any {
    //this.googleLogOut();
    hello.login('google', {force: true});
  }
  googleLogOut(): any {
    window.location.assign('/upload/');
    this.stateService.jwtToken = null;
    hello.logout('google', {force: true});
  }

  authLogin(auth) {
    const token = auth.authResponse.access_token;

    this.http.post(environment.apiBaseUrl + 'token', {'token': token})
        .map(res => res.json())
        .subscribe((res) => {
          console.log(res)
          
          if ('token' in res) {
            this.stateService.jwtToken.next(res);
            hello('google').api('me').then( this.updateUserInfo.bind(this));
          } else  {
            // res = res.map(function(d){ return {
            //   email: res.email,
            //   first: res.first_name,
            //   last: res.last_name,
            //   verified: res.verified
            // }})
            this.stateService.user.next(res);
            this.oauthServiceStatus.emit('register');
          }
        });
  }
  authLogout(auth) {
    this.oauthServiceStatus.emit('loggedOut');
  }

  updateUserInfo (v) {
    this.userService.getUserByGmail(v.email)
    .map(res => 
      res.json()[0])
    .subscribe(r => {
      if (typeof r !== "undefined") {
        this.stateService.user.next(v);
        this.stateService.internalUser.next(r);
        this.oauthServiceStatus.emit('loggedIn');
      }
    });
  }
}
