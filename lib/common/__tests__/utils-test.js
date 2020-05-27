"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _utils = require("../utils");

var _ThrottleError = _interopRequireDefault(require("../ThrottleError"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function makeRequest(data) {
  return _regenerator["default"].async(function makeRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve) {
            setImmediate(function () {
              return resolve(data);
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

describe('Throttle', function () {
  it('Should handle one by one if called in turn', function _callee() {
    var request, firstResponse, secondResponse, lastResponse;
    return _regenerator["default"].async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            request = (0, _utils.throttle)(makeRequest);
            _context2.next = 3;
            return _regenerator["default"].awrap(request(1));

          case 3:
            firstResponse = _context2.sent;
            expect(firstResponse).toBe(1);
            _context2.next = 7;
            return _regenerator["default"].awrap(request(2));

          case 7:
            secondResponse = _context2.sent;
            expect(secondResponse).toBe(2);
            _context2.next = 11;
            return _regenerator["default"].awrap(request(3));

          case 11:
            lastResponse = _context2.sent;
            expect(lastResponse).toBe(3);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
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

  it('Should let catch all ThrottleErrors without unhandled promise rejection', function _callee2() {
    var throttledRequest, asyncFuncCatchingThrottleErrors, hasUnhandledRejection;
    return _regenerator["default"].async(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            asyncFuncCatchingThrottleErrors = function _ref(data) {
              return _regenerator["default"].async(function asyncFuncCatchingThrottleErrors$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;
                      _context3.next = 3;
                      return _regenerator["default"].awrap(throttledRequest(data));

                    case 3:
                      _context3.next = 9;
                      break;

                    case 5:
                      _context3.prev = 5;
                      _context3.t0 = _context3["catch"](0);

                      if (_context3.t0 instanceof _ThrottleError["default"]) {
                        _context3.next = 9;
                        break;
                      }

                      throw _context3.t0;

                    case 9:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, null, null, [[0, 5]]);
            };

            throttledRequest = (0, _utils.throttle)(makeRequest); // Catch errors so that Promise.all wait for completion of all promises

            hasUnhandledRejection = false;
            process.on('unhandledRejection', function () {
              hasUnhandledRejection = true;
            });
            _context4.next = 6;
            return _regenerator["default"].awrap(Promise.all([asyncFuncCatchingThrottleErrors(), asyncFuncCatchingThrottleErrors()]));

          case 6:
            _context4.next = 8;
            return _regenerator["default"].awrap(Promise.all([asyncFuncCatchingThrottleErrors(), asyncFuncCatchingThrottleErrors()]));

          case 8:
            expect(hasUnhandledRejection).toBeFalsy();

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
});
describe('Utils.isEqual', function () {
  it('Should return false if comparands have different types', function () {
    expect((0, _utils.isEqual)({}, '')).toBeFalsy();
  });
  it('Should return true if comparands are files and have same size and name', function () {
    global.File =
    /*#__PURE__*/
    function () {
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
    global.File =
    /*#__PURE__*/
    function () {
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