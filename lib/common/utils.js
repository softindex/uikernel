"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIntersection = isIntersection;
exports.size = size;
exports.indexOf = indexOf;
exports.throttle = throttle;
exports.parseValueFromEvent = parseValueFromEvent;
exports.Decorator = Decorator;
exports.decorate = decorate;
exports.isEqual = isEqual;
exports.clone = clone;
exports.cloneDeep = cloneDeep;
exports.isEmpty = isEmpty;
exports.isDefined = isDefined;
exports.forEach = forEach;
exports.pluck = pluck;
exports.find = find;
exports.findIndex = findIndex;
exports.omit = omit;
exports.escape = escape;
exports.zipObject = zipObject;
exports.pick = pick;
exports.mapKeys = mapKeys;
exports.reduce = reduce;
exports.reduceMap = reduceMap;
exports.union = union;
exports.at = at;
exports.pairs = pairs;
exports.toDate = toDate;
exports.without = without;
exports.last = last;
exports.getRecordChanges = getRecordChanges;
exports.getStack = getStack;
exports.warn = warn;
exports.toEncodedString = toEncodedString;
exports.asyncHandler = asyncHandler;
exports.parents = parents;
exports.parseJson = parseJson;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ThrottleError = _interopRequireDefault(require("./ThrottleError"));

