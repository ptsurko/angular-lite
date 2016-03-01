
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

  Compile.prototype.compile = function(node) {
    if (node.nodeType === NODE_TYPE.ELEMENT) {
      var directives = [];
      var attrs = {};

      Array.prototype.forEach.call(node.attributes, function(attr) {
        var directive = this.$directive_.get(attr.nodeName);
        if (directive) {
          directives.push(Object.assign({}, Directive.DEFAULT_CONFIG, directive));
          attrs[attr.nodeName] = attr.nodeValue;
        }
      }.bind(this));

      var childLinkFunctions = [];
      Array.prototype.forEach.call(node.childNodes, function(child) {
        var linkFunc = this.compile(child);
        if (linkFunc) {
          childLinkFunctions.push(linkFunc);
        }
      }.bind(this));

      return function link(scope) {
        directives.forEach(function(directive) {
          this.linkDirective_(directive, node, attrs, scope);
        }.bind(this));

        var nodeScope = node[SCOPE_PROPERTY] || scope;
        childLinkFunctions.forEach(function(linkFunc) {
          linkFunc(nodeScope);
        });
      }.bind(this);
    }
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
