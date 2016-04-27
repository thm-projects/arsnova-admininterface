var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint')
var pump = require('pump');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var jscs = require('gulp-jscs');

gulp.task('default', ['codeCheck']);

gulp.task('watch', function () {
        gulp.start('codeCheck');
        gulp.watch('./js/**/*.js', ['codeCheck'])
});

gulp.task('codeCheck', function () {
        gulp.start('lint');
        gulp.start('jscs');
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('./js/**/*.js'),
        uglify(),
        gulp.dest('dist')
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
	return gulp.src('dist/**/*.js')
		.pipe(concat('admininterface.js'))
		.pipe(gulp.dest('./dist/'));
});
