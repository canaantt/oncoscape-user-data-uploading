webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app-router.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_users_component__ = __webpack_require__("../../../../../src/app/users/users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__landing_landing_component__ = __webpack_require__("../../../../../src/app/landing/landing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__projects_projects_component__ = __webpack_require__("../../../../../src/app/projects/projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__projects_dashboard_projects_dashboard_component__ = __webpack_require__("../../../../../src/app/projects-dashboard/projects-dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__project_detail_project_detail_component__ = __webpack_require__("../../../../../src/app/project-detail/project-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__register_register_component__ = __webpack_require__("../../../../../src/app/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_detail_user_detail_component__ = __webpack_require__("../../../../../src/app/user-detail/user-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__help_help_component__ = __webpack_require__("../../../../../src/app/help/help.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRouterModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var routes = [
    {
        path: '',
        redirectTo: '/landing',
        pathMatch: 'full'
    }, {
        path: 'landing',
        component: __WEBPACK_IMPORTED_MODULE_3__landing_landing_component__["a" /* LandingComponent */]
    }, {
        path: 'users',
        component: __WEBPACK_IMPORTED_MODULE_2__users_users_component__["a" /* UsersComponent */],
        children: [
            { path: ':id', component: __WEBPACK_IMPORTED_MODULE_8__user_detail_user_detail_component__["a" /* UserDetailComponent */] }
        ]
    }, {
        path: 'register',
        component: __WEBPACK_IMPORTED_MODULE_7__register_register_component__["a" /* RegisterComponent */]
    }, {
        path: 'help',
        component: __WEBPACK_IMPORTED_MODULE_9__help_help_component__["a" /* HelpComponent */]
    }, {
        path: 'projects',
        component: __WEBPACK_IMPORTED_MODULE_4__projects_projects_component__["a" /* ProjectsComponent */],
        children: [
            { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_5__projects_dashboard_projects_dashboard_component__["a" /* ProjectsDashboardComponent */] },
            { path: ':id', component: __WEBPACK_IMPORTED_MODULE_6__project_detail_project_detail_component__["a" /* ProjectDetailComponent */] }
        ]
    }
];
var AppRouterModule = (function () {
    function AppRouterModule() {
    }
    return AppRouterModule;
}());
AppRouterModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes, { useHash: true })],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], AppRouterModule);

//# sourceMappingURL=app-router.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class='container-main'>\n<router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_slim_loading_bar__ = __webpack_require__("../../../../ng2-slim-loading-bar/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_router_module__ = __webpack_require__("../../../../../src/app/app-router.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__users_users_component__ = __webpack_require__("../../../../../src/app/users/users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__landing_landing_component__ = __webpack_require__("../../../../../src/app/landing/landing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__projects_projects_component__ = __webpack_require__("../../../../../src/app/projects/projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__navbar_navbar_component__ = __webpack_require__("../../../../../src/app/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__projects_dashboard_projects_dashboard_component__ = __webpack_require__("../../../../../src/app/projects-dashboard/projects-dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__project_detail_project_detail_component__ = __webpack_require__("../../../../../src/app/project-detail/project-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__register_register_component__ = __webpack_require__("../../../../../src/app/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__user_detail_user_detail_component__ = __webpack_require__("../../../../../src/app/user-detail/user-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__permissions_permissions_component__ = __webpack_require__("../../../../../src/app/permissions/permissions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__files_files_component__ = __webpack_require__("../../../../../src/app/files/files.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__service_user_service__ = __webpack_require__("../../../../../src/app/service/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__service_file_service__ = __webpack_require__("../../../../../src/app/service/file.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__service_login_service__ = __webpack_require__("../../../../../src/app/service/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__help_help_component__ = __webpack_require__("../../../../../src/app/help/help.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__service_update_emit_service__ = __webpack_require__("../../../../../src/app/service/update-emit.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_13__landing_landing_component__["a" /* LandingComponent */],
            __WEBPACK_IMPORTED_MODULE_18__register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_14__projects_projects_component__["a" /* ProjectsComponent */],
            __WEBPACK_IMPORTED_MODULE_15__navbar_navbar_component__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_16__projects_dashboard_projects_dashboard_component__["a" /* ProjectsDashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_17__project_detail_project_detail_component__["a" /* ProjectDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_12__users_users_component__["a" /* UsersComponent */],
            __WEBPACK_IMPORTED_MODULE_19__user_detail_user_detail_component__["a" /* UserDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_20__permissions_permissions_component__["a" /* PermissionsComponent */],
            __WEBPACK_IMPORTED_MODULE_21__files_files_component__["a" /* FilesComponent */],
            __WEBPACK_IMPORTED_MODULE_16__projects_dashboard_projects_dashboard_component__["b" /* DateFormatter */],
            __WEBPACK_IMPORTED_MODULE_20__permissions_permissions_component__["b" /* UserFullNamePipe */],
            __WEBPACK_IMPORTED_MODULE_21__files_files_component__["b" /* Overlapping */],
            __WEBPACK_IMPORTED_MODULE_27__help_help_component__["a" /* HelpComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_router_module__["a" /* AppRouterModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_11_ng2_file_upload__["FileUploadModule"],
            __WEBPACK_IMPORTED_MODULE_25__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5_ng2_slim_loading_bar__["a" /* SlimLoadingBarModule */].forRoot()
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_5_ng2_slim_loading_bar__["a" /* SlimLoadingBarModule */]],
        providers: [__WEBPACK_IMPORTED_MODULE_22__service_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_26__service_login_service__["a" /* LoginService */],
            __WEBPACK_IMPORTED_MODULE_23__service_state_service__["a" /* StateService */],
            __WEBPACK_IMPORTED_MODULE_28__service_update_emit_service__["a" /* UpdateEmitService */],
            __WEBPACK_IMPORTED_MODULE_24__service_file_service__["a" /* FileService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/files/files.component.html":
/***/ (function(module, exports) {

module.exports = "<h5 class=\"file-header\">Upload Dataset</h5>\n<p>Please certify any uploaded data <strong>does NOT contain PHI</strong> and provide reference to <strong>protocol documentation</strong> for any data derived from Human Subjects.</p>\n\n<div class=\"row\">  \n  <div class=\"col-12\">\n    <div *ngIf=\"permission.Role==='admin' || permission.Role==='read-write'\">\n      <div id=\"fileUploadForm\" class=\"form-group\" [class.disabled]=\"!isCompliant\">\n        <label class=\" btn-primary\" for=\"exampleInputFile\">&nbsp;&nbsp; Choose File\n        <input #fileInput type=\"file\"  name=\"single\" id=\"exampleInputFile\" aria-describedby=\"fileHelp\" ng2FileSelect\n          [uploader]=\"uploader\" (change)=\"updateStatus(uploader.queue[0])\" hidden [disabled]=\"!isCompliant\"/>\n        </label>\n      </div>\n    </div>\n    \n    <div *ngIf=\"project.File\">\n      <hr>\n      <h5 class=\"file-header\">File Summary</h5>\n      \n      <div class=\"row\"><div class=\"col-12\">\n        <div ><h6>{{project.File.filename}}<span style=\"padding:5px\">  ({{project.File.timestamp}})  </span>\n          <span *ngIf=\"permission.Role==='admin' || permission.Role==='read-write'\" (click)=\"removeAllFiles()\" class=\"fa fa-minus-circle files-fa\"></span>\n          </h6></div>\n      </div></div>\n      \n    </div>\n\n    <br/>\n    <div *ngIf=\"upload.complete\">\n      <div class=\"row\">\n        <div class=\"col-3\"><h6>Sheet</h6></div>\n        <div class=\"col-3\"><h6>Type</h6></div>\n        <div class=\"col-3\"><h6>Subjects</h6></div>\n        <div class=\"col-3\"><h6>Markers</h6></div>\n      </div>\n\n      <div *ngFor=\"let sheet of upload.collections\">\n        <div class=\"row\">\n          <div class=\"col-3\"><p>{{sheet.name}}</p></div>\n          <div class=\"col-3\"><p>{{sheet.type}}</p></div>\n          <div class=\"col-3\"><p *ngIf=\"sheet.s\">{{sheet.s.length}}</p></div>\n          <div class=\"col-3\"><p *ngIf=\"sheet.m\">{{sheet.m.length}}</p></div>\n        </div>\n      </div>\n\n      \n    </div>\n\n    \n\n    <br>\n  </div>\n  "

/***/ }),

/***/ "../../../../../src/app/files/files.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, "/**\n *  If you want to override some bootstrap variables, you have to change values here.\n *  The list of variables are listed here bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss\n */\n.btn-primary {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary, .file-header {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa, .files-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover, .files-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n/**\n *  Do not remove the comments below. It's the markers used by wiredep to inject\n *  sass dependencies when defined in the bower.json of your dependencies\n */\nbody,\nhtml {\n  font-family: \"Lato\";\n  font-size: 14px;\n  font-weight: 300;\n  background: #fff;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: subpixel-antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.container-fluid {\n  padding-left: 20px;\n  padding-right: 20px; }\n\na, a:active, a:hover, a:visited {\n  color: #039BE5;\n  text-decoration: none; }\n\na:active, a:hover {\n  color: #03ADFF; }\n\n.tooltip {\n  z-index: 99999 !important; }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 13px;\n  line-height: 1.42857;\n  border-radius: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n/**\n *  Do not remove the comments below. It's the markers used by gulp-inject to inject\n *  all your sass files automatically\n */\n.file-header {\n  margin-bottom: 0px; }\n\n[hidden] {\n  display: none !important; }\n\n.btn-primary {\n  cursor: pointer; }\n\n.disabled label {\n  background-color: #c9c9c9;\n  color: white;\n  cursor: not-allowed; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/files/files.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_file_service__ = __webpack_require__("../../../../../src/app/service/file.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_underscore__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Overlapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Overlapping = (function () {
    function Overlapping() {
    }
    Overlapping.prototype.transform = function (arr1, arr2) {
        var overlapped = __WEBPACK_IMPORTED_MODULE_6_underscore__["intersection"](arr1, arr2);
        return overlapped.length / arr1.length * 100;
    };
    return Overlapping;
}());
Overlapping = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'Overlapping'
    }),
    __metadata("design:paramtypes", [])
], Overlapping);

var FilesComponent = (function () {
    function FilesComponent(fb, stateService, fileService) {
        var _this = this;
        this.fb = fb;
        this.stateService = stateService;
        this.fileService = fileService;
        this.errorMsg = {
            'requiredField': '',
            'fileSizeError': '',
            'fileTypeError': ''
        };
        this.uploadedstring = 'Not Uploaded';
        this.upload = {
            complete: false,
            'collections': []
        };
        this.uploaded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        console.log('IN FILE COMPONENT, project is: ', this.project);
        this.stateService.jwtToken
            .subscribe(function (res) {
            if (res !== null) {
                _this.headerValue = res.token;
            }
        });
    }
    FilesComponent.prototype.uploadComplete = function (message) {
        this.uploaded.emit(message);
    };
    FilesComponent.prototype.handleError = function (error) {
        return Promise.reject('No file is uploaded yet.');
    };
    FilesComponent.prototype.ngOnInit = function () {
        this.uploader = new __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__["FileUploader"]({ url: __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].apiBaseUrl + 'upload/' + this.project._id + '/' + this.user.email,
            headers: [{ name: 'Authorization', value: this.headerValue }]
        });
        this.filerefresh();
    };
    FilesComponent.prototype.filerefresh = function () {
        var _this = this;
        console.log('in File component refresh()');
        this.fileService.getFilesByProjectID(this.project._id + '_collections')
            .subscribe(function (res) {
            if (typeof res === "string") {
                console.log(res);
            }
            else {
                _this.upload.complete = true;
                _this.upload.collections = res[0].filter(function (m) { return !(m.type in ["map"]); });
            }
        });
    };
    FilesComponent.prototype.updateStatus = function (fileitem) {
        if (this.projectValidChecking(fileitem)) {
            fileitem.upload();
            this.uploadedstring = 'Uploaded';
            this.project.File = {
                'filename': fileitem.file.name,
                'size': fileitem.file.size,
                'timestamp': Date()
            };
            this.uploadComplete('Being uploaded');
            this.filerefresh();
            alert('An email will be sent to your Gmail account shortly after the operation is complete. If you don\'t receive email in 10 minutes. Please contact us.');
        }
        else {
            alert(this.errorMsg.requiredField + ' ' + this.errorMsg.fileTypeError + ' ' + this.errorMsg.fileSizeError);
            this.uploader.clearQueue();
        }
    };
    FilesComponent.prototype.cancelUpdate = function (fileitem) {
        var len = this.uploader.queue.length;
        this.uploader.queue.pop();
        this.uploadComplete('Being canceled');
    };
    FilesComponent.prototype.removeAllFiles = function () {
        var confirmDeletion = confirm('Are you sure you want to delete all the files related to this dataset? ');
        if (confirmDeletion) {
            this.fileService.removeFilesByProjectID(this.project._id);
            this.project.File = null;
            this.uploadComplete('Being removed');
            this.upload.complete = false;
            this.uploader.queue = [];
        }
        else {
            console.log('file deletion is canceled.');
        }
    };
    FilesComponent.prototype.projectValidChecking = function (fileitem) {
        if (!this.isCompliant) {
            this.errorMsg.requiredField = 'Please fill all the required fields before proceeding with data uploading.';
        }
        else {
            this.errorMsg.requiredField = '';
        }
        if (fileitem.file.size > 400 * 1000 * 1000) {
            this.errorMsg.fileSizeError = 'File size should be greater than 400Mb';
        }
        else {
            this.errorMsg.fileSizeError = '';
        }
        if (fileitem.file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            this.errorMsg.fileTypeError = 'File format should be xlsx';
        }
        else {
            this.errorMsg.fileTypeError = '';
        }
        if (this.errorMsg.requiredField === '' &&
            this.errorMsg.fileSizeError === '' &&
            this.errorMsg.fileTypeError === '') {
            return true;
        }
        else {
            return false;
        }
    };
    return FilesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FilesComponent.prototype, "project", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FilesComponent.prototype, "user", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FilesComponent.prototype, "permission", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], FilesComponent.prototype, "isCompliant", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], FilesComponent.prototype, "uploaded", void 0);
FilesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-files',
        template: __webpack_require__("../../../../../src/app/files/files.component.html"),
        styles: [__webpack_require__("../../../../../src/app/files/files.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_2__service_file_service__["a" /* FileService */]]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_state_service__["a" /* StateService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__service_file_service__["a" /* FileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_file_service__["a" /* FileService */]) === "function" && _d || Object])
], FilesComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=files.component.js.map

/***/ }),

/***/ "../../../../../src/app/help/help.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"help\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <!-- START Help Google Registration -->\n        <h5 class=\"help-header mb-3\">Data Portal & Google</h5>\n        <p>Oncoscape's Data Portal uses Google’s Authentication Service, a secure mechanism for managing accounts, so that users\n          do not need a separate login and password for their datasets. Your name and Google email address will be the only\n          personal information from your Google account that will be shared with Oncoscape. At login, Google provides the\n          Data Portal a randomly generated code that verifies your identity within the system.\n        </p>\n        <div id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n          <div class=\"card\">\n            <div class=\"card-header\" role=\"tab\" id=\"headingOne\">\n              <h5 class=\"mb-0\">\n                <a class=\"help-accordion-title\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"true\"\n                  aria-controls=\"collapseOne\">\n                  <h6>First Time Registration</h6>\n                </a>\n              </h5>\n            </div>\n            <div id=\"collapseOne\" class=\"collapse show\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\n              <div class=\"card-block\">\n                <ol>\n                  <li>Click the \"Register\" button</li>\n                  <li>Please review the User Agreement and fill in your First & Last Name, Institutional Email and Institution.\n                    Click \"Agree\".\n                    <li>Authentication works in a pop-up box please ensure you have popups enabled</li>\n                    <li>A new window will appear that asks for your Google account information (if you do not have a Google account,\n                      instructions for creating one can be found <a href=\"https://accounts.google.com/SignUp?hl=en\">here</a>.\n                      Enter your Google email account and click “Next”</li>\n                    <li>Google will find your account and, if you are not already signed into Google on your browser, will be\n                      prompted to enter your Google password. Enter your password and click “Sign in” </li>\n                    <li>Google will display a page describing what information will be shared with Oncoscape's Data Portal (i.e.,\n                      your name, email address, and public Google + URL, if you have one). By clicking the “Allow” button\n                      you agree to use your Google account to sign in the Data Portal.  </li>\n                    <li>You will be directed to the Dataset Dashboard page and can now add private datasets</li>\n                    <li>Once you have registered, upon returing to the site simply click the login button and Google with automatically\n                      log you in and and reroute you to the Dataset Dashboard.\n                    </li>\n                    <li>If you have questions, please contact the <a href=\"http://resources.sttrcancer.org/oncoscape-contact\"> Oncoscape Team.</a>  </li>\n                </ol>\n              </div>\n            </div>\n          </div>\n          <div class=\"card\">\n            <div class=\"card-header\" role=\"tab\" id=\"headingTwo\">\n              <h5 class=\"mb-0\">\n                <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\">\n                  <h6>Returning Users</h6>\n                </a>\n              </h5>\n            </div>\n            <div id=\"collapseTwo\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"headingTwo\">\n              <div class=\"card-block\">\n                <ol>\n                  <li>Once you have registered, upon returing to the site simply click the login button and Google with automatically\n                    log you in and and reroute you to the Dataset Dashboard.\n                  </li>\n                </ol>\n              </div>\n            </div>\n          </div>\n          <div class=\"card\">\n            <div class=\"card-header\" role=\"tab\" id=\"headingThree\">\n              <h5 class=\"mb-0\">\n                <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseThree\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\n                  <h6>Adding Users</h6>\n                </a>\n              </h5>\n            </div>\n            <div id=\"collapseThree\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"headingThree\">\n              <div class=\"card-block\">\n                <ol>\n                  <li>All new users must first register by reviewing and signing the User Agreement. Do this by clicking the \"Register\"\n                    button on the landing page. Once a user has agreed to the terms and conditions they will be added as an\n                    approved user and can be added to a private dataset. To add a new registered user go to the Dashboard page and\n                    click the \"Edit\" button. Under permissions enter the email they used to register and assign\n                    the appropiate permissions. Click the \"+\" button to add them. Note, the database admin who created the\n                    dataset can not be edited.\n                  </li>\n                </ol>\n              </div>\n            </div>\n          </div>\n          <div class=\"card\">\n            <div class=\"card-header\" role=\"tab\" id=\"headingFour\">\n              <h5 class=\"mb-0\">\n                <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseFour\" aria-expanded=\"false\" aria-controls=\"collapseFour\">\n                  <h6>Removing Users</h6>\n                </a>\n              </h5>\n            </div>\n            <div id=\"collapseFour\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"headingFour\">\n              <div class=\"card-block\">\n                <ol>\n                  <li>To remove a current user from a dataset go to the dashboard page and click \"Edit\". Under permissions click\n                    the \"-\" button. The user will now be removed from that dataset and will no longer be able to access that\n                    dataset.\n                  </li>\n\n                </ol>\n              </div>\n            </div>\n          </div>\n        </div>\n        <!-- END Help Google Registration -->\n      </div>\n      <!-- END col-->\n    </div>\n    <!-- END row -->\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <!-- START Help Dataset Upload -->\n        <h5 class=\"help-header mt-5 mb-3\">Uploading a Dataset</h5>\n        <p>All datasets in the data portal are private and secure and can only be viewed by the approved users you add. When adding a dataset\n          you are accepting to abide to the user agreements laid out during registration. Dataset admins have the ablity to create, edit and remove datasets. Other \n          permission include read/write and read only.  \n        </p>\n        <div id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n          <div class=\"card\">\n            <div class=\"card-header\" role=\"tab\" id=\"headingFive\">\n              <h5 class=\"mb-0\">\n                <a class=\"help-accordion-title\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseFive\" aria-expanded=\"true\"\n                  aria-controls=\"collapseFive\">\n                  <h6>Add New Dataset</h6>\n                </a>\n              </h5>\n            </div>\n\n            <div id=\"collapseFive\" class=\"collapse show\" role=\"tabpanel\" aria-labelledby=\"headingFive\">\n              <div class=\"card-block\">\n                <ol>\n                  <li>After registering you will be redirected to the Dataset Dashboard page. Click on the \"+ Dataset\" button to add a new dataset.</li>\n                  <li>A blank dataset will appear, to make make edits click the \"Edit\" button.</li>\n                  <li>On the edit page you can add the dataset name, description, annotations, users and enter regulatory information. Note, you will be required to enter an apporiate IRB, \n                    IEC or waiver to continue the upload process. </li>\n                  <li>Once all information is entered, click the \"Choose File\" button.</li>\n                  <li>A file upload box will appear, select your file and click \"open\".</li>\n                  <li>*All additions or corrections to a dataset are automatically saved as you edit.</li>\n                  <li>If you have questions, please contact the <a href=\"http://resources.sttrcancer.org/oncoscape-contact\"> Oncoscape Team.</a>  </li>\n                </ol>\n              </div>\n            </div>\n          </div>\n          <div class=\"card\">\n            <div class=\"card-header\" role=\"tab\" id=\"headingSix\">\n              <h5 class=\"mb-0\">\n                <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseSix\" aria-expanded=\"false\" aria-controls=\"collapseSix\">\n                  <h6>Edit Dataset</h6>\n                </a>\n              </h5>\n            </div>\n            <div id=\"collapseSix\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"headingSix\">\n              <div class=\"card-block\">\n                <ol>\n                  <li>*All additions or corrections to a dataset are automatically saved as you edit.</li>\n                  <li>To edit a current dataset, click on the dashboard icon on the header.</li>\n                  <li>From the dashboard page, click the \"Edit button\"</li>\n                </ol>\n              </div>\n            </div>\n          </div>\n          <div class=\"card\">\n            <div class=\"card-header\" role=\"tab\" id=\"headingSeven\">\n              <h5 class=\"mb-0\">\n                <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseSeven\" aria-expanded=\"false\" aria-controls=\"collapseSeven\">\n                  <h6>Delete Dataset</h6>\n                </a>\n              </h5>\n            </div>\n            <div id=\"collapseSeven\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"headingSeven\">\n              <div class=\"card-block\">\n                  <ol>\n                      <li>To delete a dataset, click on the dashboard icon on the header. </li>\n                      <li></li>\n                      <li>From the dashboard page, click the \"Edit button\"</li>\n                    </ol>\n              </div>\n            </div>\n          </div>\n        </div>\n        <!-- END Help Dataset Upload -->\n      </div>\n      <!-- END col-->\n    </div>\n    <!-- END row-->\n    <h5 class=\"help-header my-5\">Example Datasets</h5>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/help/help.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, ".btn-primary {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary, .help-header {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n.help {\n  padding-top: 150px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/help/help.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HelpComponent = (function () {
    function HelpComponent() {
    }
    HelpComponent.prototype.ngOnInit = function () {
    };
    return HelpComponent;
}());
HelpComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-help',
        template: __webpack_require__("../../../../../src/app/help/help.component.html"),
        styles: [__webpack_require__("../../../../../src/app/help/help.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], HelpComponent);

//# sourceMappingURL=help.component.js.map

/***/ }),

/***/ "../../../../../src/app/landing/landing.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"landing\">\n    <div class=\"container py-5 text-center\">\n        <div class=\"row\">\n            <div class=\"col-md-6 mx-auto\">\n                <div class=\"card rounded-2\">\n                    <div class=\"card-header text-center\">\n                        <h3 class=\"mb-0 landing-title\">Data Portal</h3>\n                    </div>\n                    <div class=\"text-center card-body\">\n                        <div class=\"btn-group\">\n                            <div class=\"btn landing-button\" (click)=\"toggleLogin()\">\n                                <a class=\"text-center\" *ngIf='!user'>Login </a>\n                                <a class=\"text-center\" *ngIf='user'>Logout</a>\n                            </div>\n                            <div class=\"btn landing-button\" (click)=\"goRegister()\">Register</div>\n                        </div>\n                        <div class=\"col-12\">\n                            <p><a href=\"#/help\" class=\"landing-link\">See Help for how to Register using Google</a></p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/landing/landing.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, ".btn-primary, .landing-button {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary, a.landing-link {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n.landing {\n  margin-top: 225px; }\n\n.landing-title {\n  font-weight: 300;\n  letter-spacing: 10px;\n  font-size: 30px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  text-transform: uppercase;\n  color: #039BE5; }\n\n.landing-button {\n  margin-top: 40px;\n  margin-bottom: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/landing.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_user_service__ = __webpack_require__("../../../../../src/app/service/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_login_service__ = __webpack_require__("../../../../../src/app/service/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LandingComponent = (function () {
    function LandingComponent(fb, stateService, userService, loginService, ref, zone, router) {
        this.fb = fb;
        this.stateService = stateService;
        this.userService = userService;
        this.loginService = loginService;
        this.ref = ref;
        this.zone = zone;
        this.router = router;
        this.counter = 0;
    }
    LandingComponent.prototype.getUser = function () {
        var _this = this;
        this.stateService.user.subscribe(function (res) {
            _this.zone.run(function () { _this.user = res; });
        });
    };
    LandingComponent.prototype.ngOnInit = function () {
        var _this = this;
        var timer = __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].timer(10, 200);
        this.subscription = timer.subscribe(function () {
            _this.getUser();
            if (_this.user !== null) {
                _this.subscription.unsubscribe();
            }
        });
        this.loginService.oauthServiceStatus
            .subscribe(function (msg) {
            console.log(msg);
            switch (msg) {
                case 'loggedIn':
                    _this.router.navigate(['/projects', 'dashboard']);
                    break;
                case 'register':
                    // alert('User is not registered yet. Please register. Be sure to turn on the browser pop-up window.');
                    _this.router.navigate(['/register']);
                    break;
                case 'loggedOut':
                    _this.googleLogOut();
                    _this.router.navigate(['/landing']);
                    break;
                default:
                    console.log('default');
            }
        });
    };
    LandingComponent.prototype.goRegister = function () {
        var _this = this;
        this.stateService.internalUser.subscribe(function (res) {
            if (res !== null) {
                _this.router.navigate(['/register']);
            }
            else {
                // alert('Please Authenticate using your Gmail account. Please refer to Help page should you have any question.');
                _this.loginService.googleLogin();
            }
        });
    };
    LandingComponent.prototype.toggleLogin = function () {
        if (this.user === null)
            this.googleLogin();
        else
            this.googleLogOut();
    };
    LandingComponent.prototype.googleLogin = function () {
        this.loginService.googleLogin();
    };
    LandingComponent.prototype.googleLogOut = function () {
        console.log('in landing component, googleLogout...');
        this.loginService.googleLogOut();
    };
    return LandingComponent;
}());
LandingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-landing',
        template: __webpack_require__("../../../../../src/app/landing/landing.component.html"),
        styles: [__webpack_require__("../../../../../src/app/landing/landing.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_forms__["e" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_state_service__["a" /* StateService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__service_login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_login_service__["a" /* LoginService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _g || Object])
], LandingComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=landing.component.js.map

/***/ }),

/***/ "../../../../../src/app/models/permission.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Permission; });
// enum roles {'admin', 'read-write', 'read-only'};
var Permission = (function () {
    function Permission() {
    }
    return Permission;
}());

//# sourceMappingURL=permission.js.map

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"header\" class=\"header\">\n  <nav class=\"navbar navbar-toggleable-sm navbar-inverse bg-faded fixed-top\">\n    <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\n      aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"navbar-toggler-icon\"></span>\n    </button>\n    <a class=\"navbar-brand\" href=\"#\">\n      <img alt='Brand' src='../assets/images/logo-white.png' class='navbar-logo-img d-inline-block align-top '>\n      <span class=\"navbar-logo-text\">Oncoscape</span>\n    </a>\n    <div class=\"collapse navbar-collapse justify-content-end\" id=\"navbarSupportedContent\">\n      <ul class=\"navbar-nav float-left\">\n        <a class=\"navbar-items nav-link nav-item active\" *ngIf='user' (click)='goDashboard()'><span class=\"fa fa-dashboard\"></span>Dashboard</a>\n        <a class=\"navbar-items nav-link nav-item active\" (click)='goHelp()'><span class=\"fa fa-question-circle\"></span>Help</a>        \n        <!-- <a class=\"navbar-items nav-link nav-item active\" href=\"http://resources.sttrcancer.org/oncoscape-contact\"><span class=\"fa fa-comments\"></span>Feedback</a> -->\n        <li class=\"nav-item dropdown\">\n          <a class=\"nav-link dropdown-toggle\" id=\"navbarDropdownMenuLink\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img *ngIf='user'  class=\"navbar-pic\" src={{user.thumbnail}} alt=\"Smiley face\"></a>\n          <div *ngIf='user' class=\"dropdown-menu \" aria-labelledby=\"navbarDropdownMenuLink\">\n            <a class=\"dropdown-item\" (click)=\"toProfile()\">Account</a>\n            <div class=\"dropdown-item\">\n              <a *ngIf='!user'  (click)=\"googleLogin()\">Login</a>\n              <a *ngIf='user' (click)=\"googleLogOut()\">Sign out</a>\n            </div>\n          </div>\n        </li>\n      </ul>\n    </div>\n  </nav>\n  <div class=\"slim-loading-bar\">\n    <!-- <ng2-slim-loading-bar [color]='color' [height]='height' ></ng2-slim-loading-bar>  -->\n    <ng2-slim-loading-bar [color]='\"#02D9B6\"' [height]='\"7px\"' ></ng2-slim-loading-bar>\n  </div>    \n</div>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, "/**\n *  If you want to override some bootstrap variables, you have to change values here.\n *  The list of variables are listed here bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss\n */\n.btn-primary {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n/**\n *  Do not remove the comments below. It's the markers used by wiredep to inject\n *  sass dependencies when defined in the bower.json of your dependencies\n */\nbody,\nhtml {\n  font-family: \"Lato\";\n  font-size: 14px;\n  font-weight: 300;\n  background: #fff;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: subpixel-antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.container-fluid {\n  padding-left: 20px;\n  padding-right: 20px; }\n\na, a:active, a:hover, a:visited {\n  color: #039BE5;\n  text-decoration: none; }\n\na:active, a:hover {\n  color: #03ADFF; }\n\n.tooltip {\n  z-index: 99999 !important; }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 13px;\n  line-height: 1.42857;\n  border-radius: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n/**\n *  Do not remove the comments below. It's the markers used by gulp-inject to inject\n *  all your sass files automatically\n */\n.navbar {\n  border: none;\n  box-shadow: 0 2px 3px #bbb; }\n\n.navbar-logo-img {\n  max-height: 40px;\n  image-rendering: crisp-edges;\n  margin-right: 10px;\n  margin-left: 60px; }\n\n.navbar-logo-text {\n  font-size: 18px;\n  line-height: 40px;\n  vertical-align: middle;\n  color: #FFFFFF;\n  letter-spacing: 6px;\n  text-transform: uppercase; }\n\n.navbar-inverse {\n  border: none;\n  background-color: #039BE5; }\n\n.navbar-inverse .navbar-toggle {\n  border: none; }\n\n.navbar-items {\n  padding-right: 5px;\n  color: #fff;\n  font-size: 14px;\n  cursor: pointer; }\n  .navbar-items span {\n    margin-right: 5px;\n    color: #fff; }\n\n.dropdown-toggle::after {\n  display: none; }\n\n.navbar-inverse .navbar-collapse,\n.navbar-inverse .navbar-form {\n  border-color: #0383c2; }\n\n.navbar-inverse .navbar-toggle {\n  border-color: #fff; }\n\n.navbar-inverse .navbar-nav > li > a {\n  color: #FFFFFF; }\n\n.navbar-pic {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  margin-left: 10px;\n  margin-right: 60px;\n  cursor: pointer; }\n\n.dropdown-item {\n  font-size: 12px; }\n\n.dropdown-menu {\n  min-width: 8rem; }\n\n.nav-link {\n  display: inline; }\n\n.slim-loading-bar {\n  position: fixed;\n  margin: 0;\n  padding: 0;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 99999;\n  margin-top: 63px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_user_service__ = __webpack_require__("../../../../../src/app/service/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_login_service__ = __webpack_require__("../../../../../src/app/service/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_update_emit_service__ = __webpack_require__("../../../../../src/app/service/update-emit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_slim_loading_bar__ = __webpack_require__("../../../../ng2-slim-loading-bar/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NavbarComponent = (function () {
    function NavbarComponent(stateService, userService, loginService, updateEmitService, slimLoadingBarService, router) {
        var _this = this;
        this.stateService = stateService;
        this.userService = userService;
        this.loginService = loginService;
        this.updateEmitService = updateEmitService;
        this.slimLoadingBarService = slimLoadingBarService;
        this.router = router;
        this.stateService.user.subscribe(function (data) {
            _this.user = data;
        });
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateEmitService.updateStatus
            .subscribe(function (res) {
            console.log(res);
            _this.completeLoading();
        });
    };
    NavbarComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.interval = 100;
        this.slimLoadingBarService.start(function () {
            console.log('Loading complete');
        });
    };
    NavbarComponent.prototype.stopLoading = function () {
        this.slimLoadingBarService.stop();
    };
    NavbarComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    NavbarComponent.prototype.goDashboard = function () {
        if (this.user) {
            this.router.navigate(['projects/', 'dashboard']);
        }
        else {
            alert('Please Log in or register.');
        }
    };
    NavbarComponent.prototype.goHelp = function () {
        this.router.navigate(['help']);
    };
    NavbarComponent.prototype.googleLogOut = function () {
        this.loginService.googleLogOut();
    };
    NavbarComponent.prototype.toProfile = function () {
        var _this = this;
        this.userService.getUserByGmail(this.user.email)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.router.navigate(["/users/" + res.user._id + "/"]);
        });
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navbar',
        template: __webpack_require__("../../../../../src/app/navbar/navbar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/navbar/navbar.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_state_service__["a" /* StateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__service_login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_login_service__["a" /* LoginService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__service_update_emit_service__["a" /* UpdateEmitService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_update_emit_service__["a" /* UpdateEmitService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6_ng2_slim_loading_bar__["b" /* SlimLoadingBarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ng2_slim_loading_bar__["b" /* SlimLoadingBarService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _f || Object])
], NavbarComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ "../../../../../src/app/permissions/permissions.component.html":
/***/ (function(module, exports) {

module.exports = "<div #permissions class=\"permissions\">\n  <hr>\n  <h5 class=\"permissions-header\">Permissions</h5>\n  <br>\n  <!-- START of title row -->\n  <div class=\"row \">\n    <div class=\"col-3\">\n      <h6>Current User</h6>\n    </div>\n    <div class=\"col-3 \">\n      <h6>Permissions</h6>\n    </div>\n    <!-- <div class=\"col-2\">\n      <h6>Remove/Add</h6>\n    </div> -->\n  </div>\n  <!-- END of title row -->\n  <!-- START of admin -->\n  <div *ngIf=\"role === 'admin'\">\n    <div *ngFor=\"let permission of permissions$ | async\">\n      <div *ngIf=\"project.Author === permission.User\" class=\"row\">\n        <div class=\"col-3\">\n          <p>{{permission.User | userFullName | async }}</p>\n        </div>\n        <div class=\"col-3\">\n          <p>Dataset Administrator</p>\n        </div>\n        <div class=\"col-2\">\n          <!-- inline color scss overide -->\n          <p class=\"fa fa-ban permission-fa\" style=\"color:#cdcdcd;\"></p>\n        </div>\n      </div>\n      <!-- START of current users -->\n      <div *ngIf=\"project.Author !== permission.User\">\n        <div class=\"row\">\n          <div class=\"col-3\">\n            <p>{{permission.User | userFullName | async }}</p>\n          </div>\n          <div class=\"col-3\">\n            <select [(ngModel)]=\"permission.Role\" (change)=\"updatePermission(permission, $event.target.value)\" class=\"form-control\">\n              <option *ngFor=\"let role of roles\" [value]=\"role\">{{role}}</option>\n            </select>\n          </div>\n          <div class=\"col-2\">\n            <span *ngIf=\"project.Author !== permission.User\" class=\"fa fa-minus-circle permission-fa\" (click)=\"deletePermission(permission)\"></span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- END of current users -->\n    <br>\n    <!-- START of new users -->\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <h6>Add New Users</h6>\n      </div>\n    </div>\n    <form class='submitForm' [formGroup]=\"newPermissionForm\">\n      <div class=\"form-group\">\n        <div class=\"row\">\n          <div class=\"col-3\">\n            <input class=\"form-control\" type=\"text\" formControlName=\"Email\" placeholder=\"Enter Registered Users Email\">\n          </div>\n          <div class=\"col-3\">\n            <select formControlName=\"Role\" class=\"form-control\">\n              <option *ngFor=\"let role of roles\" [ngValue]=\"role\">{{role}}</option>\n            </select>\n          </div>\n          <div class=\"col-2\">\n            <span (click)=\"submitPermissions()\" class=\"fa fa-plus-circle permission-fa\"></span>\n          </div>\n        </div>\n        <small [hidden]=\"newPermissionForm.controls.Email.valid\" class=\"text-warning\">Please Add Valid Email</small>\n      </div>\n    </form>\n    <small class=\"text-danger\">{{emailError}}</small>\n    <!-- END of new users -->\n  </div>\n  <!-- END of admin ngIf -->\n  <!-- START different view if not an admin -->\n  <div *ngIf=\"role !== 'admin'\">\n    <div class=\"form-group\" *ngFor=\"let permission of permissions$ | async\">\n      <div class=\"row\">\n        <div class=\"col-3\">\n          <p class=\"detail-users\">{{permission.User | userFullName | async }}</p>\n        </div>\n        <div class=\"col-3\">\n          <p>{{permission.Role}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- END different view if not an admin -->\n</div>\n<hr>"

/***/ }),

/***/ "../../../../../src/app/permissions/permissions.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, "/**\n *  If you want to override some bootstrap variables, you have to change values here.\n *  The list of variables are listed here bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss\n */\n.btn-primary {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary, .permissions-header {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa, .permission-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover, .permission-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n/**\n *  Do not remove the comments below. It's the markers used by wiredep to inject\n *  sass dependencies when defined in the bower.json of your dependencies\n */\nbody,\nhtml {\n  font-family: \"Lato\";\n  font-size: 14px;\n  font-weight: 300;\n  background: #fff;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: subpixel-antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.container-fluid {\n  padding-left: 20px;\n  padding-right: 20px; }\n\na, a:active, a:hover, a:visited {\n  color: #039BE5;\n  text-decoration: none; }\n\na:active, a:hover {\n  color: #03ADFF; }\n\n.tooltip {\n  z-index: 99999 !important; }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 13px;\n  line-height: 1.42857;\n  border-radius: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n/**\n *  Do not remove the comments below. It's the markers used by gulp-inject to inject\n *  all your sass files automatically\n */\n.permissions-header {\n  margin-bottom: 0px; }\n\n.permissions-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .permissions-fa:hover {\n    color: #03ADFF; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/permissions/permissions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_permission__ = __webpack_require__("../../../../../src/app/models/permission.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_permission_service__ = __webpack_require__("../../../../../src/app/service/permission.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_user_service__ = __webpack_require__("../../../../../src/app/service/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validators_userEmail_validator__ = __webpack_require__("../../../../../src/app/validators/userEmail.validator.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UserFullNamePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PermissionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var roles;
(function (roles) {
    roles[roles["admin"] = 0] = "admin";
    roles[roles["read-write"] = 1] = "read-write";
    roles[roles["read-only"] = 2] = "read-only";
})(roles || (roles = {}));
var UserFullNamePipe = (function () {
    function UserFullNamePipe(userService) {
        this.userService = userService;
    }
    UserFullNamePipe.prototype.transform = function (id) {
        return this.userService.getUserByID(id)
            .map(function (res) {
            return res[0].FirstName + ' ' + res[0].LastName;
        });
    };
    return UserFullNamePipe;
}());
UserFullNamePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'userFullName'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__service_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_user_service__["a" /* UserService */]) === "function" && _a || Object])
], UserFullNamePipe);

var PermissionsComponent = (function () {
    function PermissionsComponent(userService, permissionService, fb) {
        this.userService = userService;
        this.permissionService = permissionService;
        this.fb = fb;
        this.roles = ['admin', 'read-write', 'read-only'];
    }
    PermissionsComponent.prototype.ngOnInit = function () {
        this.newPermissionForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormGroup */]({
            Email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_5__validators_userEmail_validator__["a" /* UserEmailValidators */].UserEmailFormat]),
            Role: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('read-only', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required)
        });
        this.id = this.project._id;
        this.getPermissions();
    };
    PermissionsComponent.prototype.getPermissions = function () {
        this.permissions$ = this.permissionService.getPermissionsByProjectID(this.id);
    };
    PermissionsComponent.prototype.permissionItem = function (val) {
        return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormGroup */]({
            Email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */](val, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_5__validators_userEmail_validator__["a" /* UserEmailValidators */].UserEmailFormat]),
            Role: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('read-only', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required)
        });
    };
    PermissionsComponent.prototype.addPermission = function (formValue) {
        var _this = this;
        var p = new __WEBPACK_IMPORTED_MODULE_2__models_permission__["a" /* Permission */]();
        this.userService.userValidationByEmail(formValue.Email)
            .subscribe(function (res) {
            if (typeof (res[0]) !== 'undefined') {
                p.User = res[0]._id;
                p.Project = _this.project._id;
                p.Role = formValue.Role;
                _this.permissionService.getPermissionByUserByProject(p.User, p.Project)
                    .subscribe(function (re) {
                    if (typeof (re) === 'undefined') {
                        _this.emailError = '';
                        _this.permissionService.create(p).subscribe(function () { return _this.getPermissions(); });
                    }
                    else {
                        alert('This user has already been added to this project');
                        return;
                    }
                });
            }
            else {
                _this.emailError = 'Email is not in the user list. Please invite this user to register first.';
            }
            console.log(_this.emailError);
        });
    };
    PermissionsComponent.prototype.submitPermissions = function () {
        this.addPermission(this.newPermissionForm.value);
        this.newPermissionForm.reset({ Email: '', Role: 'read-only' });
    };
    PermissionsComponent.prototype.updatePermission = function (permission, permissionRole) {
        var _this = this;
        this.permissionService.update(permission, permissionRole).subscribe(function () { return _this.getPermissions; });
    };
    PermissionsComponent.prototype.updatePermissions = function () {
        var _this = this;
        this.newPermissionForm.get('Permissions').value.forEach(function (element) {
            _this.updatePermission(element, element.Role);
        });
    };
    PermissionsComponent.prototype.deletePermission = function (permission) {
        var _this = this;
        this.permissionService.deleteById(permission._id).subscribe(function () { return _this.getPermissions(); });
    };
    return PermissionsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PermissionsComponent.prototype, "project", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PermissionsComponent.prototype, "role", void 0);
PermissionsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-permissions',
        template: __webpack_require__("../../../../../src/app/permissions/permissions.component.html"),
        styles: [__webpack_require__("../../../../../src/app/permissions/permissions.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_3__service_permission_service__["a" /* PermissionService */], __WEBPACK_IMPORTED_MODULE_4__service_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */]]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__service_permission_service__["a" /* PermissionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_permission_service__["a" /* PermissionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */]) === "function" && _d || Object])
], PermissionsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=permissions.component.js.map

/***/ }),

/***/ "../../../../../src/app/project-detail/project-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"detail\">\n  <div *ngIf=\"project\">\n    <div class=\"container\">\n      <div class=\"row \">\n        <div class=\"col-12 \">\n          <h5 class=\"detail-header\">Dataset Details</h5>\n          \n          <form>\n            <div class=\"row \">\n              <div class=\"col-10\">\n                <div class=\"form-group \">\n                  <label class=\"detail-label\">Dataset Name<span class=\"text-danger\">*</span></label>\n                  <small class=\"text-danger\" *ngIf=\"!errorMessage?.Name.pass\"><br/>{{errorMessage?.Name.msg}}</small>\n                  <input [(ngModel)]=\"project.Name\" name=\"projectName\" class=\"form-control\" placeholder=\"Dataset Name\">\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"detail-label \">Description</label>\n                  <textarea [(ngModel)]=\"project.Description\" name=\"projectDescription\" placeholder=\"Enter Dataset Description\" class=\"form-control\" rows=\"10\"></textarea>\n                </div>\n              </div>\n            </div>\n            <!-- END project details -->\n            <!-- START annotations -->\n            <div #annotations>\n              <div *ngIf='project.Annotations.length > 0'>\n                <div class=\"row \">\n                  <div class=\"col-3\">\n                    <h6>Dataset Annotation<span class=\"text-warning\">*</span></h6>\n                  </div>\n                  <div class=\"col-3 \">\n                    <h6>Key Value<span class=\"text-warning\">*</span></h6>\n                  </div>\n                  <div class=\"col-2\">\n                    <h6>Remove/Add</h6>\n                  </div>\n                </div>\n                <!-- START saved annotation values -->\n                <div *ngFor=\"let annot of project.Annotations; let i = index\">\n                  <div class=\"row\">\n                    <div class=\"col-3\">\n                      <p>{{annot.key}}</p>\n                    </div>\n                    <div class=\"col-3 col-push-3 \">\n                      <p>{{annot.value}}</p>\n                    </div>\n                    <div class=\"col-2\">\n                      <div class=\"fa fa-minus-circle detail-fa\" (click)=\"project.Annotations.splice(i,1)\"></div>\n                    </div>\n                  </div>\n                </div>\n                <br>\n              </div>\n              <!-- START add new annotations -->\n              <div class=\"row\">\n                <div class=\"col-12\">\n                  <h6>Add New Annotation</h6>\n                </div>\n              </div>\n              <form class='submitForm' [formGroup]=\"newAnnotationForm\" (ngSubmit)=\"submitAnnotations()\">\n                <div class=\"row \">\n                  <div class=\"col-3\">\n                    <input class=\"form-control\" type=\"text\" formControlName=\"key\" placeholder=\"e.g. Sample Size\">\n                    <small *ngIf=\"!newAnnotationForm.valid\" class=\"text-warning\">Key is required</small>\n                  </div>\n                  <div class=\"col-3\">\n                    <input class=\"form-control\" type=\"text\" formControlName=\"value\" placeholder=\"e.g. 110\">\n                    <small *ngIf=\"!newAnnotationForm.valid\" class=\"text-warning\">Value is required</small>\n                  </div>\n                  <div class=\"col-2\">\n                    <div class=\"fa fa-plus-circle detail-fa\" (click)=\"submitAnnotations()\"></div>\n                  </div>\n                </div>\n              </form>\n            </div>\n          </form>\n          <!-- END annotations -->\n          <!-- START permissions -->\n          <div *ngIf=\"permission\">\n            <app-permissions [role]=\"permission.Role\" [project]=\"project\"></app-permissions>\n            <div *ngIf=\"permission.Role==='admin'\" class=\"well form-group\">\n              <div clas=\"col-12\">\n                <h5 class=\"detail-header\">Regulatory Infomation<span class=\"text-danger\">*</span></h5>\n              </div>\n              <div>\n                <input type=\"checkbox\" [(ngModel)]=\"project.PHI\">&nbsp;I certify this dataset does not contain any <a href=\"http://www.hipaa.com/hipaa-protected-health-information-what-does-phi-include/\" target=\"_blank\">Personal Health Information (PHI)</a><span class=\"text-danger\">*</span><br />\n                <small class=\"text-danger\" *ngIf=\"!errorMessage.PHI.pass\">{{errorMessage.PHI.msg}}</small>\n              </div>\n              <!-- START human yes/no -->\n              <div class=\"mt-3\">\n                <p>Is this data derived from Human Subjects?</p>\n              </div>  \n              <div class=\"row\">\n                <div class=\"col-1\">\n                  <input type=\"radio\" value=true name=\"human\" [(ngModel)]=\"project.DataCompliance.HumanStudy\" >&nbsp;Yes\n                </div>\n                <div class=\"col-1\">\n                  <input type=\"radio\" value=false name=\"non-human\" [(ngModel)]=\"project.DataCompliance.HumanStudy\" >&nbsp;No\n                </div>\n              </div>\n              <!-- END human yes/no -->\n              <!-- START appropriate Documentation -->\n              <div *ngIf=\"project.DataCompliance.HumanStudy == 'true'\">\n                <br>\n                <div>Please provide reference to appropriate protocol approval documentation<span class=\"text-danger\">*</span> </div>\n                <br>\n                <div class=\"row\">\n                  \n                  \n                  <div class=\"col-3\">\n                    <select [(ngModel)]=\"project.DataCompliance.Protocol\" class=\"form-control\" >\n                      <option *ngFor=\"let protocol of protocols\" [value]=\"protocol\">{{protocol}}</option>\n                    </select>\n                  </div>\n                  <div *ngIf=\"project.DataCompliance.Protocol !== 'Exempt'\">\n                    <input name=\"ProtocolNumber\" class=\"form-control\" [(ngModel)]=\"project.DataCompliance.ProtocolNumber\" placeholder=\"Protocol #\">\n                  </div>\n\n                </div>\n              </div>\n              <!-- END appropriate documentation -->\n              <hr>\n            </div>\n            <app-files [project]=\"project\" [user]=\"user\" [permission]=\"permission\" [isCompliant]=\"isCompliant\" (uploaded)=\"fileUpdates($event)\"></app-files>\n          </div>\n          <!-- END permissions -->\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/project-detail/project-detail.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, "/**\n *  If you want to override some bootstrap variables, you have to change values here.\n *  The list of variables are listed here bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss\n */\n.btn-primary {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary, .detail-header {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa, .detail-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover, .detail-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n/**\n *  Do not remove the comments below. It's the markers used by wiredep to inject\n *  sass dependencies when defined in the bower.json of your dependencies\n */\nbody,\nhtml {\n  font-family: \"Lato\";\n  font-size: 14px;\n  font-weight: 300;\n  background: #fff;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: subpixel-antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.container-fluid {\n  padding-left: 20px;\n  padding-right: 20px; }\n\na, a:active, a:hover, a:visited {\n  color: #039BE5;\n  text-decoration: none; }\n\na:active, a:hover {\n  color: #03ADFF; }\n\n.tooltip {\n  z-index: 99999 !important; }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 13px;\n  line-height: 1.42857;\n  border-radius: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n/**\n *  Do not remove the comments below. It's the markers used by gulp-inject to inject\n *  all your sass files automatically\n */\n.detail {\n  padding-top: 0px;\n  position: absolute; }\n\n.detail-header {\n  margin-bottom: 25px; }\n\n.detail-label {\n  font-weight: 400; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/project-detail/project-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_user_service__ = __webpack_require__("../../../../../src/app/service/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_login_service__ = __webpack_require__("../../../../../src/app/service/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_project_service__ = __webpack_require__("../../../../../src/app/service/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__service_permission_service__ = __webpack_require__("../../../../../src/app/service/permission.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__service_file_service__ = __webpack_require__("../../../../../src/app/service/file.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__service_update_emit_service__ = __webpack_require__("../../../../../src/app/service/update-emit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__permissions_permissions_component__ = __webpack_require__("../../../../../src/app/permissions/permissions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__files_files_component__ = __webpack_require__("../../../../../src/app/files/files.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var roles;
(function (roles) {
    roles[roles["full-access"] = 0] = "full-access";
    roles[roles["read-only"] = 1] = "read-only";
})(roles || (roles = {}));
var ProjectDetailComponent = (function () {
    function ProjectDetailComponent(route, projectService, permissionService, fileService, userService, stateService, elementRef, updateEmitService, loginService, router, fb) {
        var _this = this;
        this.route = route;
        this.projectService = projectService;
        this.permissionService = permissionService;
        this.fileService = fileService;
        this.userService = userService;
        this.stateService = stateService;
        this.elementRef = elementRef;
        this.updateEmitService = updateEmitService;
        this.loginService = loginService;
        this.router = router;
        this.fb = fb;
        this.protocols = ['IRB', 'IEC', 'Exempt with Waiver', 'Exempt'];
        this.isCompliant = false;
        this.errorMessage = { Name: { msg: 'Project Name is required.', pass: false },
            PHI: { msg: 'You must agree that all data is free of PHI.', pass: false },
            Human: { msg: 'Human Subject research requires additional protocol approval', pass: false },
            Protocol: { msg: 'A protocol ID is required for non-exempt studies.', pass: false }
        };
        this.errorMessage =
            { Name: { msg: 'Project Name is required.', pass: false },
                PHI: { msg: 'You must agree that all data is free of PHI.', pass: false },
                Human: { msg: 'Human Subject research requires additional protocol approval', pass: false },
                Protocol: { msg: 'A protocol ID is required for non-exempt studies.', pass: false }
            };
        this.stateService.internalUser
            .subscribe(function (res) {
            _this.user = res;
            if (_this.user == null)
                _this.loginService.googleLogOut();
            else {
                _this.projectService.getProjectByID(_this.route.snapshot.params['id'])
                    .subscribe(function (res) {
                    _this.setProject(res[0]);
                    _this.updatePreChecking();
                });
                _this.permissionService.getPermissionByUserByProject(_this.user._id, _this.route.snapshot.params['id'])
                    .subscribe(function (r) {
                    _this.setPermission(r);
                });
            }
        });
        var eventStreamClick = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromEvent(elementRef.nativeElement, 'click')
            .map(function () { return _this.project; })
            .debounceTime(500)
            .subscribe(function (input) {
            _this.update(_this.project);
        });
        var eventStreamKeyUp = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromEvent(elementRef.nativeElement, 'keyup')
            .map(function () { return _this.project; })
            .debounceTime(500)
            .subscribe(function (input) {
            _this.update(_this.project);
        });
    }
    ProjectDetailComponent.prototype.setPermission = function (permission) {
        this.permission = permission;
    };
    ProjectDetailComponent.prototype.setProject = function (project) {
        this.project = project;
    };
    ProjectDetailComponent.prototype.ngOnInit = function () {
        this.newAnnotationForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormGroup */]({
            key: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            value: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required)
        });
    };
    ProjectDetailComponent.prototype.update = function (project) {
        var _this = this;
        this.updatePreChecking();
        console.log('STATUS:', this.isCompliant);
        if (!this.isCompliant) {
            console.log('Dataset error Message: ', this.errorMessage);
        }
        else {
            this.projectService.update(project).subscribe(function () {
                _this.statusReport();
                _this.refresh();
            });
        }
    };
    ProjectDetailComponent.prototype.updatePreChecking = function () {
        this.isCompliant = false;
        this.errorMessage.Name.pass = this.project.Name === '' ? false : true;
        this.errorMessage.PHI.pass = this.project.PHI ? true : false;
        this.errorMessage.Human.pass = this.project.DataCompliance.HumanStudy == 'false' ? true : false;
        var reg = /^\d+$/;
        if (this.project.DataCompliance.Protocol == 'Exempt') {
            this.project.DataCompliance.ProtocolNumber = '';
            this.errorMessage.Protocol.pass = true;
        }
        else if (reg.test(this.project.DataCompliance.ProtocolNumber)) {
            this.errorMessage.Protocol.pass = true;
        }
        else {
            this.errorMessage.Protocol.pass = false;
        }
        if (this.errorMessage.Name.pass &&
            this.errorMessage.PHI.pass &&
            (this.errorMessage.Human.pass ||
                this.errorMessage.Protocol.pass)) {
            this.isCompliant = true;
        }
    };
    ProjectDetailComponent.prototype.refresh = function () {
        var _this = this;
        this.projectService.getProjectByID(this.route.snapshot.params['id'])
            .subscribe(function (res0) {
            _this.filesComponent.filerefresh();
        });
    };
    ProjectDetailComponent.prototype.statusReport = function () {
        var _this = this;
        setTimeout(function () { return _this.updateEmitService.updateState(); });
    };
    ProjectDetailComponent.prototype.fileUpdates = function (event) {
        this.update(this.project);
    };
    ProjectDetailComponent.prototype.submitAnnotations = function () {
        if (this.newAnnotationForm.valid) {
            this.project.Annotations.push(this.newAnnotationForm.value);
            this.newAnnotationForm.reset({ key: '', value: '' });
        }
    };
    ProjectDetailComponent.prototype.collectProtocol = function (value) {
        if (value === 'human') {
            this.update(this.project);
        }
        else if (value === 'non-human') {
            this.project.DataCompliance.Protocol = '';
            this.project.DataCompliance.ProtocolNumber = '';
            this.update(this.project);
        }
    };
    return ProjectDetailComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_14__permissions_permissions_component__["a" /* PermissionsComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_14__permissions_permissions_component__["a" /* PermissionsComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__permissions_permissions_component__["a" /* PermissionsComponent */]) === "function" && _a || Object)
], ProjectDetailComponent.prototype, "permissionComponent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_15__files_files_component__["a" /* FilesComponent */]),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_15__files_files_component__["a" /* FilesComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__files_files_component__["a" /* FilesComponent */]) === "function" && _b || Object)
], ProjectDetailComponent.prototype, "filesComponent", void 0);
ProjectDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-project-detail',
        template: __webpack_require__("../../../../../src/app/project-detail/project-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/project-detail/project-detail.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_12__service_file_service__["a" /* FileService */], __WEBPACK_IMPORTED_MODULE_8__service_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_11__service_permission_service__["a" /* PermissionService */]]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_10__service_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__service_project_service__["a" /* ProjectService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_11__service_permission_service__["a" /* PermissionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__service_permission_service__["a" /* PermissionService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_12__service_file_service__["a" /* FileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__service_file_service__["a" /* FileService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__service_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__service_user_service__["a" /* UserService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_7__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__service_state_service__["a" /* StateService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_13__service_update_emit_service__["a" /* UpdateEmitService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__service_update_emit_service__["a" /* UpdateEmitService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_9__service_login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__service_login_service__["a" /* LoginService */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]) === "function" && _o || Object])
], ProjectDetailComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
//# sourceMappingURL=project-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/projects-dashboard/projects-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"dashboard\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <h5 class=\"dashboard-header\">Datasets Dashboard</h5>\n            </div>\n            <div class=\"col-6\">\n                <button class='btn btn-primary' (click)='add()'><span class=\"fa fa-plus\"></span> &nbsp; Dataset</button>\n            </div>\n        </div>\n        <h4 *ngIf= \"!projects || (projects.length === 0)\" class=\"dashboard-header\">Please click <strong>+ Datasets</strong> to add new project.</h4>\n        \n        <div class=\"mb-5\" *ngFor=\"let project of projects\">\n            <!--START card-->\n            <div class=\"card card-cascade \">\n                <!--START card header-->\n                <div class=\"view gradient-card-header dashboard-blue-gradient\">\n                    <h5  class=\"dashboard-title text-center\">{{project.Name}}</h5>\n                </div>\n                <!--END card header-->\n                <!--START card body-->\n                <div class=\"card-body \">\n                    <p class=\"card-text\">\n                        {{project.Description}}\n                    </p>\n                </div>\n                <!--END card body-->\n                <!-- START card footer -->\n                <div class=\"dashboard-dotted card-footer\">\n                    <div class=\"row\">\n                        <div class=\"col-4 text-left\">\n                            <p class=\"text-left mt-2\">Created {{project.Date | DateFormatter: 'WithTime'}}</p>\n                        </div>\n                        <div class=\"col-8 text right\">\n                            <button (click)=\"delete(project)\" class=\" btn btn-primary \">Delete</button>\n                            <button type=\"button\" (click)=\"onSelect(project._id)\" class=\"btn btn-primary\">Edit</button>\n                        </div>\n                    </div>\n                </div>\n                <!-- END card footer -->\n            </div>\n            <!--END card-->\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/projects-dashboard/projects-dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, ".btn-primary {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary, .dashboard-header {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n.dashboard-title {\n  color: #FFFFFF;\n  font-weight: 300;\n  margin-top: 10px;\n  font-size: 22px;\n  padding: 12px; }\n\n.dashboard .btn {\n  width: 110px;\n  margin-right: 5px;\n  float: right; }\n\n.dashboard-blue-gradient {\n  background: linear-gradient(135deg, #039BE5 2%, #042a68); }\n\n.dashboard-dotted {\n  background-image: -webkit-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);\n  background-image: repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);\n  background-size: 3px 3px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/projects-dashboard/projects-dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_login_service__ = __webpack_require__("../../../../../src/app/service/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_permission_service__ = __webpack_require__("../../../../../src/app/service/permission.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_project_service__ = __webpack_require__("../../../../../src/app/service/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_file_service__ = __webpack_require__("../../../../../src/app/service/file.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DateFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsDashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var DateFormatter = (function () {
    function DateFormatter() {
    }
    DateFormatter.prototype.transform = function (id, option) {
        var d = id.split('T');
        var d1 = d[0].split('-');
        switch (option) {
            case 'Date':
                return d1[1] + '/' + d1[2] + '/' + d1[0];
            case 'WithTime':
                var d2 = d[1].substr(0, 8);
                return d1[1] + '/' + d1[2] + '/' + d1[0] + ' ' + d2;
        }
    };
    return DateFormatter;
}());
DateFormatter = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'DateFormatter'
    }),
    __metadata("design:paramtypes", [])
], DateFormatter);

