import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs/Observable';
import { DateFormatter } from '../projects-dashboard/projects-dashboard.component';
import { UserEmailValidators } from '../validators/userEmail.validator';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  // @Input() user: User;
  id: any;
  user: any;
  formattedDate: string;
  error = {
    fn: '',
    ln: '',
    email: {empty: '', format: '', duplicate: ''},
    in: ''
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private elementRef: ElementRef,
              private userService: UserService) {
                this.id = this.route.snapshot.params['id'];
                this.userService.getUsersByID(this.id)
                    .subscribe(res => {
                      console.log(res);
                      this.user = res[0];
                    });
              const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
                    .map(() => this.user)
                    .debounceTime(500)
                    .subscribe(input => {
                      this.checking();
                      // this.update(this.user);
                    });
              }

  checking() {
      if (this.user.FirstName === '') {
        this.error.fn = 'Should not be empty.';
      } else {
        this.error.fn = '';
      }

      if (this.user.LastName === '') {
        this.error.ln = 'Should not be empty.';
      } else {
        this.error.ln = '';
      }

      if (this.user.Email === '') {
        this.error.email.empty = 'Should not be empty.';
      } else {
        this.error.email.empty = '';
      }

      if (this.user.Email.search('[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+') === -1) {
        this.error.email.format = '::Not Email format. Please check accuracy.';
      } else {
        this.error.email.format = '';
      }
      this.userService.userValidationByEmail(this.user.Email)
          .subscribe(res => {
            if (typeof(res[0]) !== 'undefined' && res[0]._id !== this.id) {
              this.error.email.duplicate = '::This institute email is associated with' +
                                'another existing user. Please choose a different institutional email.';
            } else {
              this.error.email.duplicate = '';
            }
          });
      if (this.user.Institution === '') {
        this.error.in = 'Should not be empty.';
      } else {
        this.error.in = '';
      }
  }
  ngOnInit() {
    // if (this.user.FirstName === '') {this.error.fn = 'Should not be empty.'; }
    // if (this.user.LastName === '') {this.error.ln = 'Should not be empty.'; }
    // if (this.user.Email === '') {this.error.email = 'Should not be empty.'; }
    // if (this.user.Email.search('[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+') === -1) {
    //   this.error.email = this.error.email + '::Not Email format. Please check accuracy.';
    // }
    // this.userService.userValidationByEmail(this.user.Email)
    //     .subscribe(res => {
    //       if(res[0]._id !== this.id){
    //         this.error.email = this.error.email + '::This institute email is associated with' +
    //                            'another existing user. Please choose a different institutional email.';
    //       }
    //     });
    // if (this.user.Institution === '') {this.error.in = 'Should not be empty.'; }
  }
  update(user: User): void {
    if (this.error.fn !== '' ||
        this.error.ln !== '' ||
        this.error.email.empty !== '' ||
        this.error.email.format !== '' ||
        this.error.email.duplicate !== '' ||
        this.error.in !== '' ) {
         alert('All fields are required.');
         return;
       } else {
        this.userService.update(user).subscribe(() => alert('User Information has been updated.'));
       }
  }
  goHomepage(): void {
    this.router.navigate(['/landing']);
  }
}
