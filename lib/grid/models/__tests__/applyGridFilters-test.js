"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _applyGridFilters = _interopRequireDefault(require("../applyGridFilters"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

describe('applyGridFilters test', function () {
  var model, newModel, filters;
  beforeEach(function () {
    model = {
      read: jest.fn( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(arg) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", arg);

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }())
    };
    filters = {
      search: '77'
    };
  });
  it('Should apply filters', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newModel = (0, _applyGridFilters["default"])(model, filters);
            _context2.t0 = expect;
            _context2.next = 4;
            return newModel.read({
              filters: {
                test: 1
              }
            });

          case 4:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1).toEqual({
              filters: _objectSpread(_objectSpread({}, filters), {}, {
                test: 1
              })
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Should apply all filters from previous calls', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
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
            return newModel.read({});

          case 8:
            _context3.t1 = _context3.sent;
            (0, _context3.t0)(_context3.t1).toEqual({
              filters: {
                a: null,
                b: 4,
                c: 5,
                search: '77'
              }
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});