module.exports = function(grunt) {
  grunt.config('clean', {
    options: {
      force: true
    },
    build: [
      '<%= temp_dir %>',
      '<%= build_dir %>/*'
    ],
    dist: [
      '<%= dist_dir %>/*'
    ]
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};