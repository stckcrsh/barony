module.exports = function(grunt) {
  grunt.config('ts', {
    options: {
      tsconfig: true,
      experimentalDecorators: true
    },
    build: {
      outDir: 'build/app',
      src: ['typings/index.d.ts', 'src/app/**/*.ts']
    },
    dist: {
      out: 'dist/app.js',
      src: ['typings/index.d.ts', 'src/app/**/*.ts'],
      options: {
        fast: 'never'
      }
    }
  });

  grunt.loadNpmTasks('grunt-ts');
};