import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
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

export class NavbarComponent implements OnInit {
  // authenticated = false;
  user: any;

  constructor( private stateService: StateService,
               private userService: UserService,
               private loginService: LoginService,
               private router: Router) {
                  this.stateService.user
                      .subscribe(res => {
                        this.user = res;
                      });
                  // this.stateService.internalUser
                  //     .subscribe(res => {
                  //       this.internalUser = res;
                  //     }); // not quiet useful
                  // this.stateService.authenticated
                  //     .subscribe(res => {
                  //       this.authenticated = res;
                  //     });
                  // this.loginService.loggedIn.subscribe(res => {
                  //   this.authenticated = res;
                  //   // this.router.navigate(['/projects', 'dashboard']);
                  // });
              }
  goDashboard() {
    if (this.user) {
      this.router.navigate(['projects/', 'dashboard']);
    } else {
      alert('Please Log in or register.');
    }
  }
  ngOnInit() {
    this.loginService.userGoogleProfile.subscribe(res => {
      this.user = res;
      console.log('@@@user info is ', res);
    });
  }
  googleLogOut() {
    console.log('trying to log out.');
    this.loginService.googleLogOut();
  }

  toProfile() {
      this.userService.getUserIDByGmail(this.user.email)
        .subscribe(res => {
          this.router.navigate([`/users/${res[0]._id}/`]);
        });
  }
 }


