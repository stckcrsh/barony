module.exports = function(grunt){
	grunt.config('copy', {
		options: {
      // exclude binary format from the process function
      // it corrupts some binary files
      noProcess: [
        '**/*.{png,gif,jpg,ico,psd,ttf,eot,otf,woff,woff2,svg}'
      ]
    },
    build: {
			files: [
				{ //JS Vendor files
					src: '<%= vendor_files.js %>',
					dest: '<%= build_dir %>/public/',
					filter: 'isFile',
					expand: true		
				},
				{ //HTML
					cwd: '<%= app_dir %>',
					src: '<%= app_files.all_html %>',
					dest: '<%= build_dir %>/public/',
					flatten: true,
					expand: true
				},
				{ //FONTS
					cwd: '<%= app_dir %>',
					src: '<%= app_files.fonts %>',
					dest: '<%= build_dir %>/public/',
					filter: 'isFile',
					expand: true	
				},
				{ // TS Template html
					cwd: '<%= app_dir %>',
					src: '<%= app_files.ts_template_html_all %>',
					dest: '<%= build_dir %>/public/',
					flatten: false,
					expand: true
				},
				{ //TS SRC files for the maps to view
					cwd: '<%= app_dir %>',
					src: '<%= app_files.ts_all %>',
					dest: '<%= build_dir %>/public/app/',
					expand: true, 
					flatten: false

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
};