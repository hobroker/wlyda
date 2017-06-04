const lazypipe = require('lazypipe');
const babel = require('gulp-babel');
const stylus = require("gulp-stylus");
const gif = require("gulp-if");

const USE_HASH_NAMES = false;
const MINIFY = true;

function makePath(endPoint) {
	return __dirname + (endPoint.charAt(0) === '/' ? '' : '/') + endPoint;
}

module.exports = {
	bundle: {
		main: {
			scripts: [
				makePath('/scripts/main.scripts')
			],
			styles: [
				makePath('/styles/main.styl')
			],
			options: {
				uglify: MINIFY,
				minCss: MINIFY,
				rev: USE_HASH_NAMES,
				transforms: {
					scripts: lazypipe().pipe(babel, {
							presets: ['es2015']
						}
					),
					styles: lazypipe().pipe(function () {
						return gif((file) => /styl$/.test(file.relative), stylus());
					})
				},
				result: {
					type: {
						scripts: function xJavascript(path) {
							return "<script src='/public/assets/" + path + "' type='text/javascript'></script>";
						}
					}
				}
			}
			// styles: makePath('/css/**/*.css')
		},
		vendor: {
			styles: []
		}
	},
	copy: [
		makePath('/libraries/css/material.blue-red.min.css')
	]
};




gulp.task('bundleAssets', ['cleanAssets', 'copyMedia'], function () {
	return gulp.src(__dirname + '/app/assets/bundle.config.scripts')
		.pipe(bundle())
		.pipe(bundle.results(__dirname + '/app/assets'))
		.pipe(gulp.dest('./public/assets'))
});