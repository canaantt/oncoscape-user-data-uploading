import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../service/state.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { LoginService } from '../service/login.service';
import { UpdateEmitService } from '../service/update-emit.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  user: any;
  colors = ['red', 'orange', 'blue', '#9fe25a', 'purple', '#88c26e', '#70936c', '#40e0d0', '#99d5cf'];
  color: string;
  counter = 0 ;
  constructor( private stateService: StateService,
               private userService: UserService,
               private loginService: LoginService,
               private updateEmitService: UpdateEmitService,
               private slimLoadingBarService: SlimLoadingBarService,
               private router: Router) {
                  console.log('in Nav Constructor');
                  this.stateService.user.subscribe((data) => {
                    this.user = data;
                });
              }
  ngOnInit() {
    this.updateEmitService.updateStatus
        .subscribe((res) => {
          console.log(res);
          console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
          this.color = this.colors[(this.counter++ % 9)];
          this.completeLoading();
        });
  }
  startLoading() {
      this.slimLoadingBarService.start(() => {
          console.log('Loading complete');
      });
  }

  stopLoading() {
      this.slimLoadingBarService.stop();
  }

  completeLoading() {
      this.slimLoadingBarService.complete();
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


