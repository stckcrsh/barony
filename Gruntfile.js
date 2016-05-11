module.exports = function(grunt) {

  var util = require('util');

  var userConfig = require('./build.config.js')();
  var taskConfig = {
    pkg: grunt.file.readJSON('package.json')
  };

  // Creates the basic default which is build active
  // allows us to just type grunt from the command line
  grunt.registerTask("default", ["build-watch"]);

  // Creates a runnable non minified application in the root build directory
  grunt.registerTask('build', function() {});

  grunt.registerTask('build-watch', function(){});


  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));
  grunt.loadTasks('tasks');
};