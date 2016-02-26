
var Compile = (function() {
  var SCOPE_PROPERTY = '$scope';
  var DIRECTIVE_PROPERTY = '$scope';

  var NODE_TYPE = {
    ELEMENT: 1,
    TEXT: 3
  };

  function Compile($injector) {
    this.$injector_ = $injector;
  };
  Compile.$DIRECTIVE_SUFFIX = 'Directive';
  Compile.$DIRECTIVE_DEFAULT = {
    scope: false,
    link: function() {}
  }

  Compile.prototype.compile = function(node, scope) {
    if (node.nodeType == NODE_TYPE.ELEMENT) {
      var attrs = this.getElementAttributesWithDirective_(node);
      var directives = [];
      for (var attr in attrs) {
        directives.push(this.$injector_.get(attr + Compile.$DIRECTIVE_SUFFIX));
      }

      //TODO: using only one scope for element
      directives.forEach(function(directive) {
        var dir = Object.assign({}, Compile.$DIRECTIVE_DEFAULT, directive)
        this.linkDirective_(dir, node, attrs, scope);
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

  Compile.prototype.getElementAttributesWithDirective_ = function(el) {
    return Array.prototype.reduce.call(el.attributes, function(result, attr) {
      if (this.$injector_.has(attr.nodeName + Compile.$DIRECTIVE_SUFFIX)) {
        result[attr.nodeName] = attr.nodeValue;
      }
      return result;
    }.bind(this), {});
  };
  return Compile;
}());
