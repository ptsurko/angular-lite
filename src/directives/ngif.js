
function NgIf($injector) {
  return {
    priority: 600,
    terminate: true,
    link: function(scope, attrs, element) {
      scope.$watch(attrs[NgIf.ATTR_NAME], function(newValue, oldValue) {

      });
    }
  };
};
NgIf.ATTR_NAME = 'ng-if';
