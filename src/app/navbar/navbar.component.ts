import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../service/state.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  user: any;
  constructor( private stateService: StateService,
               private userService: UserService,
               private loginService: LoginService,
               private router: Router) {
                  console.log('in Nav Constructor');
                  this.loginService.userGoogleProfile.subscribe((data) => {
                    this.user = data;
                });
              }
  goDashboard() {
    if (this.user) {
      this.router.navigate(['projects/', 'dashboard']);
    } else {
      alert('Please Log in or register.');
    }
  }
  goHelp() {
    this.router.navigate(['help']);
  }
  googleLogOut() {
    this.loginService.googleLogOut();
  }

  toProfile() {
      this.userService.getUserIDByGmail(this.user.email)
        .subscribe(res => {
          this.router.navigate([`/users/${res[0]._id}/`]);
        });
  }
 }


