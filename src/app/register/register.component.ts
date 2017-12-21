import { Component, Input, OnInit, ViewChild, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { StateService } from '../service/state.service';
import { LoginService } from '../service/login.service';
import { UserEmailValidators } from '../validators/userEmail.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUserForm: FormGroup;
  user: any;
  internalUser: any;
  
  
  @ViewChild('LoginComponent') login;
  error = {
    fn: '',
    ln: '',
    email: '',
    in: ''
  };
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private stateService: StateService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.stateService.user.subscribe(res => {
      if (res !== null) {
        this.user = res;
       // this.ngOnInit()

      } else {
        this.router.navigate(['/landing']);
        // alert('Please Authenticate using your Gmail account. Please refer to Help page should you have any question.');
        // this.loginService.googleLogin();
      }
    });
  }

  errorMsgUpdate() {
    this.error = {fn: '', ln: '', email:'', in:''}

    if (this.newUserForm.value.FirstName === '') {
      this.error.fn = 'First Name is required.';
    } 
    if (this.newUserForm.value.LastName === '') {
      this.error.ln = 'Last Name is required.';
    } 
    if (this.newUserForm.value.Email === '') {
      this.error.email = 'Email is required';
    } else if (this.newUserForm.value.Email.search('[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+') === -1) {
      this.error.email = 'Email format is wrong';
    } 
    if (this.newUserForm.value.Institution === '') {
      this.error.in = 'Should not be empty.';
    } 
  }
  checking(): boolean {
    if ( this.error.fn === '' &&
    this.error.ln === '' &&
    this.error.email === '' &&
    this.error.in === '') {
      return true;
    } 
    
    return false;
    
  }

  isValid(): boolean{
    var pass = true;
    if(this.newUserForm.value.FirstName === ''){
      this.error.fn = 'First Name is required.'; pass=false;
    }
    if(this.newUserForm.value.LastName === ''){
      this.error.ln = 'Last Name is required.'; pass=false;
    }
    if(this.newUserForm.value.Email === ''){
      this.error.email = 'Email is required.'; pass=false;
    }else if(this.newUserForm.value.Email.search('[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+') === -1){
      this.error.email = 'Email format is wrong.'; pass=false;
    }
    if(this.newUserForm.value.Institution === ''){
      this.error.in = 'Institution is required.'; pass=false;
    }
  
    return pass;
  }

  submit() {
    
    this.newUserForm.value.Consent = true;
    this.newUserForm.value.Gmail = this.user.email;
    if (this.isValid()) {
      this.userService.create(this.newUserForm.value).subscribe((res) => {
        console.log('Create New User');
        this.internalUser = res
        this.loginService.googleLogOut();
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
    .subscribe(() => this.errorMsgUpdate());
  }

}
