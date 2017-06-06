const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const stylus = require("gulp-stylus");
const path = require("path");
const imagemin = require("gulp-imagemin");
const gulpif = require("gulp-if");
const fs = require('fs');
const runSequence = require('run-sequence');


function makeAssetsPath(endPoint) {
	return path.normalize(__dirname + endPoint);
}

const outDir = path.normalize(__dirname + '/../../public');
if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir);
}

const config = {
	out_dir: outDir + '/assets',
	minify: process.env.state === 'prod',
	styles: {
		main: {
			files: [
				'/stylus/main.styl'
			],
			watch: '/stylus/**/*.styl'
		},
		libraries: {
			files: [
				'/libraries/css/bootstrap.min.css'
			],
			watch: [
				'/libraries/**/*.css'
			],
			touch: false,
		}
	},
	scripts: {
		main: {
			files: [
				'/js/**/*.js'
			],
			watch: '/js/**/*.js'
		},
		libraries: {
			files: [
				'/libraries/js/jquery-3.2.1.min.js',
				'/libraries/js/tether.min.js',
				'/libraries/js/bootstrap.min.js'
			],
			watch: [
				'/libraries/**/*.js'
			],
			minify: false,
			touch: false
		}
	}
};

function makeFilename(filename, extension) {
	return filename + (module.exports.minify ? '.min' : '') + '.' + extension
}

function errorHandler(error) {
	console.log(error.toString());
	console.log('!! aborting');
	this.emit('end');
}

function bundleStyles() {
	Object.keys(config.styles).forEach(function (bundle) {
		let item = config.styles[bundle];

		function run() {
			let shouldChange = item.touch === undefined ? true : item.touch;
			console.log('-- style bundle(', bundle, ')');
			gulp.src(item.files.map(makeAssetsPath))
				.pipe(gulpif(shouldChange,
					stylus({
						compress: item.minify || config.minify
					})
				))
				.on('error', errorHandler)
				.pipe(concat(makeFilename(bundle, 'css')))
				.pipe(gulpif(shouldChange, sourcemaps.init()))
				.pipe(gulpif(shouldChange, sourcemaps.write('/maps')))
				.pipe(gulp.dest(config.out_dir))
		}

		run();

		gulp.watch(makeAssetsPath(item.watch), run);
	});
}

function bundleScripts() {
	Object.keys(config.scripts).forEach(function (bundle) {
		let item = config.scripts[bundle];

		function run() {
			let shouldChange = item.touch === undefined ? true : item.touch;
			console.log('-- script bundle(', bundle, ')');
			gulp.src(item.files.map(makeAssetsPath))
				.pipe(gulpif(shouldChange,
					babel({
						presets: ['env'],
						compact: item.minify || config.minify
					})
				))
				.on('error', errorHandler)
				.pipe(concat(makeFilename(bundle, 'js')))
				.pipe(gulpif(shouldChange,
					sourcemaps.init()
				))
				.pipe(gulpif(shouldChange,
					sourcemaps.write('/maps')
				))
				.pipe(gulp.dest(config.out_dir))
		}

		run();

		gulp.watch(makeAssetsPath(item.watch), run);
	});
}

function cleanAssets() {
	return gulp.src('./public/assets', {read: false})
		.pipe(require('gulp-rimraf')());
}

function compressImages() {
	const mediaPath = makeAssetsPath('/media/**/*');

	function run() {
		gulp.src(mediaPath)
			.pipe(gulpif(config.minify, imagemin([
				imagemin.jpegtran({progressive: true}),
				imagemin.optipng({optimizationLevel: 5})
			], {
				verbose: true
			})))
			.pipe(gulp.dest(outDir + '/media'))
	}

	run();

	gulp.watch(mediaPath, run);
}

gulp.task('clean-assets', cleanAssets);

gulp.task('bundle-scripts', bundleScripts);

gulp.task('bundle-styles', bundleStyles);

gulp.task('compress-images', compressImages);

gulp.task('bundle-assets', function () {
	runSequence(
		'clean-assets',
		'bundle-scripts',
		'bundle-styles',
		'compress-images'
	)
});
