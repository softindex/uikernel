"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils");

var _ThrottleError = _interopRequireDefault(require("../ThrottleError"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function makeRequest(_x) {
  return _makeRequest.apply(this, arguments);
}

function _makeRequest() {
  _makeRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve) {
              setImmediate(function () {
                return resolve(data);
              });
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _makeRequest.apply(this, arguments);
}

describe('Throttle', function () {
  it('Should handle one by one if called in turn', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var request, firstResponse, secondResponse, lastResponse;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = (0, _utils.throttle)(makeRequest);
            _context.next = 3;
            return request(1);

          case 3:
            firstResponse = _context.sent;
            expect(firstResponse).toBe(1);
            _context.next = 7;
            return request(2);

          case 7:
            secondResponse = _context.sent;
            expect(secondResponse).toBe(2);
            _context.next = 11;
            return request(3);

          case 11:
            lastResponse = _context.sent;
            expect(lastResponse).toBe(3);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('Should handle last if called simultaneously', function () {
    var request = (0, _utils.throttle)(makeRequest); // First request throws error

    var firstRequest = request(1)["catch"](function (error) {
      expect(error).toBeInstanceOf(_ThrottleError["default"]);
    }); // Second request throws error

    var secondRequest = request(2)["catch"](function (error) {
      expect(error).toBeInstanceOf(_ThrottleError["default"]);
    }); // Last request return value

    var lastRequest = request(3);
    lastRequest.then(function (data) {
      expect(data).toBe(3);
    });
    return Promise.all([firstRequest, secondRequest, lastRequest]);
  }); // There was bug with reusing fulfilled promise (e79f4db)

  it('Should let catch all ThrottleErrors without unhandled promise rejection', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var throttledRequest, asyncFuncCatchingThrottleErrors, _asyncFuncCatchingThrottleErrors, hasUnhandledRejection;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _asyncFuncCatchingThrottleErrors = function _asyncFuncCatchingThr2() {
              _asyncFuncCatchingThrottleErrors = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return throttledRequest(data);

                      case 3:
                        _context2.next = 9;
                        break;

                      case 5:
                        _context2.prev = 5;
                        _context2.t0 = _context2["catch"](0);

                        if (_context2.t0 instanceof _ThrottleError["default"]) {
                          _context2.next = 9;
                          break;
                        }

                        throw _context2.t0;

                      case 9:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[0, 5]]);
              }));
              return _asyncFuncCatchingThrottleErrors.apply(this, arguments);
            };

            asyncFuncCatchingThrottleErrors = function _asyncFuncCatchingThr(_x2) {
              return _asyncFuncCatchingThrottleErrors.apply(this, arguments);
            };

            throttledRequest = (0, _utils.throttle)(makeRequest); // Catch errors so that Promise.all wait for completion of all promises

            hasUnhandledRejection = false;
            process.on('unhandledRejection', function () {
              hasUnhandledRejection = true;
            });
            _context3.next = 7;
            return Promise.all([asyncFuncCatchingThrottleErrors(), asyncFuncCatchingThrottleErrors()]);

          case 7:
            _context3.next = 9;
            return Promise.all([asyncFuncCatchingThrottleErrors(), asyncFuncCatchingThrottleErrors()]);

          case 9:
            expect(hasUnhandledRejection).toBeFalsy();

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});
describe('Utils.isEqual', function () {
  it('Should return false if comparands have different types', function () {
    expect((0, _utils.isEqual)({}, '')).toBeFalsy();
  });
  it('Should return true if comparands are files and have same size and name', function () {
    global.File = /*#__PURE__*/function () {
      function _class(size, name) {
        (0, _classCallCheck2["default"])(this, _class);
        this.size = size;
        this.name = name;
        this._metadata = Math.random();
      }

      return _class;
    }();

    expect((0, _utils.isEqual)(new global.File(100, 'file'), new global.File(100, 'file'))).toBeTruthy();
  });
  it('Shouldn`t return true if comparands are files and have same size and name', function () {
    global.File = /*#__PURE__*/function () {
      function _class2(size, name) {
        (0, _classCallCheck2["default"])(this, _class2);
        this.size = size;
        this.name = name;
        this._metadata = Math.random();
      }

      return _class2;
    }();

    expect((0, _utils.isEqual)(new global.File(100, 'file'), new global.File(200, 'file'))).toBeFalsy();
  });
});