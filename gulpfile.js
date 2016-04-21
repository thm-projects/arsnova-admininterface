var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint')
var pump = require('pump');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');

gulp.task('default', function () {
	gulp.start('lint');
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

gulp.task('concat', function () {
	return gulp.src('dist/**/*.js')
		.pipe(concat('admininterface.js'))
		.pipe(gulp.dest('./dist/'));
});
