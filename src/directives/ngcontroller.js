
function NgController($injector) {
  return {
    scope: true,
    link: function(scope, attrs, element) {
      var controllerName = attrs[NgController.$CONTROLLER_ATTR];
      var controller = $injector.get(controllerName + NgController.$CONTROLLER_SUFFIX, {'$scope': scope});

    }
  };
};
NgController.$CONTROLLER_ATTR = 'ng-controller';
NgController.$CONTROLLER_SUFFIX = 'Controller';
