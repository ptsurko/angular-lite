
function NgIf($injector) {
  return {
    priority: 600,
    terminate: true,
    link: function(scope, attrs, element) {

    }
  };
};
NgIf.ATTR_NAME = 'ng-if';
