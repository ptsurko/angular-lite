
var Provide = (function() {
  var Provide = function($injector) {
    this.$injector_ = $injector;
  };

  Provide.prototype.service = function(name, service) {
    this.$injector_.register(name, service);
  };

  Provide.prototype.value = function(name, value) {
    this.service(name, value);
  };
  return Provide;
}());
