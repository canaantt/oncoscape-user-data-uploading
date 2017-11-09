import { Component,  OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { File } from '../models/file';
import { FileService } from '../service/file.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pipe, PipeTransform } from '@angular/core';
import { StateService } from '../service/state.service';
import { environment } from '../../environments/environment';
import * as _ from 'underscore';
@Pipe({
  name: 'Overlapping'
})
export class Overlapping implements PipeTransform {
  constructor() {}
  transform(arr1, arr2): any {
      const overlapped = _.intersection(arr1, arr2);
      return overlapped.length / arr1.length * 100;
  }
}
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  providers: [FileService]
})
export class FilesComponent implements OnInit {
  public uploader: FileUploader;
  headerValue: string;
  files$: Observable<any>;
  hasFiles = false;
  id: string;
  errorMsg = {
    'requiredField': '',
    'fileSizeError': '',
    'fileTypeError': ''
  };
  uploadedstring = 'Not Uploaded';
  uploadStatus = {
    'uploadSummaryClinical': [],
    'uploadSummaryMolecular': []
  };
  @Input() project: any;
  @Input() user: any;
  @Input() permission: any;
  @Input() statusMsg: boolean;
  @Output()
    uploaded: EventEmitter<string> = new EventEmitter();

  uploadComplete(message: string) {
    this.uploaded.emit(message);
  }
  constructor(private fb: FormBuilder,
              private stateService: StateService,
              private fileService: FileService) {
                console.log('IN FILE COMPONENT, project is: ', this.project);
                this.stateService.jwtToken
                .subscribe(res => {
                  if (res !== null) {
                    this.headerValue = res.token;
                  }
                });
   }

  ngOnInit(): void {
    this.id = this.project._id;
    this.uploader = new FileUploader({url: environment.apiBaseUrl + 'upload/' + this.id  + '/' + this.user.email,
                                      headers: [{name: 'Authorization', value: this.headerValue }]
                                    });
    // this.uploader.onErrorItem = function(item) {
    //   debugger;
    //   item.isUploaded = false;
    //   };
    this.filerefresh();
  }
  filerefresh() {
    console.log('in File component refresh()');
    this.fileService.uploadingValidation(this.id + '_collections')
        // .catch(this.handleError)
        .subscribe(res => {
          if (res.text() !== 'Not Found or No File has been uploaded yet.' ) {
            this.hasFiles = true;
            res = res.json();
            this.uploadStatus.uploadSummaryClinical = res[0].filter(function(m){return 'sheet' in m  && 'patients' in m; });
            this.uploadStatus.uploadSummaryMolecular = res[0].filter(function(m){return 'sheet' in m  && 'markers' in m; });
          } else {
            console.log('No File has been uploaded to this dataset yet. ');
          }
        });
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject('No file is uploaded yet.');
  }
  updateStatus(fileitem: any) {
      if (this.projectValidChecking(fileitem)) {
        fileitem.upload();
        this.uploadedstring = 'Uploaded';
        this.project.File = {
          'filename': fileitem.file.name,
          'size' : fileitem.file.size,
          'timestamp' : Date()
        };
        this.uploadComplete('Being uploaded');
        this.filerefresh();
        // tslint:disable-next-line:max-line-length
        alert('An email will be sent to your Gmail account shortly after the operation is complete. If you don\'t receive email in 10 minutes. Please contact us.');
      } else {
        alert(this.errorMsg.requiredField + ' ' + this.errorMsg.fileTypeError + ' ' + this.errorMsg.fileSizeError);
        this.uploader.clearQueue();
      }
  }
  cancelUpdate(fileitem: any) {
    const len = this.uploader.queue.length;
    this.uploader.queue.pop();
    this.uploadComplete('Being canceled');
  }
  removeAllFiles() {
    const confirmDeletion = confirm('Are you sure you want to delete all the files related to this dataset? ');
    if (confirmDeletion) {
      this.fileService.removeFilesByProjectID(this.id);
      this.project.File = null;
      this.uploadComplete('Being removed');
      this.hasFiles = false;
      this.uploader.queue = [];
    } else {
      console.log('file deletion is canceled.');
    }
  }
  projectValidChecking( fileitem ): boolean {
    if (!this.statusMsg) {
      this.errorMsg.requiredField = 'Please fill all the required fields before proceeding with data uploading.';
    } else {
      this.errorMsg.requiredField = '';
    }
    if (fileitem.file.size > 400 * 1000 * 1000) {
      this.errorMsg.fileSizeError = 'File size should be greater than 400Mb';
    } else {
      this.errorMsg.fileSizeError = '';
    }
    if (fileitem.file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.errorMsg.fileTypeError = 'File format should be xlsx';
    } else {
      this.errorMsg.fileTypeError = '';
    }
    if (this.errorMsg.requiredField === '' &&
        this.errorMsg.fileSizeError === '' &&
        this.errorMsg.fileTypeError === '') {
          return true;
        } else {
          return false;
        }
  }
}
