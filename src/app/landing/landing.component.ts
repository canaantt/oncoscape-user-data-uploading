import { Component, OnInit, Input} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { StateService } from '../service/state.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  private authenticated: boolean;
  private user: any;
  private internalUser: any;

  constructor( private stateService: StateService,
               private userService: UserService,
               private loginService: LoginService,
               private router: Router) {

    this.stateService.user
        .subscribe(res => {
          
          this.user = res 
        });
    this.stateService.authenticated
        .subscribe(res => {

          this.authenticated = res;
        });
    this.stateService.internalUser
        .subscribe( res => this.internalUser);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
  googleLogin() {
    
    this.loginService.loggedIn.subscribe(res => {
      this.authenticated = res;
      // console.log(this.authenticated);
      // this.router.navigate(['/projects', 'dashboard']);
    });
    this.loginService.userGoogleProfile.subscribe(res => {
      this.user = res;
      console.log('user info is ', res);
    });
    this.loginService.googleLogin();
    
  }
  updateAuth(event) {
    this.authenticated = event;
  }
  googleLogOut() {
    this.loginService.googleLogOut();
  }
 }
