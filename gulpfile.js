
var gulp = require('gulp');
var pkg = require('./package.json');
var sourcemaps = require('gulp-sourcemaps');
var date = (new Date).toISOString().substring(0,10);
var license = '/*\n * s-is version '+pkg.version+' at '+date+
    '\n * @license MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )\
    \n */\n<%= contents %> ';

gulp.task('lint', lint);
gulp.task('test', test);
gulp.task('build', gulp.series([lint, test, build]));
gulp.task('doc', gulp.series([generateDoc('html'), generateDoc('md'), generateDoc('json')]));

gulp.task('watch', function () {
  gulp.watch('lib/*.js', [lint, test]);
  // gulp.watch('lib/*.js', [lint, test, build]);
});

function test () {
  return gulp.src('test/test.js', { read: false })
    .pipe( require('gulp-mocha')({ reporter: 'nyan' }) );
}

function lint () {
  return gulp.src('lib/*.js')
    .pipe( require('gulp-eslint')() )
    .pipe( require('gulp-eslint').format() )
    .pipe( require('gulp-eslint').failAfterError() );
}

function build () {
  return gulp.src('lib/*.js')
    .pipe( require('gulp-eslint')() )
    .pipe( require('gulp-eslint').format() )
    .pipe( require('gulp-eslint').failAfterError() )
    .pipe(require('gulp-order')([ // queue of files
      'types.js',
      'strict.js',
      'helpers.js',
      'support.js',
      'platform.js',
      'is.js',
      'define.js'
    ]))
    .pipe( require('gulp-concat')('index.js') )
    .pipe( require('gulp-wrap')('/** @ignore */\n(function () {\'use strict\';\n<%= contents %>\n})()') )
    .pipe( require('gulp-wrap')(license) )
    .pipe( gulp.dest('./') )          // save .js
    .pipe( sourcemaps.init() )
    .pipe( require('gulp-uglify')({}) )
    .pipe( require('gulp-wrap')(license) )
    .pipe( require('gulp-rename')({ extname: '.min.js' }) )
    .pipe(sourcemaps.write('./'))
    .pipe( gulp.dest('./') );         // save .min.js
}

function generateDoc ( type ) {
  return function documentation () {
    var doc = require('gulp-documentation');
    return gulp.src('./index.js')
      .pipe( doc(type, {}, {
        name: pkg.name.toUpperCase(),
        version: pkg.version,
        license: pkg.license,
        date: date
      }) )
      .pipe( gulp.dest('doc') );
  }
}
