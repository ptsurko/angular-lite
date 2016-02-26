//TODO: add isolated scope

var Scope = (function() {
  var globalIndex = 0;

  function Scope(parent) {
    this.$$watchers = [];
    this.$$children = [];
    this.$parent = parent;
    this.id = globalIndex++;
  }

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
    this.$$children = null;

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
      if (isFunction(expr)) {
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
      last: cloneObject(this.$eval(expr))
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
    do {
      dirty = false; //do-while cysle is necessary to cover dependent properties.
      this.$$watchers.forEach(function(watcher) {
        var currentValue = this.$eval(watcher.expr);
        if (!objectsEquals(currentValue, watcher.last)) {
          watcher.callback(currentValue, watcher.last);
          watcher.last = currentValue;
          dirty = true;
        }
      }.bind(this));
    } while(dirty);

    this.$$children.forEach(function(childScope) {
      childScope.$digest();
    });
  };

  function isFunction(func) {
    return typeof func === "function";
  }

  // http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/122190#122190
  function cloneObject(obj) {
    if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
    return obj;

    if (obj instanceof Date)
    var temp = new obj.constructor(); //or new Date(obj);
    else
    var temp = obj.constructor();

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj['isActiveClone'] = null;
        temp[key] = this.cloneObject_(obj[key]);
        delete obj['isActiveClone'];
      }
    }

    return temp;
  }

  // http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
  function objectsEquals(x, y) {
    // if both x and y are null or undefined and exactly the same
    if (x === y) {
      return true;
    }

    // if they are not strictly equal, they both need to be Objects
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.
    if (!(x instanceof Object) || !(y instanceof Object) ||
        x.constructor !== y.constructor) {
      return false;
    }

    for (var p in x) {
      // other properties were tested using x.constructor === y.constructor
      if (!x.hasOwnProperty(p)) {
        continue;
      }

      // allows to compare x[p] and y[p] when set to undefined
      if (!y.hasOwnProperty(p)) {
        return false;
      }

      // if they have the same strict value or identity then they are equal
      if (x[p] === y[p]) {
        continue;
      }

      // Numbers, Strings, Functions, Booleans must be strictly equal
      if (typeof(x[p]) !== "object") {
        return false;
      }

      // Objects and Arrays must be tested recursively
      if (!Object.equals(x[p],  y[p])) {
        return false;
      }
    }

    for (p in y) {
      // allows x[p] to be set to undefined
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        return false;
      }
    }
    return true;
  }

  return Scope;
}());
