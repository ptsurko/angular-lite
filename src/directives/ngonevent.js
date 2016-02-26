
function NgOnEvent($attr) {
  return {
    scope: false,
    link: function(scope, attrs, element) {
      var eventName = $attr.replace(NgOnEvent.ATTR_NAME, '');
      var expression = attrs[$attr];

      element.addEventListener(eventName, function() {
        scope.$apply(function() {
          scope.$eval(expression);
        });
      });
    }
  };
};
NgOnEvent.ATTR_NAME = 'ng-on.';
