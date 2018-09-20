'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _applyGridFilters = require('../applyGridFilters');

var _applyGridFilters2 = _interopRequireDefault(_applyGridFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('applyGridFilters test', function () {
  var model = void 0,
      newModel = void 0,
      filters = void 0;
  beforeEach(function () {
    model = {
      read: jest.fn(function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(arg) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', arg);

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }())
    };
    filters = { search: '77' };
  });

  it('Should apply filters', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newModel = (0, _applyGridFilters2.default)(model, filters);
            _context2.t0 = expect;
            _context2.next = 4;
            return newModel.read({ filters: { test: 1 } });

          case 4:
            _context2.t1 = _context2.sent;
            _context2.t2 = { filters: (0, _extends3.default)({}, filters, { test: 1 }) };
            (0, _context2.t0)(_context2.t1).toEqual(_context2.t2);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('Should apply all filters from previous calls', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newModel = (0, _applyGridFilters2.default)(model, filters);
            newModel = (0, _applyGridFilters2.default)(newModel, { a: 1, b: 2 });
            newModel = (0, _applyGridFilters2.default)(newModel, { a: null, b: 4 });
            newModel = (0, _applyGridFilters2.default)(newModel, { c: 3 });
            newModel = (0, _applyGridFilters2.default)(newModel, { c: 5 });

            _context3.t0 = expect;
            _context3.next = 8;
            return newModel.read({});

          case 8:
            _context3.t1 = _context3.sent;
            _context3.t2 = { filters: { a: null, b: 4, c: 5, search: '77' } };
            (0, _context3.t0)(_context3.t1).toEqual(_context3.t2);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
}); /**
     * Copyright (с) 2015-present, SoftIndex LLC.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree.
     */