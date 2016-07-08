var envConfig = require('../env');

if (envConfig.ENV === envConfig.ENVS.DEV) {
	var gulp = require('gulp');
	var config = require('../config')();
	var copy = require('gulp-copy');

	gulp.task('copy', function() {
		gulp.src(config.toolbox.src)
			.pipe(copy(config.assetsPath.toolbox, { prefix: 4 }));

		gulp.src(config.toolbox.favicons)
			.pipe(copy(config.src, { prefix: 4 }));
	});
}
