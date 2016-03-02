
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
    if (utils.isString(node)) {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = node;
      if (tempDiv.childNodes.length > 1) {
        throw new Error('Template can have only one root element.');
      }

      return this.compile(tempDiv.childNodes[0]);
    } else if (utils.isDOMNode(node)) {
      if (node.nodeType === NODE_TYPE.ELEMENT) {
        return this.compileElement_(node);
      }
    }
  };

  Compile.prototype.compileElement_ = function(element) {
    var directives = this.getElementDirectives_(element);
    var attrs = this.getElementAttributes_(element);

    var childLinkFunctions = [];
    Array.prototype.forEach.call(element.childNodes, function(child) {
      var linkFunc = this.compile(child);
      if (linkFunc) {
        childLinkFunctions.push(linkFunc);
      }
    }.bind(this));

    return function link(scope) {
      var index = 0;

      var createNewScope = directives.reduce(function(createNewScope, dir) {
        if (createNewScope && dir.scope) {
          throw new Error('Element can have only one scope');
        }
        return createNewScope || dir.scope;
      }, false);

      var elementScope = createNewScope ? scope.$new() : scope;
      element[SCOPE_PROPERTY] = elementScope;

      while (index < directives.length) {
        var directive = directives[index++];
        this.linkDirective_(directive, element, attrs, elementScope);
        if (directive.terminate) {
          break;
        }
      }

      childLinkFunctions.forEach(function(linkFunc) {
        linkFunc(elementScope);
      });

      return element;
    }.bind(this);
  };

  Compile.prototype.linkDirective_ = function(dir, element, attrs, scope) {
    var controller;
    if (dir.template) {
      var templateLink = this.compile(dir.template);
      var templateEl = templateLink(scope);

      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(templateEl);
    }

    if (dir.controller) {
      controller = this.$injector_.invoke(dir.controller, {'$scope': scope});
    }

    dir.link(scope, attrs, element, controller);

    if (controller && controller.$onInit) {
      controller.$onInit();
    }
  };

  Compile.prototype.getElementDirectives_ = function(element) {
    var directives = Array.prototype.reduce.call(element.attributes, function(directives, attr) {
      var directive = this.$directive_.get(attr.nodeName);
      if (directive) {
        directives.push(Object.assign({}, Directive.DEFAULT_CONFIG, directive));
      }
      return directives;
    }.bind(this), []);
    directives.sort(function(d1, d2) {
      return d2.priority - d1.priority;
    });

    return directives;
  };

  Compile.prototype.getElementAttributes_ = function(element) {
    return Array.prototype.reduce.call(element.attributes, function(attrs, attr) {
      attrs[attr.nodeName] = attr.nodeValue;
      return attrs;
    }, []);
  };
  return Compile;
}());