var _ArgumentsError = _interopRequireDefault(require("./ArgumentsError"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function baseClone(obj, isDeep) {
  var cloned;
  var es6types = ['[object Set]', '[object WeakSet]', '[object Map]', '[object WeakMap]'];

  if (!(obj instanceof Object) || obj instanceof Date || obj instanceof Function || obj instanceof RegExp) {
    return obj;
  }

  if (Array.isArray(obj)) {
    cloned = [];

    var _iterator = _createForOfIteratorHelper(obj),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        cloned.push(isDeep ? baseClone(el, true) : el);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else if (es6types.includes(obj.toString())) {
    cloned = new obj.constructor(isDeep ? baseClone((0, _toConsumableArray2["default"])(obj), true) : obj);
  } else {
    cloned = Object.create(obj.__proto__);

    for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
          field = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      cloned[field] = isDeep ? baseClone(value, true) : value;
    }
  }

  return cloned;
}
/**
 * Check if two arrays intersection exists
 */


function isIntersection(a, b) {
  var c;

  if (a.length > b.length) {
    c = a;
    a = b;
    b = c;
  }

  var _iterator2 = _createForOfIteratorHelper(a),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var el = _step2.value;

      if (indexOf(b, el) > -1) {
        return true;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return false;
}
/**
 * Define object size
 *
 * @param   {Object}    obj     Object
 * @return  {number}    Object size
 */


function size(obj) {
  return Object.keys(obj).length;
}
/**
 * Element position (isEqual checking)
 *
 * @param   {Array}   arr   Array
 * @param   {*}       item  Element item
 * @return  {number}
 */


function indexOf(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (isEqual(arr[i], item)) {
      return i;
    }
  }

  return -1;
}

function throttle(func) {
  var worked = false;
  var nextArguments;
  var nextResolve;
  var nextReject;
  return function () {
    if (typeof arguments[arguments.length - 1] === 'function') {
      return throttleCallback(func).apply(this, arguments);
    } else {
      return throttlePromise(func).apply(this, arguments);
    }
  }; // it is still used in FormMixin._validateForm so we can't remove it yet

  function throttleCallback(func) {
    return function run() {
      var ctx = this; // Function context

      var cb = arguments[arguments.length - 1];
      var argumentsArray = [].slice.call(arguments);

      if (worked) {
        // Set as the next call
        nextArguments = arguments;
        return;
      }

      worked = true;

      var cbWrapper = function cbWrapper() {
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
    };
  }

  function throttlePromise(func) {
    /**
     * @throws {ThrottleError} Too many function call
     */
    return function run() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var parentStack = getStack(2);
      return new Promise(function (resolve, reject) {
        if (worked) {
          if (nextArguments) {
            nextReject(_ThrottleError["default"].createWithParentStack(parentStack));
          }

          nextArguments = args;
          nextResolve = resolve;
          nextReject = reject;
          return;
        }

        worked = true;
        func.apply(_this, args).then(function (result) {
          worked = false;

          if (nextArguments) {
            nextResolve(run.apply(_this, nextArguments));
            nextArguments = null;
            reject(_ThrottleError["default"].createWithParentStack(parentStack));
            return;
          }

          resolve(result);
        })["catch"](function (err) {
          worked = false;
          reject(err);
        });
      });
    };
  }
}

function parseValueFromEvent(event) {
  if (event && (0, _typeof2["default"])(event) === 'object' && event.target && ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(event.target.tagName) >= 0) {
    switch (event.target.type) {
      case 'checkbox':
        return event.target.checked;
    }

    return event.target.value;
  }

  return event;
}

function Decorator(obj, decor) {
  Object.assign(this, decor);

  for (var i in obj) {
    if (typeof obj[i] === 'function' && !decor[i]) {
      this[i] = obj[i].bind(obj);
    }
  }
}

function decorate(obj, decor) {
  Decorator.prototype = obj;
  return new Decorator(obj, decor);
}
/**
 * Checking at equals params
 *
 * @param a
 * @param b
 * @returns {boolean}
 */


function isEqual(a, b) {
  if (a === null || b === null || a === undefined || b === undefined || typeof a === 'function' || typeof b === 'function' || a instanceof RegExp || b instanceof RegExp) {
    return String(a) === String(b);
  }

  if (a === b || a.valueOf() === b.valueOf() || a !== a && b !== b) {
    return true;
  }

  if (Array.isArray(a) && (!Array.isArray(b) || a.length !== b.length) || (0, _typeof2["default"])(a) !== 'object' || (0, _typeof2["default"])(b) !== 'object' || a.constructor !== b.constructor) {
    return false;
  }

  if (typeof File === 'function' && a instanceof File) {
    return a.size === b.size && a.name === b.name;
  }

  if (a instanceof Set || a instanceof Map) {
    return isEqual((0, _toConsumableArray2["default"])(a), (0, _toConsumableArray2["default"])(b));
  }

  var keys = Object.keys(a);
  return Object.keys(b).every(function (key) {
    return keys.includes(key);
  }) && keys.every(function (key) {
    return isEqual(a[key], b[key]);
  });
}
/**
 * Clone object
 *
 * @param obj
 * @returns {*}
 */


function clone(obj) {
  return baseClone(obj, false);
}

function cloneDeep(obj) {
  return baseClone(obj, true);
}

function isEmpty(value) {
  if (!value) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if ((0, _typeof2["default"])(value) === 'object') {
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  return false;
}

function isDefined(value) {
  return value !== null && value !== undefined;
}

function forEach(obj, func, ctx) {
  for (var i in obj) {
    func.call(ctx, obj[i], i);
  }
}

function pluck(arr, field) {
  return arr.map(function (item) {
    return item[field];
  });
}

function find(arr, func) {
  for (var i in arr) {
    if (func(arr[i], i)) {
      return arr[i];
    }
  }

  return null;
}

function findIndex(obj, func) {
  for (var i in obj) {
    if (func(obj[i], i)) {
      return i;
    }
  }

  return -1;
}

function omit(obj, predicate) {
  var result = {};

  for (var _i2 = 0, _Object$entries2 = Object.entries(obj); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i2], 2),
        field = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];

    if (typeof predicate === 'string' && predicate !== field || Array.isArray(predicate) && !predicate.includes(field) || typeof predicate === 'function' && !predicate(value, field)) {
      result[field] = value;
    }
  }

  return result;
}

function escape(string) {
  var reUnescaped = /[&<>"'`]/g;
  var escapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '`': '&#96;'
  };
  string = "".concat(string === null ? '' : string.toString());

  if (string && reUnescaped.test(string)) {
    return string.replace(reUnescaped, function (chr) {
      return escapes[chr];
    });
  }

  return string;
}

function zipObject(keys, values) {
  var result = {};

  for (var i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }

  return result;
}

