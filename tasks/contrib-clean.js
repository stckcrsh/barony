module.exports = function(grunt) {
	grunt.config('clean', {
		options: {
			force: true
		},
		build: [
			'<%= build_dir %>/*'
		]
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
};
