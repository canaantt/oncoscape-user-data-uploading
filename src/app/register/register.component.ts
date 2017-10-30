import { Component, Input, OnInit, ViewChild, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { StateService } from '../service/state.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { UserEmailValidators } from '../validators/userEmail.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUserForm: FormGroup;
  internalUser: any;
  @ViewChild('LoginComponent') login;
  error = {
    fn: '',
    ln: '',
    email: {empty: '', format: '', duplicate: ''},
    in: ''
  };
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private stateService: StateService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.stateService.internalUser.subscribe(res => {
      if (res !== null) {
        this.internalUser = res;
      } else {
        this.router.navigate(['/landing']);
        // alert('Please Authenticate using your Gmail account. Please refer to Help page should you have any question.');
        // this.loginService.googleLogin();
      }
    });
  }

  checking(): boolean {
    if (this.newUserForm.value.FirstName === '') {
      this.error.fn = 'First Name is required.';
    } else {
      this.error.fn = '';
    }
    if (this.newUserForm.value.LastName === '') {
      this.error.ln = 'Last Name is required.';
    } else {
      this.error.ln = '';
    }
    if (this.newUserForm.value.Email === '') {
      this.error.email.empty = 'Email is required';
    } else {
      this.error.email.empty = '';
    }
    if (this.newUserForm.value.Email.search('[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+') === -1) {
      this.error.email.format = 'Email format is wrong';
    } else {
      this.error.email.format = '';
    }
    this.userService.userValidationByEmail(this.newUserForm.value.Email)
    .subscribe(res => {
      if (typeof(res[0]) !== 'undefined') {
        this.error.email.duplicate = 'This email has already been registered';
        return;
      } else {
        this.error.email.duplicate = '';
      }
    });
    if (this.newUserForm.value.Institution === '') {
      this.error.in = 'Should not be empty.';
    } else {
      this.error.in = '';
    }
    if ( this.error.fn === '' &&
    this.error.ln === '' &&
    this.error.email.empty === '' &&
    this.error.email.format === '' &&
    this.error.email.duplicate === '' &&
    this.error.in === '') {
      return true;
    } else {
      return false;
    }
  }
  submit() {
    const self = this;
    this.newUserForm.value.Consent = true;
    this.newUserForm.value.Gmail = this.internalUser.Gmail.gmail;
    if (this.checking()) {
      this.stateService.internalUser.next(this.newUserForm.value);
      this.userService.create(this.newUserForm.value).subscribe(() => {
        console.log('Create New User');
        this.loginService.googleLogin();
      });
    }
  }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      Institution: new FormControl('', Validators.required)
    });
    this.newUserForm.valueChanges
        .debounceTime(200)
        .subscribe(() => this.checking());
  }

}
