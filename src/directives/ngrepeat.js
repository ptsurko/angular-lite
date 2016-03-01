
function NgRepeat($injector) {
  return {
    priority: 1000,
    terminate: true,
    link: function(scope, attrs, element) {

    }
  };
};
NgRepeat.ATTR_NAME = 'ng-repeat';
