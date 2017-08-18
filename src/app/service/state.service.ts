import { Injectable} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class StateService {
  user: BehaviorSubject<any>;
  internalUser: BehaviorSubject<any>;

  constructor() {
    this.user = new BehaviorSubject(null);
    this.internalUser = new BehaviorSubject(null);
   }
}
