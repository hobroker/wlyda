const gulp = require('gulp');
const bundle = require('gulp-bundle-assets');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const stylus = require("gulp-stylus");
const path = require("path");
const imagemin = require("gulp-imagemin");
const gulpif = require("gulp-if");


function assetsPath(endPoint) {
	return path.normalize(__dirname + endPoint);
}

const config = {
	out_dir: path.normalize(__dirname + '/../../public/assets'),
	minify: process.env.state === 'prod',
	styles: {
		main: {
			files: [
				assetsPath('/stylus/**/*.styl')
			],
			watch: assetsPath('/stylus/**/*.styl')
		}
	},
	scripts: {
		main: {
			files: [
				assetsPath('/js/**/*.js')
			],
			watch: assetsPath('/js/**/*.js')
		}
	}
};

function makeFilename(filename, extension) {
	return filename + (module.exports.minify ? '.min' : '') + '.' + extension
}

function bundleStyles() {
	Object.keys(config.styles).forEach(function (bundle) {
		function run() {
			console.log('-- style bundle(', bundle, ')');
			gulp.src(config.styles[bundle].files)
				.pipe(stylus({
					compress: config.minify
				}))
				.pipe(concat(makeFilename(bundle, 'css')))
				.pipe(sourcemaps.init())
				.pipe(sourcemaps.write('/maps'))
				.pipe(gulp.dest(config.out_dir))
		}

		run();

		gulp.watch(config.styles[bundle].watch, run);
	});
}

function bundleScripts() {
	Object.keys(config.scripts).forEach(function (bundle) {
		function run() {
			console.log('-- script bundle(', bundle, ')');
			gulp.src(config.scripts[bundle].files)
				.pipe(babel({
					presets: ['env'],
					compact: config.minify
				}))
				.pipe(concat(makeFilename(bundle, 'js')))
				.pipe(sourcemaps.init())
				.pipe(sourcemaps.write('/maps'))
				.pipe(gulp.dest(config.out_dir))
		}

		run();

		gulp.watch(config.scripts[bundle].watch, run);
	});
}

function cleanAssets() {
	return gulp.src('./public/assets', {read: false})
		.pipe(require('gulp-rimraf')());
}

function compressImages() {
	const mediaPath = assetsPath('/media/**/*');

	function run() {
		gulp.src(mediaPath)
			.pipe(gulpif(config.minify, imagemin([
				imagemin.jpegtran({progressive: true}),
				imagemin.optipng({optimizationLevel: 5})
			], {
				verbose: true
			})))
			.pipe(gulp.dest(path.normalize(__dirname + '/../../public/media')))
	}

	run();

	gulp.watch(mediaPath, run);
}

gulp.task('bundle-scripts', bundleScripts);

gulp.task('bundle-styles', bundleStyles);

gulp.task('clean-assets', cleanAssets);

gulp.task('compress-images', compressImages);

gulp.task('bundle-assets', ['clean-assets', 'bundle-scripts', 'bundle-styles', 'compress-images']);
