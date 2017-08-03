import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';

export class UserEmailValidators {
  static UserEmailFormat(control: AbstractControl) {
    if (control.value.search('[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+') > -1) {
      console.log('Within UserEmail static Function UserEmail function...');
      return null;
    }
    return {validEmailFormat: true};
  }
}

