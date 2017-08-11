import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { StateService } from '../service/state.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUserForm: FormGroup;
  user: any;
  @ViewChild('LoginComponent') login;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private stateService: StateService,
    private router: Router
  ) {
    this.stateService.user.subscribe(res => this.user = res);
  }

  submit() {
    const self = this;
    this.newUserForm.value.Consent = true;
    this.newUserForm.value.Gmail = '';
    if (this.newUserForm.value.FirstName === '' ||
        this.newUserForm.value.LastName === '' ||
        this.newUserForm.value.Email === '' ||
        this.newUserForm.value.Institution === '') {
          alert('Please fill all the required fields to proceed');
          return;
       } else {
        this.userService.userValidationByEmail(this.newUserForm.value.Email)
            .subscribe(res => {
              if (typeof(res[0]) !== 'undefined') {
                alert('This email has already been linked to existing user. Please check accuracy.');
                return;
              } else {
                this.stateService.internalUser.next(this.newUserForm.value);
                // this.userService.create(this.newUserForm.value).subscribe(() => {
                  // alert('New User is added into Database.');
                  // this.stateService.authenticated.next(false);
                  // this.stateService.user.next(null);
                  // this.stateService.authenticated.next(true);
                  // this.stateService.user.next(this.newUserForm.value);
                  // self.login.googleLogin();
                  // this.router.navigate(['/projects', 'dashboard']);
                // });
              }
            });
      }
  }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      Email: new FormControl(''),
      Institution: new FormControl('')
    });
  }

}
