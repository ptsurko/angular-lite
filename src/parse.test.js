
describe('Parse', function() {
  var parse;
  beforeEach(function() {
    parse = new Parse();
  });

  it('can parse an interger', function() {
    var fn = parse.parse('42');
    expect(fn).toBeDefined();
    expect(fn()).toEqual(42);
  });

  it('can parse float', function() {
    var fn = parse.parse('42.2');
    expect(fn()).toEqual(42.2);
  });

  it('can parse float < 1', function() {
    var fn = parse.parse('.2');
    expect(fn()).toEqual(0.2);
  });

  it('can parse string single quoted', function() {
    var fn = parse.parse('\'text\'');
    expect(fn()).toEqual('text');
  });

  it('can parse string double quoted', function() {
    var fn = parse.parse('"text"');
    expect(fn()).toEqual('text');
  });

  it('can parse null value', function() {
    var fn = parse.parse('null');
    expect(fn()).toBe(null);
  });

  it('can parse boolean value', function() {
    var fn = parse.parse('true');
    expect(fn()).toBe(true);
  });

  it('can parse empty array', function() {
    var fn = parse.parse('[]');
    expect(fn()).toEqual([]);
  });

  it('can parse array', function() {
    var fn = parse.parse('[1, "str"]');
    expect(fn()).toEqual([1, 'str']);
  });

  it('can parse empty object', function() {
    var fn = parse.parse('{}');
    expect(fn()).toEqual({});
  });

  it('can parse object', function() {
    var fn = parse.parse('{a: 1, "b": "test"}');
    expect(fn()).toEqual({a: 1, b: 'test'});
  });

  it('can parse object with string key', function() {
    var fn = parse.parse('{"a test": 1, "b-test": "test"}');
    expect(fn()).toEqual({'a test': 1, 'b-test': 'test'});
  });

  it('can parse complex object', function() {
    var fn = parse.parse('{a: 1, "obj": {a:1, b:[1,2,"3"]}}');
    expect(fn()).toEqual({a: 1, 'obj': {a: 1, b: [1, 2, '3']}});
  });

  it('can lookup attribute from scope object', function() {
    var fn = parse.parse('key');
    expect(fn({key: 20})).toEqual(20);
  });
});
