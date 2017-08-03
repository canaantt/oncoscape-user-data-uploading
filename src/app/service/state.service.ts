import { Injectable} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class StateService {
  user: BehaviorSubject<any>;
  authenticated: BehaviorSubject<boolean>;

  constructor() {
    this.user = new BehaviorSubject(null);
    this.authenticated = new BehaviorSubject(false);
   }

}
