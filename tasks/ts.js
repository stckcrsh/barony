module.exports = function(grunt) {
  grunt.config('ts', {
    options: {
      target: 'ES5',
      module: 'system',
      moduleResolution: 'node',
      sourceMap: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      removeComments: false,
      noImplicitAny: false
    },
    build: {
      outDir: 'build/public/src',
      src: ['app/src/**/*.ts']
    },
    dist: {
      out: 'dist/public/src/app.js',
      src: ['app/src/**/*.ts'],
      options: {
        fast: 'never'
      }
    }
  });

  grunt.loadNpmTasks('grunt-ts');
};