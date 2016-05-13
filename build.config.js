'use strict';

/**
 * This file/module contains all configuration for the build process.
 */
module.exports = function() {

	return {
		// Main grunt operating directories
		build_dir: 'build/',
		build_public: '<%= build_dir %>public/',
		src_dir: 'src/',
		bower_components: 'bower_components/',

		// Source locations for JS, LESS, ASSETS
		
		vendor_files: {
			js: [ // entries here cannot use ! for negativity since these are directly entered in the html
				'node_modules/angular2/bundles/angular2-polyfills.js',
				'node_modules/systemjs/dist/system.src.js',
				'node_modules/rxjs/bundles/Rx.js',
				'node_modules/angular2/bundles/angular2.dev.js',
				'node_modules/angular2/bundles/http.dev.js'
			]
		},
		ui_toolbox: {
			all: '<%= bower_components %>/UICoE-Toolbox/dist/**/*',
			css: [
				'bower_components/UICoE-Toolbox/dist/css/tu-bootstrap.min.css',
				'bower_components/UICoE-Toolbox/dist/css/tu-main.min.css',
				'bower_components/UICoE-Toolbox/dist/css/tu-mainGray.min.css'
			]
		}


	};



};
