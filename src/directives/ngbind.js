
function NgBind() {
  return {
    scope: false,
    link: function(scope, attrs, element) {
      scope.$watch(attrs[NgBind.ATTR_NAME], function(newValue) {
        setValue(element, newValue);
      });

      function setValue(element, value) {
        if (element.nodeType === 'INPUT') {
          // TODO: consider to add binding to appropriate input property
        } else {
          element.innerText = value;
        }
      }
    }
  };
};
NgBind.ATTR_NAME = 'ng-bind';
