
function NgBind() {
  return {
    scope: false,
    link: function(scope, attrs, element) {
      var value = scope.$eval(attrs[NgBind.$BIND_ATTR]);
      setValue(element, value);

      scope.$watch(attrs[NgBind.$BIND_ATTR], function(newValue) {
        setValue(element, newValue);
      });

      function setValue(element, value) {
        if (element.nodeType == "INPUT") {
          //TODO: consider to add binding to appropriate input property
        } else {
          element.innerText = value;
        }
      }
    }
  };
};
NgBind.$BIND_ATTR = 'ng-bind';
