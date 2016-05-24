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
		app: {
			dir: 'app/',
			html_all: 'app/**/*.html',
		},

		vendor_files: {
			js: [ // entries here cannot use ! for negativity since these are directly entered in the html
				'node_modules/es6-shim/es6-shim.min.js',
				'node_modules/zone.js/dist/zone.js',
				'node_modules/reflect-metadata/Reflect.js',
				'node_modules/systemjs/dist/system.src.js'
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
