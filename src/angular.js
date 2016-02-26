
var angular = (function() {
  var $injector = new Injector();
  var $rootScope = new Scope();
  var $provide = new Provide($injector);

  $provide.value('$injector', $injector);
  $provide.value('$rootScope', $rootScope);
  $provide.value('$provide', $provide);
  $provide.service('$compile', Compile);

  var $compile = $injector.get('$compile');

  directive(NgController.$CONTROLLER_ATTR, NgController);
  directive(NgBind.$BIND_ATTR, NgBind);
  directive(NgClick.$CLICK_ATTR, NgClick);

  return {
    service: service,
    value: value,
    controller: controller,
    directive: directive,
    bootstrap: function() {
      $compile.compile(document.body, $rootScope);
      return this;
    },
    config: function(configurator) {
      $injector.invoke(configurator);
      return this;
    }
    //TODO: add module system
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
    $provide.service(name + Compile.$DIRECTIVE_SUFFIX, func);
    return this;
  }
}());
