var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha');

gulp.task('simple', function() {
    return nodemon({
        script: 'examples/simple/server.js',
        ext: 'js',
        // nodeArgs: nodeArgs,
        verbose: true,
        // ignore: [options.src + '/angularApp/*']
    })
});

gulp.task('advanced', function() {
    return nodemon({
        script: 'examples/advanced/server.js',
        ext: 'js',
        // nodeArgs: nodeArgs,
        verbose: true,
        // ignore: [options.src + '/angularApp/*']
    })
});

gulp.task('test', function() {
    return gulp.src('tests', {
            read: false
        })
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({
            reporter: 'nyan',
            bail: true
        }));
});