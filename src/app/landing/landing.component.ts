import { Component, OnInit , ElementRef} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { StateService } from '../service/state.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  authenticated = false;
  user: any;

  constructor( private stateService: StateService,
               private userService: UserService,
               private elementRef: ElementRef,
               private router: Router) {
    const eventStream = Observable.fromEvent(elementRef.nativeElement, 'mouseover')
            .map(() => this.authenticated)
            .debounceTime(500)
            .subscribe(input => {
              console.log('mouseover move');
            });
    this.stateService.user
        .subscribe(res => {
          this.user = res;
        });
    this.stateService.authenticated
        .subscribe(res => {
          this.authenticated = res;
          if (this.authenticated) {
            if (this.user !== null) {
              this.userService.getUserIDByGmail(this.user.email)
                  .subscribe( res => {
                    if (typeof(res[0]) !== 'undefined') {
                      console.log('Found user', res[0]);
                    } else {
                      console.log('Couldn\'t find this user from user collection');
                      setTimeout(() => {
                        this.router.navigate(['/register']);
                      }, 100);
                    }
                  });
            }
          } else {
              this.router.navigate(['/landing']);
          }
        });
  }

  goDashboard() {
    if (this.authenticated === true) {
      this.router.navigate(['projects/', 'dashboard']);
    } else {
      alert('Please Log in or register.');
    }
  }
  goAdmin() {
    this.router.navigate(['admin']);
  }
 }
