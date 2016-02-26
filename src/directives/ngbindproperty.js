
//TODO: Add directive for binding directly to property ng-bind-aria-role for example
function NgBindProperty($attr) {
  return {
    scope: false,
    link: function(scope, attrs, element) {
      var propertyName = utils.toCamelCase($attr.replace(NgBindProperty.ATTR_NAME, ''));
      element[propertyName] = scope.$eval(attrs[$attr]);

      scope.$watch(attrs[$attr], function(newValue) {
        element[propertyName] = scope.$eval(attrs[$attr]);
      });
    }
  };
};
//TODO: rename to ng-prop
NgBindProperty.ATTR_NAME = 'ng-prop.';