var ProjectsDashboardComponent = (function () {
    function ProjectsDashboardComponent(fb, projectService, permissionService, loginService, fileService, stateService, zone, router) {
        var _this = this;
        this.fb = fb;
        this.projectService = projectService;
        this.permissionService = permissionService;
        this.loginService = loginService;
        this.fileService = fileService;
        this.stateService = stateService;
        this.zone = zone;
        this.router = router;
        console.log('Dashboard Component constructor');
        this.stateService.internalUser
            .subscribe(function (res) {
            _this.user = res;
            if (_this.user !== null) {
                _this.getPermissions(_this.user._id);
            }
            else {
                _this.loginService.googleLogOut();
            }
        });
    }
    ProjectsDashboardComponent.prototype.getProjects = function (permissions) {
        var _this = this;
        var projectIDs = __WEBPACK_IMPORTED_MODULE_5_underscore__["uniq"](permissions.map(function (r) { return r.Project; }));
        this.projectService.getProjectsByIDs(projectIDs)
            .subscribe(function (res) {
            _this.zone.run(function () {
                _this.projects = res;
                _this.projects = _this.projects.reverse();
            });
        });
    };
    ProjectsDashboardComponent.prototype.getPermissions = function (id) {
        var _this = this;
        this.permissionService.getPermissionsByUserID(id)
            .subscribe(function (res) {
            _this.getProjects(res);
        });
    };
    ProjectsDashboardComponent.prototype.delete = function (project) {
        var _this = this;
        var confirmDeletion = confirm('Are you absolutely sure you want to delete?');
        if (confirmDeletion) {
            this.permissionService.getPermissionByUserByProject(this.user._id, project._id)
                .subscribe(function (res) {
                if (res.Role !== 'admin') {
                    alert('You do not have permission to delete this dataset. Please contact author.');
                    return;
                }
                else {
                    _this.projectService.delete(project).subscribe(function () { return console.log('project is being removed.'); });
                    _this.fileService.removeFilesByProjectID(project._id);
                    _this.permissionService.removePermisionsByProjectID(project._id)
                        .subscribe(function () { return console.log('permissions are deleted.'); });
                    _this.getPermissions(res.User);
                }
            });
        }
        else {
            console.log('Deletion cancled.');
        }
    };
    ProjectsDashboardComponent.prototype.add = function () {
        var _this = this;
        console.log('in add');
        var newProjectForm = this.fb.group({
            Name: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
            Description: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */](''),
            Private: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */](true),
            Source: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('File'),
            Author: this.user._id,
            PHI: false,
            DataCompliance: { 'ProtocolNumber': '', 'Protocol': '', 'HumanStudy': '' }
        });
        this.projectService.create(newProjectForm.value)
            .subscribe(function (newProject) {
            _this.addPermission(newProject.json());
        });
    };
    ProjectsDashboardComponent.prototype.addPermission = function (Project) {
        var _this = this;
        var newPermission = {
            'User': Project.Author,
            'Role': 'admin',
            'Project': Project._id
        };
        this.permissionService.create(newPermission)
            .subscribe(function (permission) {
            _this.onSelect(permission.json().Project);
        });
    };
    ProjectsDashboardComponent.prototype.onSelect = function (ProjectID) {
        this.router.navigate(["/projects/" + ProjectID + "/"]);
    };
    return ProjectsDashboardComponent;
}());
ProjectsDashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-projects-dashboard',
        template: __webpack_require__("../../../../../src/app/projects-dashboard/projects-dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/projects-dashboard/projects-dashboard.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_8__service_permission_service__["a" /* PermissionService */], __WEBPACK_IMPORTED_MODULE_10__service_file_service__["a" /* FileService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_9__service_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__service_project_service__["a" /* ProjectService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__service_permission_service__["a" /* PermissionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__service_permission_service__["a" /* PermissionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__service_login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__service_login_service__["a" /* LoginService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_10__service_file_service__["a" /* FileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__service_file_service__["a" /* FileService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_state_service__["a" /* StateService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === "function" && _h || Object])
], ProjectsDashboardComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=projects-dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/projects/projects.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"projects\">\n    <header class=\"projects container-fluid\">\n        <div class=\"row\">\n            <div routerLinkActive=\"active\" routerLink='dashboard'></div>\n        </div>\n    </header>\n</div>\n<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "../../../../../src/app/projects/projects.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, "/**\n *  If you want to override some bootstrap variables, you have to change values here.\n *  The list of variables are listed here bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss\n */\n.btn-primary {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n/**\n *  Do not remove the comments below. It's the markers used by wiredep to inject\n *  sass dependencies when defined in the bower.json of your dependencies\n */\nbody,\nhtml {\n  font-family: \"Lato\";\n  font-size: 14px;\n  font-weight: 300;\n  background: #fff;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: subpixel-antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.container-fluid {\n  padding-left: 20px;\n  padding-right: 20px; }\n\na, a:active, a:hover, a:visited {\n  color: #039BE5;\n  text-decoration: none; }\n\na:active, a:hover {\n  color: #03ADFF; }\n\n.tooltip {\n  z-index: 99999 !important; }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 13px;\n  line-height: 1.42857;\n  border-radius: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n/**\n *  Do not remove the comments below. It's the markers used by gulp-inject to inject\n *  all your sass files automatically\n */\n.projects-header {\n  padding-bottom: 25px;\n  font-weight: 400;\n  color: #039BE5;\n  letter-spacing: 7px; }\n\n.projects {\n  margin-top: 150px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/projects/projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_project_service__ = __webpack_require__("../../../../../src/app/service/project.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectsComponent = (function () {
    function ProjectsComponent() {
    }
    return ProjectsComponent;
}());
ProjectsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-projects',
        template: __webpack_require__("../../../../../src/app/projects/projects.component.html"),
        styles: [__webpack_require__("../../../../../src/app/projects/projects.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__service_project_service__["a" /* ProjectService */]]
    }),
    __metadata("design:paramtypes", [])
], ProjectsComponent);

