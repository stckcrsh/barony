module.exports = function(grunt){
	grunt.config('injector', 
	{
		options: 
		{
      relative: true,
      addRootSlash: false,
      lineEnding: require('os').EOL
    },
    src: 
    {
      files: 
      {
        '<%= build_dir %>/public/index.html': 
        [
					'<%= build_dir %>/public/assets/css/tu-main.css'
        ]
      }
    }
	});

	grunt.loadNpmTasks('grunt-injector');
};