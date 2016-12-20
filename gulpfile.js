
var gulp = require('gulp');
var wrapper = require('gulp-wrap');
var anonymous = '(function () {\'use strict\';\n<%= contents %>\n})()';
var license = '/**\n * s-is\
    \n * MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )\
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
        .pipe( require('gulp-concat')(name||'declare.js') )
        .pipe( wrapper(anonymous) );
}

gulp.task('concat', function () {
    return src('is.js')
        .pipe( wrapper(license) )
        .pipe( gulp.dest('./') );
});

gulp.task('minify', function () {
    return src('is.min.js')
        .pipe( require('gulp-uglify')() )
        .pipe( wrapper(license) )
        .pipe( gulp.dest('./') );
});

gulp.task('build', ['concat', 'minify'], function () {
    gulp.start('lint');
    gulp.start('test');
});

gulp.task('watch', ['build'], function () {
    
    gulp.watch('lib/*.js', ['concat', 'minify']);

});

gulp.task('lint', function () {
    return gulp.src(['is.js','is.min.js'])
        .pipe( require('gulp-eslint')() )
        .pipe( require('gulp-eslint').format() )
        .pipe( require('gulp-eslint').failAfterError() );
});

gulp.task('test', function ( done ) {
    return gulp.src('test/test.js', {read: false})
        .pipe( require('gulp-mocha')({reporter: 'nyan'}) );
});