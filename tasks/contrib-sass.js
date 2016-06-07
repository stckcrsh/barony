module.exports = function(grunt) {

	grunt.config('sass', {
		build: {
			options: {},
			files: [{
				expand: true,
				cwd: '<%= src_dir %>',
				src: '<%= app.sass_all %>', // array of files to be built into individual css files
				dest: '<%= build_dir %>',
				ext: '.css',
				extDot: 'last',
				sourcemap: 'auto'
			}]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
};
