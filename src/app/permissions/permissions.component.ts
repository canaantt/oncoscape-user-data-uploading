import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Permission } from '../models/permission';
import { PermissionService } from '../service/permission.service';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { UserEmailValidators } from '../validators/userEmail.validator';
enum roles {'admin', 'read-write', 'read-only'}
@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {
  constructor(private userService: UserService) {}
  transform(id: string): Observable<string> {
      return this.userService.getUsersByID(id)
      .map(res => res[0].FirstName + ' ' + res[0].LastName);
  }
}
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  providers: [ PermissionService, UserService, FormBuilder ]
})
export class PermissionsComponent implements OnInit {
  // permissions: Array<any>;
  newPermissionForm: FormGroup;
  permissions$: Observable<any>;
  roles= ['admin', 'read-write', 'read-only'];
  @Input() project: any;
  @Input() role: any;
  id: string;
  emailError: string;

  constructor( private userService: UserService,
               private permissionService: PermissionService,
               private fb: FormBuilder ) { }

  ngOnInit() {
    this.newPermissionForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.minLength(10), UserEmailValidators.UserEmailFormat]),
      Role: new FormControl('read-only', Validators.required)
    });
    this.id = this.project._id;
    this.getPermissions();
  }

  getPermissions(): void {
    this.permissions$ = this.permissionService.getPermissionsByProjectID(this.id);
    // this.permissionService.getPermissionsByProjectID(this.id)
    //     .map(res => res.json())
    //     .subscribe(res => {
    //       this.permissions = res;
    //     });
  }

  permissionItem(val: string) {
    return new FormGroup({
      Email: new FormControl(val, [Validators.required, Validators.minLength(10), UserEmailValidators.UserEmailFormat]),
      Role: new FormControl('read-only', Validators.required)
    });
  }

  addPermission(formValue: any) {
    const p =  new Permission();
    this.userService.userValidationByEmail(formValue.Email)
        .subscribe(res => {
          if (typeof(res[0]) !== 'undefined') {
            p.User = res[0]._id;
            p.Project = this.project._id;
            p.Role = formValue.Role;
            this.permissionService.getPermissionByUserByProject(p.User, p.Project)
                .subscribe(res => {
                  if (typeof(res) === 'undefined') {
                    this.emailError = '';
                    this.permissionService.create(p).subscribe(() => this.getPermissions());
                  } else {
                    alert('This user has already been added to this project');
                    return;
                  }
                });
          } else {
            this.emailError = 'Email is not in the user list. Please invite this user to register first.';
          }
          console.log(this.emailError);
        });
  }

  submitPermissions(): void {
      this.addPermission(this.newPermissionForm.value);
      this.newPermissionForm.reset({Email: '', Role: 'read-only'});
  }

  updatePermission(permission: Permission, permissionRole: roles) {
    this.permissionService.update(permission, permissionRole).subscribe(() => this.getPermissions);
  }
  updatePermissions() {
    this.newPermissionForm.get('Permissions').value.forEach(element => {
      this.updatePermission(element, element.Role);
    });
  }

  // deletePermission(permission: Permission) {
  //   this.permissionService.delete(permission).subscribe(() => this.getPermissions());
  // }
}