//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ "../../../../../src/app/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"register\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <h5 class=\"detail-header\">For the first time user, please read below legal agreement to register.</h5>\n                <p>In consideration of my access to and use of this site (“Oncoscape”), maintained by Fred Hutchinson Cancer\n                    Research Center (“Fred Hutch”), I agree to the following terms and conditions:\n                </p>\n                <ol>\n                    <li>I agree to only use de-identified patient or research subject data in Oncoscape, as specified by NIH’s\n                        Genomic Data Sharing policy criteria: the identifiers of data subjects cannot be readily ascertained\n                        or otherwise associated with the data by the repository staff or secondary data users (45 CFR46 .102(f));\n                        the 18 identifiers enumerated at 45 CFR 164.514(b)(2) (the HIPAA Privacy Rule) are removed; and the\n                        submitting institution has no actual knowledge that the remaining information could be used alone\n                        or in combination with other information to identify the subject of the data.\n                    </li>\n                    <li>I agree to comply with all applicable laws and regulations regarding the confidentiality of individually\n                        identifiable health information, including, without limitation, the Health Insurance Portability\n                        and Accountability Act (“HIPAA”) (See: 45 CFR Parts 160, 162 and 164) and Washington State’s requirements\n                        (See: RCW 70.02 and RCW 42.48) and the regulations of the Office of Human Research Protection (45\n                        CFR Part 46).\n                    </li>\n                    <li>I understand and acknowledge that the public Oncoscape website is free for academic, nonprofit, and\n                        personal use. Any use of the public browser requires credits to the browser site.\n                    </li>\n                    <li>I understand and acknowledge that links to other sites and access to external tools and systems are\n                        provided only for convenience and Fred Hutch is not responsible for the content or accuracy of external\n                        resources.\n                    </li>\n                    <li>I understand and acknowledge that the data and tools displayed in Oncoscape are under the same condition\n                        of use as specified at the original import site.\n                    </li>\n                    <li>I agree to indemnify, defend, and hold Fred Hutch harmless from any causes of action, claims, damages,\n                        or liabilities arising or alleged to arise from my failure to comply with any of the provisions of\n                        this site. Neither Fred Hutch nor those contributing to Oncoscape shall be liable for any losses\n                        or damage that may result from its use.\n                    </li>\n                    <li>I understand and acknowledge that Fred Hutch reserves the right to make changes to this website and\n                        associated resources at any time without notice.\n                    </li>\n                    <li>I agree to use Oncoscape only for lawful purposes. Fred Hutch reserves the right to access data without\n                        notification from time to time for the purposes of ensuring lawful and agreed use.\n                    </li>\n                    <li>I understand and acknowledge that I am responsible for all activities that occur under my account\n                        and agree to not disclose any computer password or otherwise provide access to confidential information\n                        to any unauthorized person. I may be held liable for any losses incurred by Oncoscape or another\n                        party due to someone else using my account. I may not use anyone else’s account at any time.\n                    </li>\n                    <li>As an Oncoscape user, I understand and acknowledge that I am solely responsible for any information\n                        that I display, generate, transmit or transfer while using Oncoscape and for the consequences of\n                        such actions. Oncoscape usage is recorded by Google Analytics. All queries are automatically logged\n                        by the server. Temporary files containing the results of queries may persist on the server until\n                        removed.\n                    </li>\n                    <li>I agree to not remove any confidential information from Fred Hutch systems unless authorized to do\n                        sI also agree to maintain appropriate information security procedures to ensure that confidential\n                        information remains confidential to the extent required.\n                    </li>\n                    <li>I understand that this site is not intended to assist with the practice medicine or provide specific\n                        medical advice, and should not be used to make a diagnosis or to replace or overrule a qualified\n                        health care provider's judgment.\n                    </li>\n                    <li>By choosing to use Oncoscape, I acknowledge and agree to these Terms and Conditions. Fred Hutch reserves\n                        the right to modify these terms and any related policies\n                    </li>\n                    <li>I understand that a violation of these terms may result in termination of my permission to have access\n                        to and use Oncoscape.\n                    </li>\n                    <li>My access to and use of this site, and these terms and conditions are governed by the laws of the\n                        State of Washington and applicable U.S. federal laws. I consent to the jurisdiction and venue of\n                        the state and federal courts located within Washington State and agree that any action related to\n                        my access to or use of this site and these terms and conditions must be brought in a state or federal\n                        court located within Washington State.\n                    </li>\n                </ol>\n\n\n                <form [formGroup]=\"newUserForm\">\n                    <label>\n                        <span class=\"text-danger\">*</span>All Fields Required</label>\n\n                    <div class=\"form-group \">\n                        <div class=\"col-6\">\n                            <input type=\"text\" class=\"form-control\" id=\"firstName\" formControlName=\"FirstName\" placeholder=\"First Name\">\n                            <small class=\"text-danger\" *ngIf=\"error.fn!==''\">{{error.fn}}</small>\n                        </div>  \n                    </div>\n                    <div class=\"form-group \">\n                        <div class=\"col-6\">\n                            <input type=\"text\" class=\"form-control\" id=\"lastName\" formControlName=\"LastName\" placeholder=\"Last Name\">\n                            <small class=\"text-danger\" *ngIf=\"error.ln!==''\">{{error.ln}}</small>\n                        </div>\n                    </div>\n                    <div class=\"form-group \">\n                        <div class=\"col-6\">\n                            <input type=\"text\" class=\"form-control\" id=\"Email\" formControlName=\"Email\" placeholder=\"Institutional Email\">\n                            <p *ngIf=\"error.email.empty !=='' || error.email.format !=='' || error.email.duplicate !==''\">\n                                <small class=\"text-danger\">{{error.email.empty}}{{error.email.format}}{{error.email.duplicate}}\n                                </small>\n                            </p>\n                        </div>\n                    </div>\n                    <div class=\"form-group \">\n                        <div class=\"col-6\">\n                            <input type=\"text\" class=\"form-control\" id=\"Institution\" formControlName=\"Institution\" placeholder=\"Institution\">\n                            <p *ngIf=\"error.in !==''\"><small class=\"text-danger\">{{error.in}}</small></p>                            \n                        </div>\n                    </div>\n                    <div class=\"form-group \">\n                        <div class=\"col-6\">\n                            <input type=\"submit\" (click)=\"submit()\" class=\"btn btn-primary\" value=\"Agree\">\n                        </div>\n                    </div>\n                    <!-- <p>Form Status: {{ newUserForm.status }}</p>\n                    <p>Form value: {{ newUserForm.value | json }}</p> -->\n                </form>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/register/register.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, "/**\n *  If you want to override some bootstrap variables, you have to change values here.\n *  The list of variables are listed here bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss\n */\n.btn-primary {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n/**\n *  Do not remove the comments below. It's the markers used by wiredep to inject\n *  sass dependencies when defined in the bower.json of your dependencies\n */\nbody,\nhtml {\n  font-family: \"Lato\";\n  font-size: 14px;\n  font-weight: 300;\n  background: #fff;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: subpixel-antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.container-fluid {\n  padding-left: 20px;\n  padding-right: 20px; }\n\na, a:active, a:hover, a:visited {\n  color: #039BE5;\n  text-decoration: none; }\n\na:active, a:hover {\n  color: #03ADFF; }\n\n.tooltip {\n  z-index: 99999 !important; }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 13px;\n  line-height: 1.42857;\n  border-radius: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n/**\n *  Do not remove the comments below. It's the markers used by gulp-inject to inject\n *  all your sass files automatically\n */\n.register {\n  margin-top: 100px;\n  margin-bottom: 50px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_user_service__ = __webpack_require__("../../../../../src/app/service/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_login_service__ = __webpack_require__("../../../../../src/app/service/login.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegisterComponent = (function () {
    function RegisterComponent(fb, userService, stateService, loginService, router) {
        var _this = this;
        this.fb = fb;
        this.userService = userService;
        this.stateService = stateService;
        this.loginService = loginService;
        this.router = router;
        this.error = {
            fn: '',
            ln: '',
            email: { empty: '', format: '', duplicate: '' },
            in: ''
        };
        this.stateService.internalUser.subscribe(function (res) {
            if (res !== null) {
                _this.internalUser = res;
            }
            else {
                _this.router.navigate(['/landing']);
                // alert('Please Authenticate using your Gmail account. Please refer to Help page should you have any question.');
                // this.loginService.googleLogin();
            }
        });
    }
    RegisterComponent.prototype.errorMsgUpdate = function () {
        if (this.newUserForm.value.FirstName === '') {
            this.error.fn = 'First Name is required.';
        }
        else {
            this.error.fn = '';
        }
        if (this.newUserForm.value.LastName === '') {
            this.error.ln = 'Last Name is required.';
        }
        else {
            this.error.ln = '';
        }
        if (this.newUserForm.value.Email === '') {
            this.error.email.empty = 'Email is required';
        }
        else {
            this.error.email.empty = '';
        }
        if (this.newUserForm.value.Email.search('[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+') === -1) {
            this.error.email.format = 'Email format is wrong';
        }
        else {
            this.error.email.format = '';
        }
        // this.userService.userValidationByEmail(this.newUserForm.value.Email)
        // .subscribe(res => {
        //   if (typeof(res[0]) !== 'undefined') {
        //     this.error.email.duplicate = 'This email has already been registered';
        //     return;
        //   } else {
        //     this.error.email.duplicate = '';
        //   }
        // });
        if (this.newUserForm.value.Institution === '') {
            this.error.in = 'Should not be empty.';
        }
        else {
            this.error.in = '';
        }
    };
    RegisterComponent.prototype.checking = function () {
        if (this.error.fn === '' &&
            this.error.ln === '' &&
            this.error.email.empty === '' &&
            this.error.email.format === '' &&
            this.error.email.duplicate === '' &&
            this.error.in === '') {
            return true;
        }
        else {
            return false;
        }
    };
    RegisterComponent.prototype.submit = function () {
        var _this = this;
        var self = this;
        this.newUserForm.value.Consent = true;
        this.newUserForm.value.Gmail = this.internalUser.Gmail.gmail;
        if (this.checking()) {
            this.userService.create(this.newUserForm.value).subscribe(function () {
                console.log('Create New User');
                _this.loginService.googleLogOut();
            });
        }
    };
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.newUserForm = this.fb.group({
            FirstName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
            LastName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
            Email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
            Institution: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required)
        });
        this.newUserForm.valueChanges
            .debounceTime(200)
            .subscribe(function () { return _this.errorMsgUpdate(); });
    };
    return RegisterComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('LoginComponent'),
    __metadata("design:type", Object)
], RegisterComponent.prototype, "login", void 0);
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-register',
        template: __webpack_require__("../../../../../src/app/register/register.component.html"),
        styles: [__webpack_require__("../../../../../src/app/register/register.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_state_service__["a" /* StateService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__service_login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_login_service__["a" /* LoginService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === "function" && _e || Object])
], RegisterComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/service/file.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FileService = (function () {
    function FileService(stateService, http) {
        var _this = this;
        this.stateService = stateService;
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        this.filesUrl = __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].apiBaseUrl + 'files';
        this.stateService.jwtToken
            .subscribe(function (res) {
            // console.log('Project service: ', res);
            _this.headers.append('Content-Type', 'application/json');
            if (res !== null) {
                _this.headers.append('Authorization', 'Bearer ' + res.token);
            }
        });
    }
    FileService.prototype.getFilesByProjectID = function (id) {
        var url = this.filesUrl + "/" + id;
        return this.http.get(url, { headers: this.headers })
            .map(function (res) {
            return res.json();
        });
    };
    FileService.prototype.removeFilesByProjectID = function (id) {
        var url = this.filesUrl + "/" + id;
        this.http.delete(url, { headers: this.headers }).subscribe(function () { return console.log('files are deleted.'); });
    };
    FileService.prototype.create = function (file) {
        return this.http
            .post(this.filesUrl, JSON.stringify(file), { headers: this.headers });
    };
    FileService.prototype.getFileDescriptions = function (id) {
        return this.http.get(this.filesUrl + '/' + id, { headers: this.headers });
        // .map(res => res.json());
    };
    FileService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return FileService;
}());
FileService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_state_service__["a" /* StateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */]) === "function" && _b || Object])
], FileService);

