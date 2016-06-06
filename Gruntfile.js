module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');

	var userConfig = require('./build.config.js')();
	var taskConfig = {
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			options: {
				interval: 500,
				cwd: '<%= src_dir %>'
			},
			html: {
				files: '<%= app.html_all %>',
				tasks: ['copy:build']
			},
			ts: {
				files: '<%= app.ts_all %>',
				tasks: ['tslint:build', 'ts:build']
			},
			scss: {
				files: ['<%= app.sass_all %>'],
				tasks: ['sass:build']
			}
		}
	};

	grunt.registerTask('default', function(target) {
		grunt.task.run(['build-watch']);
	});


	grunt.registerTask('build-watch', function() {
		grunt.task.run([
			'build',
			'watch'
		]);
	});


	grunt.registerTask('build', function() {
		grunt.task.run([
			'tslint:build',
			'ts:build',
			'sass:build',
			'copy:build'
		]);
	});

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));
	grunt.loadTasks('tasks');
};
