var gulp = require('gulp'),
		zip = require('gulp-zip'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
		comb = new(require('csscomb')),
    connect = require('gulp-connect'),
    karma = require('gulp-karma'),
    docco = require("gulp-docco");

var testFiles = [
  'bower_components/flyer/index.js',
  'bower_components/jquery/jquery.js',
  'bower_components/lil-uuid/uuid.min.js',
  'scripts/*.js',
  'example/*.js',
  'test/*.js'
];

gulp.task('docs', function() {

  gulp.src('./scripts/yetu-tv-message-client.js')
    .pipe(docco())
    .pipe(gulp.dest('./docs'));

});

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('combine', function() {
  gulp.src(['./bower_components/flyer/index.js', './bower_components/lil-uuid/uuid.min.js', './scripts/yetu-tv-message-client.js'])
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
gulp.task('build', ['combine', 'csscomb', 'test', 'docs']);
