
function NgController($injector) {
  return {
    scope: true,
    link: function(scope, attrs, element) {
      var re = new RegExp(/(\w+)(?:\s+as\s+(\w+))?/, 'i');
      if (!re.test(attrs[NgController.ATTR_NAME])) {
        throw new Error('Unable to parse controller name: ' + attrs[NgController.ATTR_NAME]);
      }

      var match = re.exec(attrs[NgController.ATTR_NAME]);
      var controllerName = match[1];
      var controller = $injector.get(controllerName + NgController.$CONTROLLER_SUFFIX, {'$scope': scope});
      if (match.length > 1) {
        var controllerAs = match[2];
        scope[controllerAs] = controller;
      }
    }
  };
};
NgController.ATTR_NAME = 'ng-controller';
NgController.$CONTROLLER_SUFFIX = 'Controller';
