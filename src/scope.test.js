
var scope = new Scope();
scope.click = function() {

};

scope.$watch('name', function(newValue, oldValue) {
  debugger
});

scope.$apply(function() {
  scope.name = {a: 1};
});

scope.$apply(function() {
  scope.name = {a: 2};
});

// scope.name = 'John';
// scope.surname = 'Doe';
// console.log(scope.$eval('name + \' \' + surname'));

// var scope = new Scope();
// scope.name = '1';
//
// var newScope = scope.$new();
// newScope.name = '2';
//
// var newNewScope = newScope.$new();
// newNewScope.name = '3';
//
// console.log(scope.name);
// console.log(newScope.name);
// console.log(newNewScope.name);
