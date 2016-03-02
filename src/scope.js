//TODO: add isolated scope

var Scope = (function() {
  var globalIndex = 0;

  function Scope(parent) {
    this.$$watchers = [];
    this.$$children = [];
    this.$parent = parent;
    this.$$destroyables_ = [];
    this.id = globalIndex++;
  }
  Scope.maxDigestCycles = 10;

  Scope.prototype.$new = function() {
    var ScopeCtor = function(parent) {
      Scope.call(this, parent);
    };
    ScopeCtor.prototype = this;
    var newScope = new ScopeCtor(this);
    this.$$children.push(newScope);
    return newScope;
  };

  Scope.prototype.$destroy = function() {
    if (this.$parent) {
      var scopeInParentIndex = this.$parent.$$children.indexOf(this);
      this.$parent.$$children.splice(scopeInParentIndex, 1);
    }
    this.$watchers = null;
    this.$parent = null;
    this.$$children.forEach(function(childScope) {
      childScope.$parent = null;
      childScope.$destroy();
    });
    this.$$destroyables_.forEach(function(callback) {
      callback();
    });

    this.$$children = null;
  };

  Scope.prototype.$addOnDestroy = function(callback) {
    this.$$destroyables_.push(callback);
  };

  // Scope.prototype.$new = function() {
  //   var args = [null, this];
  //   debugger
  //   var ctor = Function.prototype.bind.apply(Scope, args);
  //   // Is not working as ctor prototype is undefined
  //   ctor.prototype = this;
  //   return new ctor();
  // };

  Scope.prototype.$eval = function(expr) {
    if (expr) {
      if (utils.isFunction(expr)) {
        return expr.call(this);
      } else {
        // With deprecation - http://www.2ality.com/2011/06/with-statement.html
        with(this) {
          return eval(expr);
        }
      }
    }
  };

  Scope.prototype.$watch = function(expr, callback) {
    this.$$watchers.push({
      expr: expr,
      callback: callback,
      last: undefined
    });
  };

  Scope.prototype.$apply = function(callback) {
    try {
      this.$eval(callback);
    } finally {
      var rootScope = this;
      while (rootScope.$parent) {
        rootScope = rootScope.$parent;
      }
      rootScope.$digest();
    }
  };

  Scope.prototype.$digest = function() {
    var dirty;
    var cycleIndex = 0
    do {
      if (cycleIndex > Scope.maxDigestCycles) {
        break;
      }

      dirty = false; //do-while cysle is necessary to cover dependent properties.
      this.$$watchers.forEach(function(watcher) {
        var currentValue = this.$eval(watcher.expr);
        if (!utils.objectsEquals(currentValue, watcher.last)) {
          watcher.callback(currentValue, watcher.last);
          watcher.last = utils.cloneObject(currentValue);
          dirty = true;
        }
      }.bind(this));
      cycleIndex++;
    } while(dirty);

    this.$$children.forEach(function(childScope) {
      childScope.$digest();
    });
  };

  return Scope;
}());
