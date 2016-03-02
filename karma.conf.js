var isDebug = process.env.DEBUG || false;

module.exports = function(config) {
  config.set({
    browsers: [isDebug ? 'Chrome' : 'PhantomJS2'],
    frameworks: ['jasmine'],
    files: [
      'src/utils.js',
      'src/injector.js',
      'src/provide.js',
      'src/scope.js',
      'src/compile.js',
      'src/parse.js',
      'src/directive.js',
      'src/directives/ngcontroller.js',
      'src/directives/ngbind.js',
      'src/directives/ngbindattribute.js',
      'src/directives/ngbindproperty.js',
      'src/directives/ngonevent.js',
      'src/directives/ngif.js',
      'src/directives/ngrepeat.js',
      'src/angular.js',
      'src/**/*.test.js'
    ]
  });
};
