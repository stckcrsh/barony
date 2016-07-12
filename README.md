[![Build Status](https://jenkins.transunion.com/job/uicoe/job/uit-toolbox_starter-build-dev/badge/icon)](https://jenkins.transunion.com/job/uicoe/job/uit-toolbox_starter-build-dev/)

# UICoE Angular 2 Starter
This starter is based off the work by [antonybudianto](https://github.com/antonybudianto/angular2-starter)
It has been updated to match the UICoE needs 

## Table of Content
* [Introduction](#user-content-introduction)
* [Prerequisites](#user-content-prerequisites)
* [Installation](#user-content-installation)
* [Start](#user-content-start)
* [Testing](#user-content-testing)
* [Production](#user-content-production)

## Introduction
Welcome to Angular 2 Starter!
This starter contains almost everything you need to start developing [Angular 2](https://angular.io/):
* [NPM](https://www.npmjs.com/) for package manager
* [TypeScript](http://www.typescriptlang.org/) for the base language
  * with [Typings](https://github.com/typings/typings) for TypeScript definition manager
* [Gulp](http://gulpjs.com/) for workflow (from *serve*, *watch*, *compile*, *test* to *build*)
* [Browsersync](https://www.browsersync.io/) for development server & reload capability
* [SystemJS](https://github.com/systemjs/systemjs) for module loader
* [Codelyzer](https://github.com/mgechev/codelyzer) for static code analyzer
* [Karma](http://karma-runner.github.io/) for test-runner
* [Jasmine](http://jasmine.github.io/) for test framework
* [Istanbul](https://github.com/gotwarlost/istanbul) for test coverage
  * with [Remap Istanbul](https://github.com/SitePen/remap-istanbul) for remapping Javascript to TypeScript coverage
* [SystemJS Builder](https://github.com/systemjs/builder) or [Webpack](https://webpack.github.io/) for module bundling in production

Please visit the [wiki](https://github.com/antonybudianto/angular2-starter/wiki) for more details.

## Prerequisites
### Nodejs
Nodejs is necessary for all aspects of the ui-toolbox project.  You can make this request from the [Desktop Services](https://rc.transunion.com/DesktopService/desktopServiceRequest.do) app on the [Request Catalog](htps://rc.transunion.com) it is under the software tab as Nodejs.

Nodejs should come with the node package manager (npm) which we will use throughout the process for downloading required libraries.

### Ruby
You must have Ruby installed on your machine to run the SASS compiler.  You can make this request from the [Desktop Services](https://rc.transunion.com/DesktopService/desktopServiceRequest.do) app on the [Request Catalog](htps://rc.transunion.com) it is under the software tab as Ruby.

Once you have ruby run this command from the command line to install the SASS Ruby compiler.

	gem install sass


## Installation
Firstly, you need to have [Node.js](https://nodejs.org/en/)
- For v4, please use v4.3.x (LTS) or higher (**highly** recommended)
- For v5, please use v5.6.x or higher, here is [why](https://nodejs.org/en/blog/vulnerability/february-2016-security-releases/)
- Ready for v6

> You need v4.x or higher for [Protractor](https://angular.github.io/protractor/#/)

Then, install these packages globally:
```bash
npm install -g gulp typings
```

Gulp is our task manager and typings installs library api files for typescript.

After that, go to the starter directory and just run:
```bash
npm install
```

npm install will automagically run the typings install when it completes
If you need to rerun it or if there are issues you can use this command

	typings install
> If there are issues with self signed certs you will need to create a file names '.typingsrc' in your user directory.
> The contents of the file should be

>   rejectUnauthorized=false

## Start
Let's start up the server, run:
`gulp` or `gulp serve-dev`

and done! The browser will popup and you can start trying Angular 2!
Every changes to the file will refresh the browser automatically
and it'll also compile your changed TypeScripts files to Javascript files.

## Testing
This starter comes with testing gulp workflow

### Unit testing
Just run
```bash
gulp test
```
and it'll compile all TypeScript files, start Karma, then remap Istanbul coverage so that it shows TypeScript coverage, not the transpiled JavaScript coverage.

![Coverage result](http://s33.postimg.org/w7m9ckdkf/Screen_Shot_2016_06_04_at_8_15_53_AM.png)

### E2E testing
Firstly start the server:
```
gulp serve-dev
```

To begin testing, run in a seperate session
```bash
gulp e2e
```
and it'll compile all E2E spec files in `/src/test/e2e/*.spec.ts`, boot up Selenium server then launches Chrome browser.

## Production
> All build tasks will run the `gulp test`, the bundle will only be created if the test passed.

You can create production build by running:
```bash
gulp build
```
or you can create production build and then serve it using Browsersync by running:
```bash
gulp serve-build
```
The starter defaults to bundle using [SystemJS Builder extension](https://github.com/ngstarter/systemjs-extension).