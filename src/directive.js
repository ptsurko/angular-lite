
var Directive = (function() {
  var DIRECTIVE_SUFFIX = 'Directive';

  function Directive($provide, $injector) {
    this.$provide_ = $provide;
    this.$injector_ = $injector;
  };
  Directive.DEFAULT_CONFIG = {
    scope: false,
    link: function() {}
  };

  Directive.prototype.init = function() {
    this.register(NgController.ATTR_NAME, NgController);
    this.register(NgBind.ATTR_NAME, NgBind);
  };

  Directive.prototype.get = function(attr, locals) {
    var directive = this.$injector_.get(attr + DIRECTIVE_SUFFIX, locals)
    if (!directive) {
      if (attr.startsWith(NgBindProperty.ATTR_NAME)) {
        var propLocals = Object.assign({}, locals, {$attr: attr});
        directive = this.$injector_.invoke(NgBindProperty, propLocals);
      } else if (attr.startsWith(NgBindAttribute.ATTR_NAME)) {
        var propLocals = Object.assign({}, locals, {$attr: attr});
        directive = this.$injector_.invoke(NgBindAttribute, propLocals);
      } else if (attr.startsWith(NgOnEvent.ATTR_NAME)) {
        var propLocals = Object.assign({}, locals, {$attr: attr});
        directive = this.$injector_.invoke(NgOnEvent, propLocals);
      }
    }
    return directive;
  };

  Directive.prototype.register = function directive(name, func) {
    this.$provide_.service(name + DIRECTIVE_SUFFIX, func);
  };
  return Directive;
}());