function pick(obj, keys, defaultValue) {
  return keys.reduce(function (result, key) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    } else if (defaultValue !== undefined) {
      result[key] = defaultValue;
    }

    return result;
  }, {});
}

function mapKeys(object, iteratee) {
  var result = {};

  for (var _i3 = 0, _Object$entries3 = Object.entries(object); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i = (0, _slicedToArray2["default"])(_Object$entries3[_i3], 2),
        key = _Object$entries3$_i[0],
        value = _Object$entries3$_i[1];

    result[iteratee(value, key)] = value;
  }

  return result;
}

function reduce(obj, func, value) {
  for (var i in obj) {
    value = func(value, obj[i], i);
  }

  return value;
}

function reduceMap(map, func, value) {
  var _iterator3 = _createForOfIteratorHelper(map),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2),
          key = _step3$value[0],
          mapValue = _step3$value[1];

      value = func(value, mapValue, key);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return value;
}

function union() {
  var elements = {};

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  for (var _i4 = 0, _args = args; _i4 < _args.length; _i4++) {
    var arg = _args[_i4];

    var _iterator4 = _createForOfIteratorHelper(arg),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var el = _step4.value;
        elements[el] = el;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }

  return Object.values(elements);
}

function at(obj, keys) {
  var result = [];

  if (!Array.isArray(keys)) {
    return [obj[keys]];
  }

  var _iterator5 = _createForOfIteratorHelper(keys),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var key = _step5.value;
      result.push(obj[key]);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  return result;
}

function pairs(obj) {
  var result = [];

  for (var i in obj) {
    result.push([i, obj[i]]);
  }

  return result;
}

function toDate(value) {
  var date;

  if (typeof value === 'number') {
    return new Date(value);
  }

  if (typeof value === 'string') {
    date = new Date(value);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000); // Convert UTC to local time

    return date;
  }

  return new Date(value);
}

function without(arr, el) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(el) ? indexOf(el, arr[i]) > -1 : isEqual(arr[i], el)) {
      continue;
    }

    result.push(arr[i]);
  }

  return result;
}

function last(arr) {
  return arr[arr.length - 1];
}

function getRecordChanges(model, data, changes, newChanges) {
  var result = _objectSpread(_objectSpread({}, changes), newChanges);

  for (var _i5 = 0, _Object$keys = Object.keys(result); _i5 < _Object$keys.length; _i5++) {
    var fieldName = _Object$keys[_i5];

    if (isEqual(data[fieldName], result[fieldName])) {
      delete result[fieldName];
    }
  }

  Object.assign(result, pick(data, model.getValidationDependency(Object.keys(result))));
  return result;
}

function getStack() {
  var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  // We add here try..catch because in IE Error.stack is available only
  // for thrown errors: https://msdn.microsoft.com/ru-ru/library/windows/apps/hh699850.aspx
  var stack = '';
  var stackTraceLimitDefault = Error.stackTraceLimit;
  Error.stackTraceLimit = deep + 12;

  try {
    throw new Error();
  } catch (e) {
    if (e.stack) {
      // Error.stack is unavailable in old browsers
      stack = e.stack.split('\n').slice(2 + deep) // Here we delete rows 'Error' and 'at getStack(utils.js:427)'
      .join('\n');
    }
  }

  Error.stackTraceLimit = stackTraceLimitDefault;
  return stack;
}

function warn(message) {
  console.warn(message, '\n', getStack(1));
}

function toEncodedString(value) {
  return encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value));
}

function asyncHandler(router) {
  return function (req, res, next) {
    var promise = router(req, res, next);

    if (promise && promise.then) {
      return promise["catch"](next);
    }

    next(new Error('asyncHandler expected to take async function.'));
  };
}

function parents(element, selector) {
  var result = [];

  while (element = element.parentElement) {
    if (element.matches(selector)) {
      result.push(element);
    }
  }

  return result;
}

function parseJson(json) {
  var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Incorrect JSON';
  var result;

  try {
    result = JSON.parse(json);
  } catch (err) {
    throw new _ArgumentsError["default"](errorMessage);
  }

  return result;
}