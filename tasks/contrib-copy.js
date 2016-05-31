module.exports = function(grunt) {
	grunt.config('copy', {
		options: {
			noProcess: ['**/*.{png, gif, jpg, ico, psd, ttf, eot, otf, woff, woff2, svg}']
		},
		build: {
			files: [{ // uicoe-toolbox all
				nonull: true,
				cwd: '<%= src_dir %>',
				src: '<%= ui_toolbox.all %>',
				dest: '<%= build_dir %>',
				filter: 'isFile',
				expand: true
			}, { //index html
				nonull: true,
				cwd: '<%= src_dir %>',
				src: 'index.html',
				dest: '<%= build_dir %>',
				filter: 'isFile',
				expand: true
			}, { //angular dependant files
				nonull: true,
				src: '<%= angular.files %>',
				dest: '<%= build_dir %>',
				filter: 'isFile',
				expand: true
			}, { //Angular modules
				nonull: true,
				src: '<%= angular.modules %>',
				dest: '<%= build_dir %>',
				expand: true,

				//this will keep build times lower by not copying files node_modules that already exist
				//If you want to copy these in just delete the build/node_modules/ folder
				filter: function(filepath) {
					// NPM load file path module. 
					var path = require('path');

					// Construct the destination file path using the config build path and the filepath
					var dest = path.join(
						grunt.config.data.build_dir,
						filepath
					);

					// Return false if the file exists.
					return !(grunt.file.exists(dest));
				}
			}, { // vendor files
				nonull: true,
				src: '<%= node_modules.files %>',
				dest: '<%= build_dir %>',
				expand: true,

				//this will keep build times lower by not copying files node_modules that already exist
				//If you want to copy these in just delete the original files
				filter: function(filepath) {
					// NPM load file path module. 
					var path = require('path');

					// Construct the destination file path using the config build path and the filepath
					var dest = path.join(
						grunt.config.data.build_dir,
						filepath
					);

					// Return false if the file exists.
					return !(grunt.file.exists(dest));
				}
			}, 
			{ // system config
				nonull: true,
				cwd: '<%= src_dir %>',
				src: '<%= angular.system_config %>',
				dest: '<%= build_dir %>',
				filter: 'isFile',
				expand: true
			}, { // html templates
				nonull: true,
				cwd: '<%= src_dir %>',
				src: '<%= app.html_all %>',
				dest: '<%= build_dir %>',
				filter: 'isFile',
				expand: true
			}],
			options: {
				process: function(content, srcPath) {
					// Run our page html files through grunts tempalating (currently used to auto inject script tags)
					if (grunt.file.isMatch('**/*.html', srcPath)) {
						// console.log('Processing %s', srcPath);
						return grunt.template.process(content);
					}

					return content; //a js or css file, just letting it pass through
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
}
