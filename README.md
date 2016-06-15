# UICoE Toolbox Starter App
This starter application is to be used as a seed for other ui projects within TU. Instructions below will describe how to set up the app integrate in the UICoE Toolbox components.

## Prerequisites
#### Nodejs
Nodejs is necessary for all aspects of the ui-toolbox project.  You can make this request from the [Desktop Services](https://rc.transunion.com/DesktopService/desktopServiceRequest.do) app on the [Request Catalog](htps://rc.transunion.com) it is under the software tab as Nodejs.

Nodejs should come with the node package manager (npm) which we will use throughout the process for downloading required libraries.

#### Ruby
You must have Ruby installed on your machine to run the SASS compiler.  You can make this request from the [Desktop Services](https://rc.transunion.com/DesktopService/desktopServiceRequest.do) app on the [Request Catalog](htps://rc.transunion.com) it is under the software tab as Ruby.

Once you have ruby run this command from the command line to install the SASS Ruby compiler.

	gem install sass

## Initial Setup
### One time setup (Globals)
		
	npm install -g grunt-cli
	npm install -g concurrently
	npm install -g typescript
	npm install -g bower
	npm install -g typings
		
Clone the project to your local development environment. Then remove the '.git/' directory 

	cd {project_root}
	git clone --depth 1 https://stash.transunion.com/scm/uit/uicoe-toolbox-starter-app.git .
	rm -rf .git/

> Careful with the remove command and make sure that you are at the root of the starter app before running this command

Then run these commands from the command line substituting variables wrapped in curly brackets '{}'

	cd {project_root}
	npm install
	bower install
> If there are issues with self signed certs you will need to create a file named '.bowerrc' in your user directory.
> The contents of that file should be

>   {"strict-ssl": false} 

	typings install
> If there are issues with self signed certs you will need to create a file names '.typingsrc' in your user directory.
> The contents of the file should be

>   rejectUnauthorized=false

Now you should have all the required libraries downloaded and ready to go.

## Project Structure

	ui-toolbox-starter-app/
	├─ src/
	│	├─ assets/	- - - - - - - All application specific assets live here
	│	│	├─ css
	│	│	├─ font
	│	│	├─ img
	│	│	└─ sass
	│	├─ bower_components/
	│	├─ app/
	│	├─ systemjs.config.js 	- Systemjs configuration (used for loading modules in the app)
	│	└─ index.html
	├─ build/
	├─ dist/
	├─ node_modules/
	├─ tasks/ 	- - - - - - - - This is where all the Grunt tasks are located
	├─ .bowerrc
	├─ .jshintrc
	├─ .gitignore
	├─ bower.json
	├─ bs-config.json 	- - - - Used to configure the lite-server to load the build folder
	├─ build.config.js	- - - - Houses all the build configurations (file locations)
	├─ Gruntfile.js 	- - - - This is the basic grunt configuration that loads all the tasks
	├─ package.json 	- - - - Dependency and version information for this application
	├─ README.md	- - - - - - You are reading this file right now
	├─ tsconfig.json	- - - - Configures Typescript for this application
	├─ tslint.json	- - - - - - Configures the tslint task to look for our style guidlines
	└─ typings.json 	- - - - Configures the typings dependencies (needed to load libraries in Typescript)

## Grunt Tasks
#### Default
When grunt is called without any arguments the [build-watch](#user-content-build-watch) task 

	grunt

#### Build
The build task compiles our source and sass files, validates and copies everything over to the build directory (un-minified) to be served from a web server.

	grunt build

#### Build Watch
This task is to be used during active development. It is similar to the build, but when it is complete it runs a task to watch for file changes and then copy and/or recompile resources as they are saved.

	grunt build-watch

##### Copy
This task will copy files over from the app/ and node_module/ directories into the correct locations in the build/ directory

	grunt copy:build 		//copies the app/ directory to the build/ directory

#### Watch
This task stays active and waits for file changes it then will run tasks to that file based on its filetype

	grunt watch

#### Typescript
This task transpiles our Typescript files into ES5 Javascript and generates them into our build/ directory

	grunt ts:build 		//transpiles Typescript into the build/ directory

#### TSLint
This task runs the Typescript linter using the configuration from the tslint.json file

	grunt tslint:build 	//lints all the typescript files

## Scripts
### lite
By default the npm install command will install lite-server to use for development purposes and it can be started by using the command 

	npm run lite

The lite-server is used alot for our example application but is not for final production builds.

Connecting to the lite-server is done by navigating to [http://localhost:3000](http://localhost:3000) for the lite-server admin page or [http://localhost:3001](http://localhost:3001) for the generated app
