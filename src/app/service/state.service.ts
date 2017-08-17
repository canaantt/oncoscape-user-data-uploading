import { Injectable} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class StateService {
  user: BehaviorSubject<any>;
  internalUser: BehaviorSubject<any>;
  // authenticated: BehaviorSubject<boolean>;

  constructor() {
    this.user = new BehaviorSubject(null);
    this.internalUser = new BehaviorSubject(null);
    // this.authenticated = new BehaviorSubject(false);
    // this.user = new BehaviorSubject({email: "gidget5169@gmail.com",
    //                               displayName: "Gretchen Krenn",
    //                               picture:"https://lh4.googleusercontent.com/-bgG--KXNN_E/AAAAAAAAAAI/AAAAAAAABQE/o4QFcWdvnSQ/photo.jpg?sz=50",
    //                               thumbnail:"https://lh4.googleusercontent.com/-bgG--KXNN_E/AAAAAAAAAAI/AAAAAAAABQE/o4QFcWdvnSQ/photo.jpg?sz=50"});
    // this.authenticated = new BehaviorSubject(true);
   }

}
