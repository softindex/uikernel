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

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _ThrottleError = require('../ThrottleError');

var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function makeRequest(data) {
  return new _promise2.default(function (resolve) {
    (0, _setImmediate3.default)(function () {
      return resolve(data);
    });
  });
}

describe('Throttle promise', function () {
  it('Should handle one by one if called in turn', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var request, firstResponse, secondResponse, lastResponse;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = _utils2.default.throttle(makeRequest);
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
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('Should handle last if called simultaneously', function () {
    var request = _utils2.default.throttle(makeRequest);

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
});

describe('Throttle callback', function () {
  it('Should handle last if called simultaneously', function () {
    var resolve = void 0;
    var requestCallback = jest.fn(function (cbWrapper) {
      return resolve = cbWrapper;
    });
    var request = _utils2.default.throttle(requestCallback);

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