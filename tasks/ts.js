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