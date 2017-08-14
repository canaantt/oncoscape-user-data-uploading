import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRouterModule } from './router/app-router.module';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import * as hello from 'hellojs';
import * as _ from 'underscore';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { UsersComponent } from './users/users.component';
import { LandingComponent } from './landing/landing.component';
import { ProjectsComponent } from './projects/projects.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsDashboardComponent, DateFormatter } from './projects-dashboard/projects-dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PermissionsComponent, UserFullNamePipe } from './permissions/permissions.component';
import { FilesComponent, Overlapping} from './files/files.component';
import { UserService } from './service/user.service';
import { StateService } from './service/state.service';
import { FileService } from './service/file.service';
import { PermissionService } from './service/permission.service';
import { ComponentNameComponent } from './component-name/component-name.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './service/login.service';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    ProjectsComponent,
    NavbarComponent,
    ProjectsDashboardComponent,
    ProjectDetailComponent,
    UsersComponent,
    UserDetailComponent,
    PermissionsComponent,
    FilesComponent,
    DateFormatter,
    UserFullNamePipe,
    Overlapping,
    FileSelectDirective,
    ComponentNameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  providers: [UserService,
              LoginService,
              StateService,
              FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