var _a, _b;
//# sourceMappingURL=file.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/login.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hellojs__ = __webpack_require__("../../../../hellojs/dist/hello.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hellojs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_hellojs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_user_service__ = __webpack_require__("../../../../../src/app/service/user.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginService = (function () {
    function LoginService(stateService, userService, http, router) {
        this.stateService = stateService;
        this.userService = userService;
        this.http = http;
        this.router = router;
        this.GOOGLE_CLIENT_ID = '459144121975-lp2p5kahpqahm2gffgtl31vv0nes9hj4.apps.googleusercontent.com';
        this.oauthServiceStatus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        __WEBPACK_IMPORTED_MODULE_3_hellojs__["init"]({
            google: this.GOOGLE_CLIENT_ID,
        }, {
            force: true,
            // redirect_uri: 'https://dev.oncoscape.sttrcancer.io/upload/',
            redirect_uri: __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].oAuthRedirectUri,
            display: 'popup',
            response_type: 'token',
            scope: 'email'
        });
        __WEBPACK_IMPORTED_MODULE_3_hellojs__["on"]('auth', function () { console.log('state changed!'); });
        __WEBPACK_IMPORTED_MODULE_3_hellojs__["on"]('auth.login', this.authLogin.bind(this));
        __WEBPACK_IMPORTED_MODULE_3_hellojs__["on"]('auth.logout', this.authLogout.bind(this));
    }
    // Google service called by authLogin & authLogout using hello
    LoginService.prototype.googleLogin = function () {
        this.googleLogOut();
        __WEBPACK_IMPORTED_MODULE_3_hellojs__["login"]('google', { force: true });
    };
    LoginService.prototype.googleLogOut = function () {
        window.location.assign('/upload/');
        __WEBPACK_IMPORTED_MODULE_3_hellojs__["logout"]('google', { force: true });
    };
    LoginService.prototype.authLogin = function (auth) {
        var _this = this;
        var token = auth.authResponse.access_token;
        console.log(token);
        this.http.post(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiBaseUrl + 'token', { 'token': token })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.stateService.jwtToken.next(res);
            if ('token' in res) {
                __WEBPACK_IMPORTED_MODULE_3_hellojs__('google').api('me').then(_this.updateUserInfo.bind(_this));
            }
            else if ('gmail' in res) {
                _this.stateService.internalUser.next({ 'Gmail': res });
                _this.oauthServiceStatus.emit('register');
            }
        });
    };
    LoginService.prototype.authLogout = function (auth) {
        this.oauthServiceStatus.emit('loggedOut');
    };
    LoginService.prototype.updateUserInfo = function (v) {
        var _this = this;
        this.userService.getUserByGmail(v.email)
            .map(function (res) { return res.json(); })
            .subscribe(function (r) {
            if (r.user !== null) {
                _this.stateService.user.next(v);
                _this.stateService.internalUser.next(r.user);
                _this.oauthServiceStatus.emit('loggedIn');
            }
        });
    };
    return LoginService;
}());
LoginService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_state_service__["a" /* StateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__service_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */]) === "function" && _d || Object])
], LoginService);

