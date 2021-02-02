<img src="https://github.com/devniel93/angular-restaurant-app/blob/master/src/assets/images/angular-logo.svg" align="right" width="131" height="143">

# Angular App "ConFusion Restaurant"

This repository contains the codebase for the Angular App "Confusion Restaurant", as well as my personal notes and summaries about Course of "Front-End Javascript Frameworks: Angular" from [Coursera](https://www.coursera.org/learn/angular).

## To Run Project

### Install json-server

Run `npm install -g json-server`. Create a new folder named json-server in some location on the computer and paste in this folder the file [db.json](https://github.com/devniel93/angular-restaurant-app/blob/master/src/assets/data/db.json).

Run `json-server --watch db.json` in the location of the json-server folder. This startup a light server at port number 3000.

### Run Angular App

Run `ng serve --open` for a dev server. The app will automatically open in your default browser with the address `http://localhost:4200/` and reload if you change any of the source files.

## Build to Prod

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory. 

## To Run Unit Tests 
Run `ng test` using Jasmine and Karma.

## To Run End-To-End Tests
Run `ng e2e` using Jasmine and Protractor.


*This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.
