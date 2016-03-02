
function NgBindAttribute($attr) {
  return {
    scope: false,
    link: function(scope, attrs, element) {
      var attributeName = $attr.replace(NgBindAttribute.ATTR_NAME, '');

      scope.$watch(attrs[$attr], function(newValue) {
        element.setAttribute(attributeName, scope.$eval(attrs[$attr]));
      });
    }
  };
};
// TODO: rename to ng-prop
NgBindAttribute.ATTR_NAME = 'ng-attr.';