var _a, _b, _c, _d;
//# sourceMappingURL=login.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/permission.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin__ = __webpack_require__("../../../../rxjs/add/observable/forkJoin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PermissionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var roles;
(function (roles) {
    roles[roles["admin"] = 0] = "admin";
    roles[roles["read-write"] = 1] = "read-write";
    roles[roles["read-only"] = 2] = "read-only";
})(roles || (roles = {}));
var PermissionService = (function () {
    function PermissionService(stateService, http) {
        var _this = this;
        this.stateService = stateService;
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.permissionsUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiBaseUrl + 'permissions';
        this.stateService.jwtToken
            .subscribe(function (res) {
            _this.headers.append('Content-Type', 'application/json');
            _this.headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
            _this.headers.append('Pragma', 'no-cache');
            _this.headers.append('Cache-Control', 'max-age=0');
            if (res !== null) {
                _this.headers.append('Authorization', 'Bearer ' + res.token);
            }
        });
    }
    PermissionService.prototype.getPermissionByID = function (id) {
        var url = this.permissionsUrl + "/" + JSON.stringify({ '_id': id });
        return this.http.get(url, { headers: this.headers });
    };
    PermissionService.prototype.getPermissionsByProjectID = function (id) {
        // const url = `${this.permissionsUrl}/` + 'Project:' + id;
        var url = this.permissionsUrl + "/" + JSON.stringify({ 'Project': id });
        return this.http.get(url, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    PermissionService.prototype.getPermissionsByUserID = function (id) {
        // const url = `${this.permissionsUrl}/` + 'User:' + id;
        var url = this.permissionsUrl + "/" + JSON.stringify({ 'User': id });
        return this.http.get(url, { headers: this.headers })
            .map(function (res) { return res.json().filter(function (value) { return value.User === id; }); });
    };
    PermissionService.prototype.getPermissionByUserByProject = function (userID, projectID) {
        var url = this.permissionsUrl + "/" + JSON.stringify({ 'Project': projectID, 'User': userID });
        return this.http.get(url, { headers: this.headers }).map(function (res) { return res.json()[0]; });
    };
    PermissionService.prototype.removePermisionsByProjectID = function (id) {
        // const url = `${this.permissionsUrl}/` + 'Project:' + id;
        var url = this.permissionsUrl + "/" + JSON.stringify({ 'Project': id });
        return this.http.delete(url, { headers: this.headers });
    };
    PermissionService.prototype.deleteById = function (id) {
        // const url = `${this.permissionsUrl}/` + '_id:' + id;
        var url = this.permissionsUrl + "/" + JSON.stringify({ '_id': id });
        return this.http.delete(url, { headers: this.headers });
    };
    PermissionService.prototype.create = function (permission) {
        return this.http
            .post(this.permissionsUrl, JSON.stringify(permission), { headers: this.headers });
    };
    PermissionService.prototype.update = function (permission, permissionRole) {
        // const url = `${this.permissionsUrl}/` + '_id:' + permission._id;
        var url = this.permissionsUrl + "/" + JSON.stringify({ '_id': permission._id });
        permission.Role = permissionRole;
        return this.http.put(url, JSON.stringify(permission), { headers: this.headers });
    };
    PermissionService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return PermissionService;
}());
PermissionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_state_service__["a" /* StateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _b || Object])
], PermissionService);

var _a, _b;
//# sourceMappingURL=permission.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/project.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProjectService = (function () {
    function ProjectService(stateService, http) {
        var _this = this;
        this.stateService = stateService;
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.projectsUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiBaseUrl + 'projects';
        this.stateService.jwtToken
            .subscribe(function (res) {
            _this.headers.append('Content-Type', 'application/json');
            _this.headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
            _this.headers.append('Pragma', 'no-cache');
            _this.headers.append('Cache-Control', 'max-age=0');
            if (res !== null) {
                _this.headers.append('Authorization', 'Bearer ' + res.token);
            }
        });
    }
    ProjectService.prototype.getRecentProject = function (userID) {
        var url = this.projectsUrl + "/" + JSON.stringify({ 'Author': userID });
        return this.http.get(url, { headers: this.headers })
            .map(function (res) {
            var filtered = res.json();
            return filtered[filtered.length - 1];
        });
    };
    ProjectService.prototype.getProjectByID = function (id) {
        var url = this.projectsUrl + "/" + JSON.stringify({ '_id': id });
        return this.http.get(url, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    ProjectService.prototype.getProjectsByIDs = function (ids) {
        var url = this.projectsUrl + "/" + JSON.stringify({ '_id': { '$in': ids } });
        return this.http.get(url, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    ProjectService.prototype.delete = function (project) {
        var url = this.projectsUrl + "/" + JSON.stringify({ '_id': project._id });
        return this.http.delete(url, { headers: this.headers });
    };
    ProjectService.prototype.create = function (project) {
        console.log('PROJECT SERVICE CREATE: ', project);
        return this.http
            .post(this.projectsUrl, JSON.stringify(project), { headers: this.headers });
    };
    ProjectService.prototype.update = function (project) {
        var url = this.projectsUrl + "/" + JSON.stringify({ '_id': project._id });
        return this.http.put(url, JSON.stringify(project), { headers: this.headers });
    };
    ProjectService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return ProjectService;
}());
ProjectService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_state_service__["a" /* StateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _b || Object])
], ProjectService);

var _a, _b;
//# sourceMappingURL=project.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/state.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StateService = (function () {
    function StateService() {
        this.user = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"](null);
        this.internalUser = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"](null);
        this.jwtToken = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"](null);
    }
    return StateService;
}());
StateService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], StateService);

//# sourceMappingURL=state.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/update-emit.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateEmitService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UpdateEmitService = (function () {
    function UpdateEmitService() {
        this.updateStatus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    UpdateEmitService.prototype.updateState = function () {
        console.log('In update-emit updating statue...................');
        this.updateStatus.emit('Saving update ...');
    };
    return UpdateEmitService;
}());
UpdateEmitService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], UpdateEmitService);

//# sourceMappingURL=update-emit.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_state_service__ = __webpack_require__("../../../../../src/app/service/state.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(stateService, http) {
        var _this = this;
        this.stateService = stateService;
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.usersUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiBaseUrl + 'users';
        this.stateService.jwtToken
            .subscribe(function (res) {
            _this.headers.append('Content-Type', 'application/json');
            _this.headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
            _this.headers.append('Pragma', 'no-cache');
            _this.headers.append('Cache-Control', 'max-age=0');
            if (res !== null) {
                _this.headers.append('Authorization', 'Bearer ' + res.token);
            }
        });
    }
    UserService.prototype.getUserByID = function (id) {
        var url = this.usersUrl + "/" + JSON.stringify({ '_id': id });
        return this.http.get(url, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.getUserByGmail = function (gmail) {
        var url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiBaseUrl + 'users/checkGmail/' + gmail;
        return this.http.post(url, { headers: this.headers });
    };
    UserService.prototype.userValidationByEmail = function (email) {
        var query = { '$or': [{ 'Email': email }, { 'Gmail': email }] };
        var url = this.usersUrl + "/" + JSON.stringify(query);
        return this.http.get(url, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.create = function (user) {
        return this.http
            .post(this.usersUrl, user);
    };
    UserService.prototype.update = function (user) {
        var url = this.usersUrl + "/" + JSON.stringify({ '_id': user._id });
        return this.http.put(url, JSON.stringify(user), { headers: this.headers });
    };
    UserService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__service_state_service__["a" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_state_service__["a" /* StateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _b || Object])
], UserService);

var _a, _b;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/app/user-detail/user-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"user-detail\">\n  <div *ngIf=\"user\">\n    <div class=\"container\">\n      <div class=\"form-group row\">\n        <label class=\"col-sm-2 col-form-label\">First Name </label>\n        <div class=\"col-sm-10\">\n          <input class=\"form-control\" [(ngModel)]=\"user.FirstName\" placeholder=\"First Name\" />\n          <p *ngIf=\"error.fn !==''\"><small class=\"text-danger\">{{error.fn}}</small></p>\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-2 col-form-label\">Last Name </label>\n        <div class=\"col-sm-10\">\n          <input class=\"form-control\" [(ngModel)]=\"user.LastName\" placeholder=\"Last Name\" />\n          <p *ngIf=\"error.ln !==''\"><small class=\"text-danger\">{{error.ln}}</small></p>\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-2 col-form-label\">Email</label>\n        <div class=\"col-sm-10\">\n          <input [(ngModel)]=\"user.Email\" class=\"form-control\" placeholder=\"Email\">\n          <p *ngIf=\"error.email.empty !=='' || error.email.format !=='' || error.email.duplicate !==''\">\n            <small class=\"text-danger\">{{error.email.empty}}{{error.email.format}}{{error.email.duplicate}}\n                    </small></p>\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-sm-2 col-form-label\">Institution</label>\n        <div class=\"col-sm-10\">\n          <input class=\"form-control\" [(ngModel)]=\"user.Institution\" placeholder=\"Institution\" />\n          <p *ngIf=\"error.in !==''\"><small class=\"text-danger\">{{error.in}}</small></p>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-12 user-memberDate\">\n          <label>Member since </label>\n          <span>{{user.Date | DateFormatter : 'Date'}}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/user-detail/user-detail.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, ".btn-primary {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n.user-detail {\n  margin-top: 150px; }\n\n.user-static {\n  font-size: 12px;\n  margin-bottom: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/user-detail/user-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_user_service__ = __webpack_require__("../../../../../src/app/service/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_update_emit_service__ = __webpack_require__("../../../../../src/app/service/update-emit.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserDetailComponent = (function () {
    function UserDetailComponent(route, router, elementRef, updateEmitService, userService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.elementRef = elementRef;
        this.updateEmitService = updateEmitService;
        this.userService = userService;
        this.error = {
            fn: '',
            ln: '',
            email: { empty: '', format: '', duplicate: '' },
            in: ''
        };
        this.id = this.route.snapshot.params['id'];
        this.userService.getUserByID(this.id)
            .subscribe(function (res) {
            console.log(res);
            _this.user = res[0];
        });
        var eventStream = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromEvent(elementRef.nativeElement, 'keyup')
            .map(function () { return _this.user; })
            .debounceTime(500)
            .subscribe(function (input) {
            _this.update(_this.user);
        });
    }
    UserDetailComponent.prototype.updatePreChecking = function (user) {
        var _this = this;
        if (this.user.FirstName === '') {
            this.error.fn = 'Should not be empty.';
        }
        else {
            this.error.fn = '';
        }
        if (this.user.LastName === '') {
            this.error.ln = 'Should not be empty.';
        }
        else {
            this.error.ln = '';
        }
        if (this.user.Email === '') {
            this.error.email.empty = 'Should not be empty.';
        }
        else {
            this.error.email.empty = '';
        }
        if (this.user.Email.search('[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+') === -1) {
            this.error.email.format = '::Not Email format. Please check accuracy.';
        }
        else {
            this.error.email.format = '';
        }
        this.userService.userValidationByEmail(this.user.Email)
            .subscribe(function (res) {
            if (typeof (res[0]) !== 'undefined' && res[0]._id !== _this.id) {
                _this.error.email.duplicate = '::This institute email is associated with' +
                    'another existing user. Please choose a different institutional email.';
            }
            else {
                _this.error.email.duplicate = '';
            }
        });
        if (this.user.Institution === '') {
            this.error.in = 'Should not be empty.';
        }
        else {
            this.error.in = '';
        }
        if (this.error.fn === '' &&
            this.error.ln === '' &&
            this.error.email.empty === '' &&
            this.error.email.format === '' &&
            this.error.email.duplicate === '' &&
            this.error.in === '') {
            return true;
        }
        else {
            return false;
        }
    };
    UserDetailComponent.prototype.update = function (user) {
        var _this = this;
        if (!this.updatePreChecking(user)) {
            console.log(this.error);
            console.log('Please see the error message in red.');
        }
        else {
            this.userService.update(user).subscribe(function () {
                _this.updateEmitService.updateState();
            });
        }
    };
    UserDetailComponent.prototype.goHomepage = function () {
        this.router.navigate(['/landing']);
    };
    return UserDetailComponent;
}());
UserDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-user-detail',
        template: __webpack_require__("../../../../../src/app/user-detail/user-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/user-detail/user-detail.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__service_update_emit_service__["a" /* UpdateEmitService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_update_emit_service__["a" /* UpdateEmitService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */]) === "function" && _e || Object])
], UserDetailComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=user-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/users/users.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"pie\">\n    <header class=\"pie container-fluid\">\n        <div class=\"row\">\n         <div routerLinkActive=\"active\"></div>\n        </div>\n    </header>\n</div>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/users/users.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);", ""]);

