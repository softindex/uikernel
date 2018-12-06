"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ValidationErrors = _interopRequireDefault(require("../ValidationErrors"));

var _boolean = _interopRequireDefault(require("../rules/boolean"));

var _date = _interopRequireDefault(require("../rules/date"));

var _enum = _interopRequireDefault(require("../rules/enum"));

var _float = _interopRequireDefault(require("../rules/float"));

var _notNull = _interopRequireDefault(require("../rules/notNull"));

var _number = _interopRequireDefault(require("../rules/number"));

var _regExp = _interopRequireDefault(require("../rules/regExp"));

var _set = _interopRequireDefault(require("../rules/set"));

var _Validator = _interopRequireDefault(require("../Validator"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
describe('ValidationError', function () {
  describe('Check "static createWithError" method', function () {
    it('Should create ValidationErrors instance with one error', function () {
      var validationError = _ValidationErrors.default.createWithError('test', 'error');

      expect(validationError.toJSON()).toEqual({
        test: [{
          message: 'error'
        }]
      });
    });
  });
  it('add', function () {
    var validationError = _ValidationErrors.default.createFromJSON({
      test: ['error']
    });

    validationError.add('test2', 'error2');
    expect(validationError.toJSON()).toEqual({
      test: [{
        message: 'error'
      }],
      test2: [{
        message: 'error2'
      }]
    });
  });
  it('hasError', function () {
    var validationError = _ValidationErrors.default.createFromJSON({
      test: ['error']
    });

    expect(validationError.hasError('test')).toBeTruthy();
  });
  it('getFieldErrorMessages', function () {
    var validationError = _ValidationErrors.default.createFromJSON({
      test: ['error']
    });

    expect(validationError.getFieldErrorMessages('test')).toEqual(['error']);
  });
  it('getFailedFields', function () {
    var validationError = _ValidationErrors.default.createFromJSON({
      test: ['error']
    });

    expect(validationError.getFailedFields()).toEqual(['test']);
  });
  it('isEmpty', function () {
    var validationError = _ValidationErrors.default.createFromJSON({
      test: ['error']
    });

    expect(validationError.isEmpty()).not.toBeTruthy();
  });
  it('clearField', function () {
    var validationError = _ValidationErrors.default.createFromJSON({
      test: ['error']
    });

    expect(validationError.clearField('test').toJSON()).toEqual({});
  });
  it('clear', function () {
    var validationError = _ValidationErrors.default.createFromJSON({
      test: ['error']
    });

    expect(validationError.clear().toJSON()).toEqual({});
  });
  it('clone', function () {
    var validationError = _ValidationErrors.default.createFromJSON({
      test: ['error']
    });

    expect(validationError.clone()).not.toBe(validationError);
    expect(validationError.clone().toJSON()).toEqual({
      test: [{
        message: 'error'
      }]
    });
  });
  it('merge', function () {
    var validationError = _ValidationErrors.default.createFromJSON({
      test: ['error']
    });

    var errorToMerge = _ValidationErrors.default.createFromJSON({
      test2: [{
        message: 'error2'
      }]
    });

    expect(validationError.merge(errorToMerge).toJSON()).toEqual({
      test: [{
        message: 'error'
      }],
      test2: [{
        message: 'error2'
      }]
    });
  });
});
describe('validators', function () {
  it('boolean', function () {
    var validator = (0, _boolean.default)('err text');

    var validatorNotNull = _boolean.default.notNull('err text');

    expect(validator(true)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(false)).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });
  it('date', function () {
    var validator = (0, _date.default)(0, 500000, 'err text');

    var validatorNotNull = _date.default.notNull(0, 500000, 'err text');

    expect(validator(245545)).toBeUndefined();
    expect(validator('1979-12-31T23:10:00.000Z')).toBe('err text');
    expect(validatorNotNull('1970-01-01T01:00:00.000Z')).toBeUndefined();
    expect(validatorNotNull(600000)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });
  it('enum', function () {
    var validator = (0, _enum.default)(['a', 'b', 'c'], 'err text');

    var validatorNotNull = _enum.default.notNull(['a', 'b', 'c'], 'err text');

    expect(validator('a')).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull('b')).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });
  it('float', function () {
    var validator = (0, _float.default)(3, 10, 'err text');

    var validatorNotNull = _float.default.notNull(3, 10, 'err text');

    expect(validator(4)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(7, 5)).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });
  it('notNull', function () {
    var validator = (0, _notNull.default)('err text');
    expect(validator(4)).toBeUndefined();
    expect(validator(null)).toBe('err text');
  });
  it('number', function () {
    var validator = (0, _number.default)(3, 10, 'err text');

    var validatorNotNull = _number.default.notNull(3, 10, 'err text');

    expect(validator(4)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(7)).toBeUndefined();
    expect(validatorNotNull(34, 5)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });
  it('regExp', function () {
    var validator = (0, _regExp.default)(/abc/, 'err text');

    var validatorNotNull = _regExp.default.notNull(/abc/, 'err text');

    expect(validator('abcd')).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull('abcd')).toBeUndefined();
    expect(validatorNotNull(34, 5)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });
  it('set', function () {
    var validator = (0, _set.default)(['a', 'b', 'c'], 'err text');

    var validatorNotNull = _set.default.notNull(['a', 'b', 'c'], 'err text');

    expect(validator(['a'])).toBeUndefined();
    expect(validator(['a', 'rtrtr'])).toBe('err text');
    expect(validatorNotNull(['b'])).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });
});
describe('Validator', function () {
  var validatorBoolean = (0, _boolean.default)('err text');
  var validator;
  beforeEach(function () {
    validator = new _Validator.default();
  });
  it('field',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validator.field('name', validatorBoolean);
            _context.next = 3;
            return validator.isValidRecord({
              name: true
            });

          case 3:
            result = _context.sent;
            expect(result.toJSON()).toEqual({});
            _context.next = 7;
            return validator.isValidRecord({
              name: 6456
            });

          case 7:
            result = _context.sent;
            expect(result.toJSON()).toEqual({
              'name': [{
                message: 'err text'
              }]
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  it('field',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var result;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            validator.field('name', validatorBoolean);
            _context2.next = 3;
            return validator.isValidRecord({
              name: true
            });

          case 3:
            result = _context2.sent;
            expect(result.toJSON()).toEqual({});
            _context2.next = 7;
            return validator.isValidRecord({
              name: 6456
            });

          case 7:
            result = _context2.sent;
            expect(result.toJSON()).toEqual({
              'name': [{
                message: 'err text'
              }]
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
});