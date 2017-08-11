import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { StateService } from '../service/state.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  authenticated = false;
  user: any;
  internalUser: any;

  constructor( private stateService: StateService,
               private userService: UserService,
               private elementRef: ElementRef,
               private router: Router) {
                  this.stateService.user
                      .subscribe(res => {
                        this.user = res;
                      });
                  this.stateService.internalUser
                      .subscribe(res => {
                        this.internalUser = res;
                      }); // not quiet useful
                  this.stateService.authenticated
                      .subscribe(res => {
                        this.authenticated = res;
                      });
              }
  goDashboard() {
    if (this.authenticated === true) {
      this.router.navigate(['projects/', 'dashboard']);
    } else {
      alert('Please Log in or register.');
    }
  }
  toProfile() {
    this.router.navigate([`/users/${this.internalUser._id}/`]);
  }
 }


