
describe('Scope', function() {
  var rootScope;

  beforeEach(function() {
    rootScope = new Scope();
  });

  it('$new creates new Scope object', function() {
    var childScope = rootScope.$new();

    expect(childScope).toEqual(jasmine.any(Object));
  });

  it('child scope should have access to parent\'s scope properties', function() {
    var childScope = rootScope.$new();
    rootScope.name = 'Root';

    expect(childScope.name).toEqual('Root');
  });

  it('child scope should override parent\'s scope properties', function() {
    rootScope.name = 'Root';
    var childScope = rootScope.$new();
    childScope.name = 'Child';

    expect(childScope.name).toEqual('Child');
  });
});

//
// var scope = new Scope();
// scope.click = function() {
//
// };
//
// scope.$watch('name', function(newValue, oldValue) {
//   debugger
// });
//
// scope.$apply(function() {
//   scope.name = {a: 1};
// });
//
// scope.$apply(function() {
//   scope.name = {a: 2};
// });
//
// // scope.name = 'John';
// // scope.surname = 'Doe';
// // console.log(scope.$eval('name + \' \' + surname'));
//
// // var scope = new Scope();
// // scope.name = '1';
// //
// // var newScope = scope.$new();
// // newScope.name = '2';
// //
// // var newNewScope = newScope.$new();
// // newNewScope.name = '3';
// //
// // console.log(scope.name);
// // console.log(newScope.name);
// // console.log(newNewScope.name);
