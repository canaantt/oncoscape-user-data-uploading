# NG4-Data-Upload

# Steps to run Development Mode

## Step I: Before Start
`mkdir uploads` at root
`sudo chmod 777 uploads` if necessary

## Step II: Start MongoDB
`mongod`
* Create Database called 'mydb'
* In 'mydb', create collections named: 'users', 'projects', 'files', permissions', 'irbs'.

## Step III: Start Client Server

* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.
* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Step IV: Start Backend Express Server
 ```javascript
    cd server
    npm install
    node server.js
 ```
