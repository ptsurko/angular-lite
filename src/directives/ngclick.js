
function NgClick() {
  return {
    scope: false,
    link: function(scope, attrs, element) {
      element.addEventListener('click', function() {
        scope.$apply(function() {
          scope.$eval(attrs[NgClick.$CLICK_ATTR]);
        });
      });
    }
  };
};
NgClick.$CLICK_ATTR = 'ng-click';
