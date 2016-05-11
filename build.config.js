'use strict';

/**
 * This file/module contains all configuration for the build process.
 */
module.exports = function () {

  return {
    // Main grunt operating directories

    // Source locations for JS, LESS, ASSETS
    app_files: {
    },
    vendor_files: {
      js: [ // entries here cannot use ! for negativity since these are directly entered in the html
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/http.dev.js'
      ]
    }


  };



};
