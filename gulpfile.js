var gulp = require('gulp'),
		zip = require('gulp-zip'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
		comb = new(require('csscomb')),
    connect = require('gulp-connect');

gulp.task('combine', function() {
  gulp.src(['./bower_components/flyer/index.js', './scripts/yetu-tv-message-client.js'])
    .pipe(concat('yetu-tv-message-client-min.js'))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('dist'));
});

//serves the page on localhost:8080
gulp.task('connect', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('csscomb', function() {
	comb.processPath('example/styles');
});

gulp.task('run', ['connect']);
gulp.task('build', ['combine', 'csscomb']);
