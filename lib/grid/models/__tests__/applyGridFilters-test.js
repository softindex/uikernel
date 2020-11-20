"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _applyGridFilters = _interopRequireDefault(require("../applyGridFilters"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

describe('applyGridFilters test', function () {
  var model, newModel, filters;
  beforeEach(function () {
    model = {
      read: jest.fn(function _callee(arg) {
        return _regenerator["default"].async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", arg);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        });
      })
    };
    filters = {
      search: '77'
    };
  });
  it('Should apply filters', function _callee2() {
    return _regenerator["default"].async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newModel = (0, _applyGridFilters["default"])(model, filters);
            _context2.t0 = expect;
            _context2.next = 4;
            return _regenerator["default"].awrap(newModel.read({
              filters: {
                test: 1
              }
            }));

          case 4:
            _context2.t1 = _context2.sent;
            _context2.t2 = {
              filters: _objectSpread({}, filters, {
                test: 1
              })
            };
            (0, _context2.t0)(_context2.t1).toEqual(_context2.t2);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  it('Should apply all filters from previous calls', function _callee3() {
    return _regenerator["default"].async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newModel = (0, _applyGridFilters["default"])(model, filters);
            newModel = (0, _applyGridFilters["default"])(newModel, {
              a: 1,
              b: 2
            });
            newModel = (0, _applyGridFilters["default"])(newModel, {
              a: null,
              b: 4
            });
            newModel = (0, _applyGridFilters["default"])(newModel, {
              c: 3
            });
            newModel = (0, _applyGridFilters["default"])(newModel, {
              c: 5
            });
            _context3.t0 = expect;
            _context3.next = 8;
            return _regenerator["default"].awrap(newModel.read({}));

          case 8:
            _context3.t1 = _context3.sent;
            _context3.t2 = {
              filters: {
                a: null,
                b: 4,
                c: 5,
                search: '77'
              }
            };
            (0, _context3.t0)(_context3.t1).toEqual(_context3.t2);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
});