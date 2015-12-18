/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

/**
 * Check if two arrays intersection exists
 */
exports.isIntersection = function (a, b) {
  var i;
  var c;
  if (a.length > b.length) {
    c = a;
    a = b;
    b = c;
  }
  for (i = 0; i < a.length; i++) {
    if (b.indexOf(a[i]) >= 0) {
      return true;
    }
  }
  return false;
};

/**
 * Define object size
 *
 * @param   {Object}    obj     Object
 * @return  {number}    Object size
 */
exports.size = function (obj) {
  return Object.keys(obj).length;
};

/**
 * Hash function using djb2 algorithm
 *
 * @param   {string} str Initial string
 * @return  {string} hash
 */
exports.hash = function (str) {
  // TODO Add hashing of objects
  var hash = 5381;
  var len;

  str = str.toString();
  len = str.length;

  while (len) {
    hash = (hash * 33) ^ str.charCodeAt(--len);
  }

  return (hash >>> 0).toString();
};

/**
 * Element position (isEqual checking)
 *
 * @param   {Array}   arr   Array
 * @param   {*}       item  Element item
 * @return  {number}
 */
exports.indexOf = function (arr, item) {
  var i;
  for (i = 0; i < arr.length; i++) {
    if (exports.isEqual(arr[i], item)) {
      return i;
    }
  }
  return -1;
};

exports.throttle = function (func) {
  var worked = false;
  var nextArguments;

  return function run() {
    var ctx = this; // Function context
    var cb = arguments[arguments.length - 1];
    var argumentsArray = [].slice.call(arguments);

    function nextWorker() {
      worked = false;
      if (nextArguments) {
        var args = nextArguments;
        nextArguments = null;
        run.apply(ctx, args);
        return true;
      }
      return false;
    }

    if (worked) {
      // Set as the next call
      nextArguments = arguments;
      return;
    }

    worked = true;

    var cbWrapper = function () {
      if (!nextWorker() && typeof cb === 'function') {
        cb.apply(null, arguments);
      }
    };

    if (typeof cb === 'function') {
      argumentsArray[argumentsArray.length - 1] = cbWrapper;
      func.apply(this, argumentsArray.concat(nextWorker));
    } else {
      func.apply(this, argumentsArray.concat(cbWrapper, nextWorker));
    }
  };
};

exports.parseValueFromEvent = function (event) {
  if (event && typeof event === 'object' && event.target && ['INPUT', 'TEXTAREA'].indexOf(event.target.tagName) >= 0) {
    switch (event.target.type) {
      case 'checkbox':
        return event.target.checked;
    }
    return event.target.value;
  }
  return event;
};

exports.decorate = function (obj, decor) {
  function Decorator() {
    exports.assign(this, decor);

    for (var i in obj) {
      if (typeof obj[i] === 'function' && !decor[i]) {
        this[i] = obj[i].bind(obj);
      }
    }
  }
  Decorator.prototype = obj;
  Decorator.prototype.constructor = Decorator;
  return new Decorator();
};

/**
 * Checking at equals params
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
exports.isEqual = function (a, b) {
  if (
    a === null ||
    b === null ||
    a === undefined ||
    b === undefined ||
    typeof a === 'function' ||
    typeof b === 'function' ||
    a instanceof RegExp ||
    b instanceof RegExp
  ) {
    return a === b;
  }
  if (a === b || a.valueOf() === b.valueOf() || a !== a && b !== b) {
    return true;
  }
  if (Array.isArray(a) && (!Array.isArray(b) || a.length !== b.length) || !(typeof a === 'object')) {
    return false;
  }

  var p = Object.keys(a);
  return Object.keys(b).every(function (i) {
      return p.indexOf(i) >= 0;
    }) && p.every(function (i) {
      return exports.isEqual(a[i], b[i]);
    });
};

exports.assign = function (result) {
  for (var i = 1; i < arguments.length; i++) {
    for (var j in arguments[i]) {
      result[j] = arguments[i][j];
    }
  }
  return result;
};

/**
 * Clone object
 *
 * @param obj
 * @returns {*}
 */
exports.clone = function (obj) {
  if (!(obj instanceof Object) || obj instanceof Date || obj instanceof Function || obj instanceof RegExp) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.slice(0);
  }

  var cloned = {};
  for (var i in obj) {
    cloned[i] = obj[i];
  }
  return cloned;
};

exports.cloneDeep = function (obj) {
  var i;
  var cloned;

  if (!(obj instanceof Object) || obj instanceof Date || obj instanceof Function || obj instanceof RegExp) {
    return obj;
  }

  if (Array.isArray(obj)) {
    cloned = [];
    for (i = 0; i < obj.length; i++) {
      cloned.push(this.cloneDeep(obj[i]));
    }
  } else {
    cloned = {};
    for (i in obj) {
      cloned[i] = this.cloneDeep(obj[i]);
    }
  }
  return cloned;
};

exports.isEmpty = function (obj) {
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0;
};

exports.isDefined = function (value) {
  return value !== null && value !== undefined && value !== '';
};

exports.forEach = function (obj, func, ctx) {
  for (var i in obj) {
    func.call(ctx, obj[i], i);
  }
};

exports.pluck = function (arr, field) {
  return arr.map(function (item) {
    return item[field];
  });
};

exports.find = function (arr, func) {
  for (var i in arr) {
    if (func(arr[i], i)) {
      return arr[i];
    }
  }
  return null;
};

exports.findIndex = function (obj, func) {
  for (var i in obj) {
    if (func(obj[i], i)) {
      return i;
    }
  }
  return -1;
};

exports.omit = function (obj, predicate) {
  var result = {};
  for (var i in obj) {
    if (
      (typeof predicate === 'string' && predicate !== i) ||
      (Array.isArray(predicate) && predicate.indexOf(i) < 0) ||
      (typeof predicate === 'function' && !predicate(obj[i], i))
    ) {
      result[i] = obj[i];
    }
  }
  return result;
};

exports.escape = function (string) {
  var reUnescaped = /[&<>"'`]/g;
  var escapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '`': '&#96;'
  };
  string = string === null ? '' : string.toString();
  if (string && reUnescaped.test(string)) {
    return string.replace(reUnescaped, function (chr) {
      return escapes[chr];
    });
  }
  return string;
};

exports.zipObject = function (keys, values) {
  var result = {};
  for (var i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
};

exports.pick = function (obj, keys) {
  return keys.reduce(function (result, key) {
    result[key] = obj[key];
    return result;
  }, {});
};

exports.reduce = function (obj, func, value) {
  for (var i in obj) {
    value = func(value, obj[i], i);
  }
  return value;
};

exports.union = function () {
  var elements = {};
  var result = [];
  var i;

  for (i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {
      elements[arguments[i][j]] = arguments[i][j];
    }
  }
  for (i in elements) {
    result.push(elements[i]);
  }
  return result;
};

exports.at = function (obj, keys) {
  var result = [];
  if (!Array.isArray(keys)) {
    return [obj[keys]];
  }
  for (var i = 0; i < keys.length; i++) {
    result.push(obj[keys[i]]);
  }
  return result;
};

exports.pairs = function (obj) {
  var result = [];
  for (var i in obj) {
    result.push([i, obj[i]]);
  }
  return result;
};
