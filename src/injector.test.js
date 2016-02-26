var injector = new Injector();
function Service() {

}

function Service2(service) {
  this.service = service;
}
Service2['$inject'] = ['Service'];

function Service3(service2) {
  this.service2 = service2;
}
Service3['$inject'] = ['Service2'];

injector.register('Service', function() {
  return injector.instantiate(Service);
});
injector.register('Service2', function() {
  return injector.instantiate(Service2);
});
injector.register('Service3', function() {
  return injector.instantiate(Service3);
});

// var instance = injector.get('Service');
// var instance2 = injector.instantiate(Service2);
var instance3 = injector.get('Service3');
