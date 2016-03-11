var gulp = require('gulp');
var Server = require('karma').Server;
var process = require('process');
var DEBUG = process.env.DEBUG;

/**
 * Run test once and exit
 */
gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: !DEBUG
  }, done).start();
});
