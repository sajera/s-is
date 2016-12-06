
var gulp = require('gulp');

function src ( name ) {
    return gulp.src([ 'lib/*.js'])
        .pipe(require('gulp-order')([ // queue of files
            'types.js',
            'strict.js',
            'helpers.js',
            'support.js',
            'platform.js',
            'is.js',
            'define.js'
        ]))
        .pipe(require('gulp-concat')(name||'declare.js'))
        .pipe(require('gulp-wrap')(
            '(function () {\'use strict\';\n<%= contents %>})()'
        ))
}

gulp.task('concat', function (cb) {
    return src('is.js')
        .pipe(gulp.dest('./'));
});

gulp.task('minify', function (cb) {
    return src('is.min.js')
        .pipe(require('gulp-uglify')())
        .pipe(require('gulp-wrap')(
            '/**\
            \n * s-is\
            \n * MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )\
            \n */<%= contents %> '
        ))
        .pipe(gulp.dest('./'));
});
