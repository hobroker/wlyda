const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');
const gapidoc = require('gulp-apidoc');
const path = require("path");


require('./app/env');

require("./app/assets/bundle.config");

console.log(path.resolve("./app/routes/api/"));

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

function apidoc(done) {
	gapidoc({
		src: "./app/routes/api/",
		dest: "./public/apidoc/"
	}, done);
}

gulp.task('nodemon', nodemonTask);

gulp.task('apidoc', apidoc);

gulp.task('default', function (callback) {
	runSequence('bundle-assets', 'nodemon', callback);
});
