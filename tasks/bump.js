module.exports = function(grunt){
	grunt.config('bump', {
		options: {
      files: ['package.json', 'bower.json'],
      updateConfigs: ['pkg'],
      commit: true,
      commitMessage: 'Release v%VERSION%',
      commitFiles: ['package.json', 'bower.json'],
      createTag: true,
      tagName: 'v%VERSION%',
      tagMessage: 'Version %VERSION%',
      push: true,
      pushTo: 'upstream',
      gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
      globalReplace: false,
      prereleaseName: 'SNAPSHOT',
      metadata: '',
      regExp: false
    }	
	});

	grunt.loadNpmTasks('grunt-bump');
};