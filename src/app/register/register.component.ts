import { Component, Input, OnInit, ViewChild, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { StateService } from '../service/state.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUserForm: FormGroup;
  user: any;
  @ViewChild('LoginComponent') login;
  getRegisteredUser: EventEmitter<any>;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private stateService: StateService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.stateService.user.subscribe(res => this.user = res);
    this.getRegisteredUser = new EventEmitter<any>();
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
                // this.getRegisteredUser.emit(this.newUserForm.value);
                // this.stateService.internalUser.next(this.newUserForm.value);
                this.loginService.getInternalUser(this.newUserForm.value);
                this.loginService.googleLogin();
              }
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
  }

}
