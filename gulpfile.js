'use strict';

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha'),
    livereload = require('gulp-livereload'),
    args = require('minimist')(process.argv);

gulp.task('simple', function() {
    livereload.listen();
    var nodeArgs = [];
    // used to run nodemon in --debug-brk mode
    if (args.dev || args.d) {
        nodeArgs.push('--debug');
    }
    if (args['debug-brk']) {
        nodeArgs.push('--debug-brk');
    }
    return nodemon({
        script: 'examples/simple/server.js',
        ext: 'js',
        nodeArgs: nodeArgs,
        verbose: true
    }).on('restart', function() {
        livereload.reload();
    });
});

gulp.task('advanced', function() {
    livereload.listen();
    var nodeArgs = [];
    // used to run nodemon in --debug-brk mode
    if (args.dev || args.d) {
        nodeArgs.push('--debug');
    }
    if (args['debug-brk']) {
        nodeArgs.push('--debug-brk');
    }
    return nodemon({
        script: 'examples/advanced/server.js',
        ext: 'js',
        nodeArgs: nodeArgs,
        verbose: true
    }).on('restart', function() {
        livereload.reload();
    })
});

gulp.task('test', function() {
    return gulp.src('tests', {
            read: false
        })
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({
            reporter: 'nyan'
                // bail: true
        }))
        .once('end', function() {
            process.exit();
        });
});