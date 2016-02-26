
//TODO: add local dependencies (scope, element, etc.)
//TODO: add support for providers with $get method - to allow configation of service before resolving
var Injector = (function() {
  function Injector() {
    this.registry_ = {};
    this.cache_ = [];
  }
  Injector.INJECT_PROP = '$inject';

  Injector.prototype.register = function(name, value) {
    this.registry_[name] = value;
  };

  Injector.prototype.has = function(name) {
    return this.registry_[name] != null;
  };

  Injector.prototype.get = function(name, locals) {
    var registered = this.registry_[name];
    if (registered) {
      if (typeof registered === "function") {
        return this.invoke(registered, locals);
      } else {
        return registered;
      }
    } else {
      return null;
    }
  };

  Injector.prototype.invoke = function(factory, locals) {
    var injectionArgs = this.getInjectionArgs_(factory, locals);
    if (factory.constructor) {
      injectionArgs.unshift(null);
      return new (Function.prototype.bind.apply(factory, injectionArgs))();
    } else {
      var self = {}
      var result = factory.apply(self, this.getInjectionArgs_(factory, locals));
      return result || self;
    }
  };

  Injector.prototype.annotate = function(fn) {
    if (fn[Injector.INJECT_PROP]) {
      return fn[Injector.INJECT_PROP];
    } else {
      var matches = fn.toString()
          .replace(/\/\*[\s\S]*?\*\//gm, '')
          .match(/\(([^\)]*)\)/);
      if (matches && matches[1]) {
        return matches[1].split(',').map(function (match) {
          return match.trim();
        });
      }
      return [];
    }
  };

  // Injector.prototype.instantiate = function(ctor, locals) {
  //   var args = this.getInjectionArgs_(ctor, locals);
  //   // http://stackoverflow.com/a/8843181
  //   // // Empty object at position 0 is ignored for invocation with `new`, but required.
  //   // args.unshift(null);
  //   // return new (Function.prototype.bind.apply(ctor, args))();
  //   var newObj = Object.create(ctor.prototype);
  //   var resultObj = ctor.apply(newObj, args);
  //   return resultObj || newObj;
  // };

  Injector.prototype.getInjectionArgs_ = function(factory, locals) {
    locals = locals || {};
    return this.annotate(factory).map(function(arg) {
      return locals[arg] || this.get(arg);
    }.bind(this));
  };
  return Injector;
}())
