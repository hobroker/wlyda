const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');

require('./app/env');

require("./app/assets/bundle.config");

function nodemonTask() {
	const daemon = nodemon({
		script: './app/index.js',
		watch: [
			'app/**/*',
			'gulpfile.js'
		],
		ignore: [
			'app/assets/**/*'
		],
		ext: 'js hbs'
		// tasks: ['bundle-assets']
	});

	daemon
		.on('restart', function () {
			console.log('Application has restarted!');
		})
		.on('crash', function () {
			console.error('Application has crashed!\n');
			daemon.emit('restart', 10)
		});
}

gulp.task('nodemon', nodemonTask);

gulp.task('default', function (callback) {
	runSequence('bundle-assets', 'nodemon', callback);
});
