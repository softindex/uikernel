"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var EqualMap = /*#__PURE__*/function (_Map) {
  (0, _inherits2["default"])(EqualMap, _Map);

  var _super = _createSuper(EqualMap);

  function EqualMap(iterable) {
    (0, _classCallCheck2["default"])(this, EqualMap);
    return _super.call(this, iterable);
  }

  (0, _createClass2["default"])(EqualMap, [{
    key: "set",
    value: function set(key, value) {
      Map.prototype.set.call(this, JSON.stringify(key), value);
    }
  }, {
    key: "get",
    value: function get(key) {
      return Map.prototype.get.call(this, JSON.stringify(key));
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      return Map.prototype["delete"].call(this, JSON.stringify(key));
    }
  }, {
    key: "has",
    value: function has(key) {
      return Map.prototype.has.call(this, JSON.stringify(key));
    }
  }, {
    key: "keys",
    value: /*#__PURE__*/_regenerator["default"].mark(function keys() {
      var _iterator, _step, jsonKey;

      return _regenerator["default"].wrap(function keys$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(Map.prototype.keys.call(this));
              _context.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context.next = 9;
                break;
              }

              jsonKey = _step.value;
              _context.next = 7;
              return JSON.parse(jsonKey);

            case 7:
              _context.next = 3;
              break;

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

              _iterator.e(_context.t0);

            case 14:
              _context.prev = 14;

              _iterator.f();

              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, keys, this, [[1, 11, 14, 17]]);
    })
  }, {
    key: "entries",
    value: /*#__PURE__*/_regenerator["default"].mark(function entries() {
      var _iterator2, _step2, _step2$value, jsonKey, value;

      return _regenerator["default"].wrap(function entries$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iterator2 = _createForOfIteratorHelper(Map.prototype.entries.call(this));
              _context2.prev = 1;

              _iterator2.s();

            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context2.next = 9;
                break;
              }

              _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2), jsonKey = _step2$value[0], value = _step2$value[1];
              _context2.next = 7;
              return [JSON.parse(jsonKey), value];

            case 7:
              _context2.next = 3;
              break;

            case 9:
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);

              _iterator2.e(_context2.t0);

            case 14:
              _context2.prev = 14;

              _iterator2.f();

              return _context2.finish(14);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, entries, this, [[1, 11, 14, 17]]);
    })
  }, {
    key: Symbol.iterator,
    value: /*#__PURE__*/_regenerator["default"].mark(function value() {
      var _iterator3, _step3, _step3$value, key, value, parsed;

      return _regenerator["default"].wrap(function value$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _iterator3 = _createForOfIteratorHelper(Map.prototype[Symbol.iterator].call(this));
              _context3.prev = 1;

              _iterator3.s();

            case 3:
              if ((_step3 = _iterator3.n()).done) {
                _context3.next = 10;
                break;
              }

              _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2), key = _step3$value[0], value = _step3$value[1];
              parsed = JSON.parse(key);
              _context3.next = 8;
              return [parsed, value];

            case 8:
              _context3.next = 3;
              break;

            case 10:
              _context3.next = 15;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](1);

              _iterator3.e(_context3.t0);

            case 15:
              _context3.prev = 15;

              _iterator3.f();

              return _context3.finish(15);

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, value, this, [[1, 12, 15, 18]]);
    })
  }]);
  return EqualMap;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Map));

module.exports = EqualMap;