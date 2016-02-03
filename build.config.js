'use strict';

/**
 * This file/module contains all configuration for the build process.
 */
module.exports = function () {

  return {
    // Main grunt operating directories
    app_dir: 'app',
    temp_dir: '.tmp',
    build_dir: 'build',
    dist_dir: 'dist',

    // Source locations for JS, LESS, ASSETS
    app_files: {
      all_html: [
        'html/**/*.html',
        'index.html'
      ],
      js: [
        '**/*.js',
        '!**/*.spec.js'
      ],
      jsunit: [
        '**/*.spec.js'
      ],
      jshint: [
        'src/**/*.js', // have to include 'src' here because contrib-jshint does not support cwd
        'src/**/*.spec.js'
      ],
      less_main: [
        'assets/less/tu-main.less',
        'assets/less/bi-main.less',
        'assets/less/bootstrap.less'
      ],
      less_all: [
        '**/*.less',
        'assets/**/*.less'
      ],
      sass_main: [
        'app/assets/sass/tu-main.scss'
      ],
      sass_all: [
        'assets/sass/**/*.scss'
      ],
      fonts: [
        'assets/font/**/*',
        'bower_components/bootstrap/fonts/**'
      ],
      images: [
        'assets/img/**/*'
      ],
      grunticons: [
        'assets/img/grunticon/**/*'
      ],
      ts_all: [
        'src/**/*.ts'
      ],
      ts_typings: [
        'src/typings/**/*.d.ts'
      ],
      ts_template_html_all: [
        'src/**/*.html'
      ]
    },
    vendor_files: {
      js: [ // entries here cannot use ! for negativity since these are directly entered in the html
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/http.dev.js'
      ]
    },
    bower_components: {
      js: [
        'bower_components/d3/d3.js',
        'bower_components/d3-tip/index.js'
      ]
    }


  };



};
