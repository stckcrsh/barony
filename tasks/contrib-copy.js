module.exports = function(grunt) {
	grunt.config('copy', {
		options: {
			noProcess: ['**/*.{png, gif, jpg, ico, psd, ttf, eot, otf, woff, woff2, svg}']
		},
		build: {
			files: [
				{ // uicoe-toolbox all
					nonull: true,
					cwd: '<%= src_dir %>',
					src: '<%= ui_toolbox.all %>',
					dest: '<%= build_dir %>',
					filter: 'isFile',
					expand: true
				}, 
				{ //index html
					nonull: true,
					cwd: '<%= src_dir %>',
					src: 'index.html',
					dest: '<%= build_dir %>',
					filter: 'isFile',
					expand: true
				},
				{ //Vendor files
					nonull: true,
					src: '<%= vendor_files.js %>',
					dest: '<%= build_dir %>',
					filter: 'isFile',
					expand: true
				},
				{ // ANgular html templates
					nonull: true,
					cwd: '<%= src_dir %>',
					src: '<%= app.html_all %>',
					dest: '<%= build_dir %>',
					filter: 'isFile',
					expand: true
				}
			],
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
