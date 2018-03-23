import { Component,  OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Headers, Http, Response } from '@angular/http';
import { Pipe, PipeTransform } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';

import { File } from '../models/file';
import { FileService } from '../service/file.service';
import { StateService } from '../service/state.service';
import { ProjectService } from '../service/project.service';
import { environment } from '../../environments/environment';

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
  errorMsg = {
    'requiredField': '',
    'fileSize': '',
    'fileType': ''
  };

  upload = {
    complete: false,
    'collections': []
  };
  @Input() project: any;
  @Input() user: any;
  @Input() permission: any;
  @Input() isCompliant: boolean;
  @Output() filesExist= false;

  constructor(private fb: FormBuilder,
              private stateService: StateService,
              private projectService: ProjectService,
              private fileService: FileService) {
                this.stateService.jwtToken
                .subscribe(res => {
                  if (res !== null) {
                    this.headerValue = res.token;
                  }
                });
   }

  ngOnInit(): void {
    this.uploader = new FileUploader({url: environment.apiBaseUrl + 'upload/' + this.project._id + '/' + this.user.Gmail,
                                      headers: [{name: 'Authorization', value: this.headerValue }]
                                    });
    this.uploader.onAfterAddingFile = (file) => { this.updateStatus(file); };

    if (this.project.File.size !== 0) {
      this.filerefresh();
    }
  }

  filerefresh() {
    console.log('in File component refresh()');
    this.fileService.getCollectionsByProjectID(this.project._id)
    .map((res: Response) => res.json())
    .subscribe(res => {
          if (typeof res[0] !== 'undefined'){
            this.upload.complete = true;
            this.upload.collections = res.filter(function(m){return ! (m.type in ['map']); });
            // this.emitFilesExist(this.upload.complete);
          }
        });
  }
 updateStatus(fileitem: any): void {
      if (this.isValidFile(fileitem)) {
        this.fileService.removeFilesByProjectID(this.project._id)
            .subscribe((msg) => {
              console.log(msg);
        this.upload.complete = false;
        this.upload.collections = [];

        fileitem.upload();
        this.project.File = {
          'filename': fileitem.file.name,
          'size' : fileitem.file.size,
          'timestamp' : Date()
        };
        this.projectService.update(this.project).subscribe(() => {
          this.filerefresh();
        });
      });
      } else {
        alert(this.errorMsg.requiredField + ' ' + this.errorMsg.fileType + ' ' + this.errorMsg.fileSize);
        this.uploader.clearQueue();
      }
  }
  cancelUpdate(fileitem: any) {
    const len = this.uploader.queue.length;
    this.uploader.queue.pop();
  }
  removeAllFiles(): boolean {
    const confirmDeletion = confirm('Are you sure you want to delete all the files related to this dataset? ');
    if (confirmDeletion) {
      this.fileService.removeFilesByProjectID(this.project._id)
        .subscribe((msg) => {
          this.project.File = {filename: '', size: 0, timestamp: null};
          this.upload.complete = false;
          this.uploader.queue = [];
        });
        // this.emitFilesExist(this.upload.complete);
          return true;
    } else {
      console.log('file deletion is canceled.');
      return false;
    }
  }
  isValidFile(fileitem: any): boolean {
    this.errorMsg = { requiredField: '', fileSize: '', fileType: '' };
    if (!this.isCompliant) {
      this.errorMsg.requiredField = 'Please fill all the required fields before proceeding with data uploading.';
    }
    if (fileitem.file.size > 400 * 1000 * 1000) {
      this.errorMsg.fileSize = 'File size should be less than 400Mb';
    }
    if (fileitem.file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.errorMsg.fileType = 'File format should be xlsx';
    }
    if (this.errorMsg.requiredField === '' &&
        this.errorMsg.fileSize === '' &&
        this.errorMsg.fileType === '') {
          return true;
        }
    return false;
  }
}
