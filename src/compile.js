
var Compile = (function() {
  var SCOPE_PROPERTY = '$scope';

  var NODE_TYPE = {
    ELEMENT: 1,
    TEXT: 3
  };

  function Compile($injector, $directive) {
    this.$injector_ = $injector;
    this.$directive_ = $directive;
  };

  Compile.prototype.compile = function(node, scope) {
    if (node.nodeType === NODE_TYPE.ELEMENT) {
      var directives = [];
      var attrs = {};
      Array.prototype.forEach.call(node.attributes, function(attr) {
        var directive = this.$directive_.get(attr.nodeName);
        if (directive) {
          directives.push(directive);
          attrs[attr.nodeName] = attr.nodeValue;
        }
      }.bind(this));

      // //TODO: using only one scope for element
      directives.forEach(function(directive) {
        var directiveConfig = Object.assign({}, Directive.DEFAULT_CONFIG, directive)
        this.linkDirective_(directiveConfig, node, attrs, scope);
      }.bind(this));
    }

    var nodeScope = node[SCOPE_PROPERTY] || scope;
    Array.prototype.forEach.call(node.childNodes, function(child) {
      this.compile(child, nodeScope);
    }.bind(this));
  };

  Compile.prototype.linkDirective_ = function(dir, element, attrs, scope) {
    var nodeScope = dir.scope ? scope.$new() : scope;
    element[SCOPE_PROPERTY] = nodeScope;

    var controller;
    if (dir.controller) {
      controller = this.$injector_.invoke(dir.controller, {'$scope': nodeScope});
    }

    dir.link(nodeScope, attrs, element, controller);

    if (controller && controller.$onInit) {
      controller.$onInit();
    }
  };
  return Compile;
}());
