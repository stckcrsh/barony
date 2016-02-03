# Overview
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
		
Clone the project to your local development environment. using this command

	git clone --depth 1 https://stash.transunion.com/scm/uit/ui-toolbox.git

Then run these commands from the command line substituting variables wrapped in curly brackets '{}'

	cd {project_root}
	npm install
	bower install

Now you should have all the required libraries downloaded and ready to go.

## Project Structure

	ui-toolbox/
	├─ app/
	│	├─ assets/
	│	│	├─ css
	│	│	├─ font
	│	│	├─ img
	│	│	├─ sass
	│	│	├─ favicon.ico
	│	│	└─ favicon.png
	│	├─ bower_components/
	│	├─ src/
	│	└─ index.html
	├─ build/
	├─ dist/
	├─ node_modules/
	├─ tasks/
	├─ .bowerrc
	├─ .jshintrc
	├─ bower.json
	├─ build.config.js
	├─ Gruntfile.js
	├─ package.json
	├─ README.md
	└─ ts.config.json

## Starting the lite-server
By default the npm install command will install lite-server we use this for development purposes and it can be started by using the command 

	npm run lite

The lite-server is used alot for our example application but is not necessary for final production builds.

Connecting to the lite-server is done by navigating to [http://localhost:3003](http://localhost:3003) for the lite-server admin page or [http://localhost:3002](http://localhost:3002) for the generated app

## Grunt Tasks
### Build Tasks
#### Build
The build task compiles our source and sass files, validates and copies everything over to the build directory (un-minified) to be served from a web server.

	grunt build

#### Build Watch
This task is to be used during active development. It is similar to the build, but when it is complete it runs a task to watch for file changes and then copy and/or recompile resources as they are saved.

	grunt build-watch

### Generic Tasks
### Clean
Running this task will clear out the build/ and/or the dist/ folders.

	grunt clean:build 	//runs clean on the build folder
	grunt clean:dist 		//runs clean on the dist folder
	grunt clean 				//runs clean on both

### Copy
This task will copy files over from the app/ and node_module/ directories into the correct locations in the build/ directory

	grunt copy:build 		//copies the app/ directory to the build/ directory

#### SASS
Running this task will compile the tu-main.scss file into the tu-main.css inside the build/ directory

  grunt sass

#### Watch
This task stays active and waits for file changes it then will run tasks to that file based on its filetype

	grunt watch

#### Injector
This task will generate the &lt;script&gt; tags and the &lt;link&gt; tags for our index.html based on the files that were generated and copied over.

	grunt injector 

#### Typescript
This task transpiles our Typescript files into ES5 Javascript and generates them into our build/ directory

	grunt ts:build 		//transpiles Typescript into the build/ directory
