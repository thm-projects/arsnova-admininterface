var gulp = require('gulp');
var sequence = require('gulp-sequence');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint')
var pump = require('pump');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var jscs = require('gulp-jscs');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var zip = require('gulp-zip');

var rename = require('gulp-rename');
var war = require('gulp-war');

var jsFiles = [
	"./js/namespace.js",
	"./js/i18n.js",
	"./js/model/*.js",
	"./js/service/*.js",
	"./js/view/*.js",
	"./js/utils.js",
	"./js/router.js",
	"./js/main.js"
];

gulp.task('default', ['codeCheck']);

gulp.task('connect', function () {
	var connect = require('gulp-connect');
	var proxy = require('http-proxy-middleware');
	var modRewrite = require('connect-modrewrite');
	var Reproxy = require("gulp-connect-reproxy");
	/*connect.server({
		root: '',
		liverelad: true
	});*/
	connect.server({
		port: 8888,
		middleware: function (connect, options) {
      return [ (function() {
        var url = require('url');
        var proxy = require('proxy-middleware');
        var options = url.parse('http://localhost:8080');
        options.route = '/api';
        return proxy(options);
      })(), [ (function () {
        var url = require('url');
        var proxy = require('proxy-middleware');
        var options = url.parse('http://localhost:8080/arsnova-config');
        options.route = '/arsnova-config';
        return proxy(options);
      })()]
			]
		}
	});
});

gulp.task('watch', function () {
	gulp.start('codeCheck');
	gulp.watch('./js/**/*.js', ['codeCheck'])
});

gulp.task('package', sequence('concat', 'compress', ['copyTemplates', 'copyProductionIndex', 'copyCSS', 'copyLib', 'copyPublic'], 'tarball', 'clean'));

gulp.task('war', sequence('concat', 'compress', ['copyTemplates', 'copyProductionIndex', 'copyCSS', 'copyLib', 'copyPublic'], 'warball', 'clean'));

gulp.task('build', sequence('concat', 'compress', ['copyTemplates', 'copyProductionIndex', 'copyCSS', 'copyLib', 'copyPublic'], 'copyBuild', 'clean'));

gulp.task('codeCheck', function () {
  gulp.start('lint');
  gulp.start('jscs');
});

gulp.task('compress', function (cb) {
  pump([
    gulp.src('./build/admininterface.js'),
    uglify(),
    gulp.dest('./build')
  	],
  	cb
  );
});

gulp.task('lint', function () {
  return gulp.src('./js/**/*.js')
    	.pipe(jshint())
    	.pipe(jshint.reporter(stylish));
});

gulp.task('jscs', function () {
	return gulp.src('./js/**/*.js')
      .pipe(jscs())
      .pipe(jscs.reporter());
});

gulp.task('concat', function () {
	return gulp.src(jsFiles)
			.pipe(concat('admininterface.js'))
			.pipe(gulp.dest('./build/'));
});

gulp.task('clean', function () {
	return gulp.src('./build/*', {read: false})
			.pipe(clean());
});

gulp.task('cleanDist', function () {
	return gulp.src('./dist/*', {read: false})
			.pipe(clean());
});

gulp.task('copyTemplates', function () {
	return gulp.src('./html/*')
			.pipe(gulp.dest('./build/html'));
});

gulp.task('copyProductionIndex', function () {
	return gulp.src('./production.html')
			.pipe(rename('index.html'))
			.pipe(gulp.dest('./build'));
});

gulp.task('copyCSS', function () {
	return gulp.src('./css/**/*')
			.pipe(gulp.dest('./build/css'));
});

gulp.task('copyBuild', function () {
	return gulp.src('./build/**/*')
			.pipe(gulp.dest('./dist'));
});

gulp.task('copyLib', function () {
	return gulp.src('./lib/**/*')
			.pipe(gulp.dest('./build/lib'));
});

gulp.task('copyPublic', function () {
	return gulp.src('./public/**/*')
			.pipe(gulp.dest('./build/public'));
});

gulp.task('tarball', function () {
	return gulp.src(['./build/**/*'])
			.pipe(tar('arsnova-admininterface.tar'))
			.pipe(gzip({ extension: 'gz'}))
			.pipe(gulp.dest('./dist'));
});

gulp.task('warball', function () {
	return gulp.src(['./build/**/*'])
			.pipe(war({
				welcome: 'index.html',
				displayName: 'ARSnova Admininterface'
			}))
      .pipe(zip('arsnova-admininterface.war'))
			.pipe(gulp.dest('./dist'));
});
