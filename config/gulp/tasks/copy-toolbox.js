var envConfig = require('../env');

if (envConfig.ENV === envConfig.ENVS.DEV) {
	var gulp = require('gulp');
	var config = require('../config')();
	var copy = require('gulp-copy');

	gulp.task('copy', function() {
		copyFiles(config.toolbox.src);

		gulp.src(config.toolbox.favicons)
			.pipe(copy(config.src, { prefix: 4 }));
	});

	gulp.task('copy-watch', function() {
		copyFiles(config.toolbox.src);
	});

	gulp.task('watch-toolbox', function() {
		return gulp.watch(config.toolbox.src, ['copy-watch']);
	});

	function copyFiles(files){
		gulp.src(files)
			.pipe(copy(config.assetsPath.toolbox, { prefix: 4 }));
	}
}
