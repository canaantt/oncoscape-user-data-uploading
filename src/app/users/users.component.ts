import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { UserEmailValidators } from '../validators/userEmail.validator';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;
  newUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: Http
  ) { }

  
  onSelect(user: User): void {
    this.selectedUser = user;
  }

  submit() {
    this.userService.create(this.newUserForm.value).subscribe(() => console.log('user is created.'));
  }

  ngOnInit(): void {
    
    this.newUserForm = this.fb.group({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Photo: new FormControl(''),
      Email: new FormControl('', [Validators.required, UserEmailValidators.UserEmailFormat]),
      Group: new FormControl('')
    });

    this.newUserForm.valueChanges
    .filter(val => {
      return val.Email.length >= 2;
    }).map(val => val.Email)
    .debounceTime(500)
    .switchMap(val => this.users.map(users => users.Email).filter(emails => emails.indexOf(val) === -1))
    .subscribe(val => {
      if (val.length === 0 ) {
        console.log('valid');
      } else {
        console.log('invalid');
      }
    });
  }
}

