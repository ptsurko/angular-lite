
var utils = (function() {
  return {
    toCamelCase: function(string) {
      return string.split('-').map(function(str, index) {
        if (index > 0) {
          return str.replace(/^[\w]/, function(char) {
            return char.toUpperCase();
          });
        }
        return str;
      }).join('');
    }
  }
}());
