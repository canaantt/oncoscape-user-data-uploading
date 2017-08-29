import { Injectable , EventEmitter} from '@angular/core';

@Injectable()
export class UpdateEmitService {
  updateStatus: EventEmitter<any> ;
  constructor() {
    this.updateStatus = new EventEmitter<any>();
   }
  updateState() {
    console.log('In update-emit updating statue...................');
    this.updateStatus.emit('Saving update ...');
  }
}
