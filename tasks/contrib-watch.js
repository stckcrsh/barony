module.exports = function(grunt){
	grunt.config('watch', {
		options: {
			cwd: '<%= app_dir %>'
		},
		ts: { //Type script files
			files: '<%= app_files.ts_all %>',
			tasks: ['ts:build']
		},
		html: { //HTML files
			files: '<%= app_files.all_html %>',
			tasks: ['copy:build', 'injector']
		},
		sass: { //SASS files
			files: '<%= app_files.sass_all',
			tasks: ['sass']
		},
		js: { //JS files
			files: '<%= app_files.js',
			tasks: ['copy:build', 'injector']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};