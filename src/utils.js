
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
    },
    isFunction: function(func) {
      return typeof func === 'function';
    },

    isString: function(obj) {
      return typeof obj === 'string';
    },

    isDOMNode: function(obj) {
      return obj instanceof HTMLElement;
    },

    // http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/122190#122190
    cloneObject: function(obj) {
      if (obj === null || typeof obj !== 'object' || 'isActiveClone' in obj) {
        return obj;
      }

      var temp;
      if (obj instanceof Date) {
        temp = new obj.constructor();
      } else {
        temp = obj.constructor();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj['isActiveClone'] = null;
          temp[key] = this.cloneObject_(obj[key]);
          delete obj['isActiveClone'];
        }
      }

      return temp;
    },

    // http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
    objectsEquals: function(x, y) {
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
        if (typeof x[p] !== 'object') {
          return false;
        }

        // Objects and Arrays must be tested recursively
        if (!Object.equals(x[p], y[p])) {
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
  };
}());
