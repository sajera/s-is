
var gulp = require('gulp');
var wrapper = require('gulp-wrap');
var anonymous = '/** @ignore */\n(function () {\'use strict\';\n<%= contents %>\n})()';
var license = '/*\n * s-is\
    \n * @license MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )\
    \n */\n<%= contents %> ';

function src ( name ) {
    return gulp.src(['lib/*.js'])
        .pipe(require('gulp-order')([ // queue of files
            'types.js',
            'strict.js',
            'helpers.js',
            'support.js',
            'platform.js',
            'is.js',
            'define.js'
        ]))
        .pipe( require('gulp-concat')(name||'is.js') )
        .pipe( wrapper(anonymous) );
}

gulp.task('concat', function () {
    return src('s-is.js')
        .pipe( wrapper(license) )
        .pipe( gulp.dest('./') );
});

gulp.task('minify', function () {
    return src('s-is.min.js')
        .pipe( require('gulp-uglify')() )
        .pipe( wrapper(license) )
        .pipe( gulp.dest('./') );
});

gulp.task('lint', function () {
    return gulp.src(['s-is.js','s-is.min.js'])
        .pipe( require('gulp-eslint')() )
        .pipe( require('gulp-eslint').format() )
        .pipe( require('gulp-eslint').failAfterError() );
});

gulp.task('test', function ( done ) {
    return gulp.src('test/test.js', {read: false})
        .pipe( require('gulp-mocha')({reporter: 'nyan'}) );
});



gulp.task('build', ['concat', 'minify'], function () {
    gulp.start('lint');
    gulp.start('test');
    gulp.start('doc');
});

gulp.task('watch', ['build'], function () {
    
    gulp.watch('lib/*.js', ['concat', 'minify']);

});

gulp.task('doc', /*['concat'],*/ function () {
    var pkg = require('./package.json');
    var doc = require('gulp-documentation');
    return gulp.src('s-is.js')
        .pipe( doc('html', {}, {
            name: pkg.name.toUpperCase(),
            version: pkg.version,
            license: pkg.license
        }) )
        .pipe( gulp.dest('doc') );
});

gulp.task('doc-md', function () {
    var pkg = require('./package.json');
    var doc = require('gulp-documentation');
    return gulp.src('s-is.js')
        .pipe( doc('md', {}, {
            name: pkg.name.toUpperCase(),
            version: pkg.version,
            license: pkg.license
        }) )
        .pipe( gulp.dest('doc') );
});