/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var makeRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _promise2.default(function (resolve) {
              (0, _setImmediate3.default)(function () {
                return resolve(data);
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function makeRequest(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _utils = require('../utils');

var _ThrottleError = require('../ThrottleError');

var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Throttle promise', function () {
  it('Should handle one by one if called in turn', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var request, firstResponse, secondResponse, lastResponse;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            request = (0, _utils.throttle)(makeRequest);
            _context2.next = 3;
            return request(1);

          case 3:
            firstResponse = _context2.sent;

            expect(firstResponse).toBe(1);

            _context2.next = 7;
            return request(2);

          case 7:
            secondResponse = _context2.sent;

            expect(secondResponse).toBe(2);

            _context2.next = 11;
            return request(3);

          case 11:
            lastResponse = _context2.sent;

            expect(lastResponse).toBe(3);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('Should handle last if called simultaneously', function () {
    var request = (0, _utils.throttle)(makeRequest);

    // First request throws error
    var firstRequest = request(1).catch(function (error) {
      expect(error).toBeInstanceOf(_ThrottleError2.default);
    });

    // Second request throws error
    var secondRequest = request(2).catch(function (error) {
      expect(error).toBeInstanceOf(_ThrottleError2.default);
    });

    // Last request return value
    var lastRequest = request(3);
    lastRequest.then(function (data) {
      expect(data).toBe(3);
    });

    return _promise2.default.all([firstRequest, secondRequest, lastRequest]);
  });

  // There was bug with reusing fulfilled promise (e79f4db)
  it('Should let catch all ThrottleErrors without unhandled promise rejection', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {

    // Catch errors so that Promise.all wait for completion of all promises
    var asyncFuncCatchingThrottleErrors = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(data) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return throttledRequest(data);

              case 3:
                _context3.next = 9;
                break;

              case 5:
                _context3.prev = 5;
                _context3.t0 = _context3['catch'](0);

                if (_context3.t0 instanceof _ThrottleError2.default) {
                  _context3.next = 9;
                  break;
                }

                throw _context3.t0;

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 5]]);
      }));

      return function asyncFuncCatchingThrottleErrors(_x2) {
        return _ref4.apply(this, arguments);
      };
    }();

    var throttledRequest, hasUnhandledRejection;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            throttledRequest = (0, _utils.throttle)(makeRequest);
            hasUnhandledRejection = false;

            process.on('unhandledRejection', function () {
              hasUnhandledRejection = true;
            });

            _context4.next = 5;
            return _promise2.default.all([asyncFuncCatchingThrottleErrors(), asyncFuncCatchingThrottleErrors()]);

          case 5:
            _context4.next = 7;
            return _promise2.default.all([asyncFuncCatchingThrottleErrors(), asyncFuncCatchingThrottleErrors()]);

          case 7:

            expect(hasUnhandledRejection).toBeFalsy();

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('Throttle callback', function () {
  it('Should handle last if called simultaneously', function () {
    var resolve = void 0;
    var requestCallback = jest.fn(function (cbWrapper) {
      return resolve = cbWrapper;
    });
    var request = (0, _utils.throttle)(requestCallback);

    request(jest.fn()); // request 1 start
    expect(requestCallback).toHaveBeenCalledTimes(1);
    resolve(); // request 1 done

    request(jest.fn());
    expect(requestCallback).toHaveBeenCalledTimes(2); // request 2 start

    request(jest.fn());
    expect(requestCallback).toHaveBeenCalledTimes(2); // request 3 wait

    var isLastCbHandled = void 0;
    request(jest.fn(function () {
      return isLastCbHandled = true;
    }));

    expect(requestCallback).toHaveBeenCalledTimes(2); // request 4 wait
    resolve(); // request 2 done
    expect(requestCallback).toHaveBeenCalledTimes(3); // request 4 start
    resolve(); // request 4 done

    expect(isLastCbHandled).toBeTruthy();
  });
});