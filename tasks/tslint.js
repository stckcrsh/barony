module.exports = function(grunt) {
	grunt.config('tslint', {
		options: {
			configuration: 'tslint.json'
		},
		build: {
			files: {
				src: ['<%= src_dir %><%= app.ts_all %>']
			}
		}
	});

	grunt.loadNpmTasks('grunt-tslint');
};
