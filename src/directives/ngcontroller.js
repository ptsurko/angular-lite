
function NgController($injector) {
  return {
    scope: true,
    link: function(scope, attrs, element) {
      var controllerName = attrs[NgController.ATTR_NAME];
      $injector.get(controllerName + NgController.$CONTROLLER_SUFFIX, {'$scope': scope});
    }
  };
};
NgController.ATTR_NAME = 'ng-controller';
NgController.$CONTROLLER_SUFFIX = 'Controller';
