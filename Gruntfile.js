module.exports = function(grunt) {

  var userConfig = require('./build.config.js')();
  var taskConfig = {
    pkg: grunt.file.readJSON('package.json')
  };


  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));
  grunt.loadTasks('tasks');
};