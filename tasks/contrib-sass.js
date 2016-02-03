module.exports = function(grunt) {

  grunt.config('sass', {
    build: {
      options: {
        style: 'expanded'
      },
      files: [
        {
          src: '<%= app_files.sass_main %>', // array of files to be built into individual css files
          dest: '<%= build_dir %>/public/assets/css/tu-main.css',
          ext: '.css'
        }
      ]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
};