// module
exports.push([module.i, "/**\n *  If you want to override some bootstrap variables, you have to change values here.\n *  The list of variables are listed here bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss\n */\n.btn-primary {\n  color: #FFFFFF;\n  background: #039BE5;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 10px;\n  width: 120px;\n  height: 40px;\n  line-height: 20px;\n  margin-right: 10px;\n  font-weight: 300; }\n\n.link-primary {\n  text-decoration: none;\n  color: #039BE5;\n  font-size: 13px;\n  cursor: pointer; }\n\n.header-primary {\n  font-weight: 300;\n  color: #039BE5;\n  margin-bottom: 50px;\n  margin-top: 0;\n  letter-spacing: 0px; }\n\n.primary-fa {\n  margin-top: 10px;\n  color: #039BE5; }\n  .primary-fa:hover {\n    color: #03ADFF; }\n\n.card-header {\n  padding: .75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #FFFFFF;\n  text-decoration: none; }\n\n.card-footer {\n  padding: .75rem 1.25rem;\n  background-color: #FFFFFF;\n  border-top: 1px solid lightgray; }\n\np.card-text {\n  margin: 12px;\n  font-size: 14px; }\n\n.form-control {\n  font-weight: 300; }\n\n/**\n *  Do not remove the comments below. It's the markers used by wiredep to inject\n *  sass dependencies when defined in the bower.json of your dependencies\n */\nbody,\nhtml {\n  font-family: \"Lato\";\n  font-size: 14px;\n  font-weight: 300;\n  background: #fff;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: subpixel-antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.container-fluid {\n  padding-left: 20px;\n  padding-right: 20px; }\n\na, a:active, a:hover, a:visited {\n  color: #039BE5;\n  text-decoration: none; }\n\na:active, a:hover {\n  color: #03ADFF; }\n\n.tooltip {\n  z-index: 99999 !important; }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 13px;\n  line-height: 1.42857;\n  border-radius: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n/**\n *  Do not remove the comments below. It's the markers used by gulp-inject to inject\n *  all your sass files automatically\n */\n.user-memberDate {\n  color: #039BE5; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/users/users.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_user_service__ = __webpack_require__("../../../../../src/app/service/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators_userEmail_validator__ = __webpack_require__("../../../../../src/app/validators/userEmail.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_debounceTime__ = __webpack_require__("../../../../rxjs/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var UsersComponent = (function () {
    function UsersComponent(fb, userService, http) {
        this.fb = fb;
        this.userService = userService;
        this.http = http;
    }
    UsersComponent.prototype.onSelect = function (user) {
        this.selectedUser = user;
    };
    UsersComponent.prototype.submit = function () {
        this.userService.create(this.newUserForm.value).subscribe(function () { return console.log('user is created.'); });
    };
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.newUserForm = this.fb.group({
            FirstName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
            LastName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
            Photo: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */](''),
            Email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__validators_userEmail_validator__["a" /* UserEmailValidators */].UserEmailFormat]),
            Group: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* FormControl */]('')
        });
        this.newUserForm.valueChanges
            .filter(function (val) {
            return val.Email.length >= 2;
        }).map(function (val) { return val.Email; })
            .debounceTime(500)
            .switchMap(function (val) { return _this.users.map(function (users) { return users.Email; }).filter(function (emails) { return emails.indexOf(val) === -1; }); })
            .subscribe(function (val) {
            if (val.length === 0) {
                console.log('valid');
            }
            else {
                console.log('invalid');
            }
        });
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-users',
        template: __webpack_require__("../../../../../src/app/users/users.component.html"),
        styles: [__webpack_require__("../../../../../src/app/users/users.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* Http */]) === "function" && _c || Object])
], UsersComponent);

var _a, _b, _c;
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ "../../../../../src/app/validators/userEmail.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserEmailValidators; });



var UserEmailValidators = (function () {
    function UserEmailValidators() {
    }
    UserEmailValidators.UserEmailFormat = function (control) {
        if (control.value.search('[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+') > -1) {
            console.log('Within UserEmail static Function UserEmail function...');
            return null;
        }
        return { validEmailFormat: true };
    };
    return UserEmailValidators;
}());

//# sourceMappingURL=userEmail.validator.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    // apiBaseUrl: 'https://dev.oncoscape.sttrcancer.io/api/',
    apiBaseUrl: 'http://localhost:7776/api/',
    oAuthRedirectUri: '/landing'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map