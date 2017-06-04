const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');
const runSequence = require('run-sequence');

require('./app/env');

require("./app/assets/bundle.config");

gulp.task('lint', function () {
	gulp.src('./**/*.scripts')
		.pipe(jshint())
});

gulp.task('nodemon', function () {
	const daemon = nodemon({
		script: 'app/index.scripts',
		watch: ['app/**/*', 'gulpfile.scripts'],
		ext: 'scripts'
	});

	daemon
		.on('restart', function () {
			runSequence('lint', function () {
				console.log('Restarted!');
			});
		})
		.on('crash', function () {
			console.error('Application has crashed!\n');
			daemon.emit('restart', 10)
		});
});

gulp.task('default', function (callback) {
	runSequence('lint', 'bundle-assets', 'nodemon', callback);
});
