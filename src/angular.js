
var angular = (function() {
  var $injector = new Injector();
  var $rootScope = new Scope();
  var $provide = new Provide($injector);

  $provide.value('$injector', $injector);
  $provide.value('$rootScope', $rootScope);
  $provide.value('$provide', $provide);
  $provide.service('$compile', Compile);
  $provide.service('$directive', Directive);

  var $compile = $injector.get('$compile');
  var $directive = $injector.get('$directive');

  $directive.init();

  return {
    service: service,
    value: value,
    controller: controller,
    directive: directive,
    bootstrap: function() {
      $compile.compile(document.body)($rootScope);
      $rootScope.$digest();
      return this;
    },
    config: function(configurator) {
      $injector.invoke(configurator);
      return this;
    }
    // TODO: add module system
  };

  function service(name, func) {
    $provide.service(name, func);
    return this;
  }

  function value(name, value) {
    $provide.value(name, value);
    return this;
  }

  function controller(name, func) {
    $provide.service(name + NgController.$CONTROLLER_SUFFIX, func);
    return this;
  }

  function directive(name, func) {
    $directive.register(name, func);
    return this;
  }
}());
