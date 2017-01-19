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

var _ValidationErrors = require('../ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _boolean = require('../validators/boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _date = require('../validators/date');

var _date2 = _interopRequireDefault(_date);

var _enum = require('../validators/enum');

var _enum2 = _interopRequireDefault(_enum);

var _float = require('../validators/float');

var _float2 = _interopRequireDefault(_float);

var _notNull = require('../validators/notNull');

var _notNull2 = _interopRequireDefault(_notNull);

var _number = require('../validators/number');

var _number2 = _interopRequireDefault(_number);

var _regExp = require('../validators/regExp');

var _regExp2 = _interopRequireDefault(_regExp);

var _set = require('../validators/set');

var _set2 = _interopRequireDefault(_set);

var _common = require('../Validator/common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('ValidationError', function () {
  var validationError = void 0;
  beforeEach(function () {
    validationError = _ValidationErrors2.default.createFromJSON({ test: ['error'] });
  });

  it('add', function () {
    validationError.add('test2', 'error2');
    expect(validationError.toJSON()).toEqual({ test: ['error'], test2: ['error2'] });
  });

  it('hasError', function () {
    expect(validationError.hasError('test')).toBeTruthy();
  });

  it('getFieldErrors', function () {
    expect(validationError.getFieldErrors('test')).toEqual(['error']);
  });

  it('getFailedFields', function () {
    expect(validationError.getFailedFields()).toEqual(['test']);
  });

  it('isEmpty', function () {
    expect(validationError.isEmpty()).not.toBeTruthy();
  });

  it('clearField', function () {
    expect(validationError.clearField('test').toJSON()).toEqual({});
  });

  it('clear', function () {
    expect(validationError.clear().toJSON()).toEqual({});
  });

  it('clone', function () {
    expect(validationError.clone()).not.toBe(validationError);
    expect(validationError.clone().toJSON()).toEqual({ test: ['error'] });
  });
});

describe('validators', function () {
  it('boolean', function () {
    var validator = (0, _boolean2.default)('err text');
    var validatorNotNull = _boolean2.default.notNull('err text');
    expect(validator(true)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(false)).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('date', function () {
    var validator = (0, _date2.default)(0, 500000, 'err text');
    var validatorNotNull = _date2.default.notNull(0, 500000, 'err text');
    expect(validator(245545)).toBeUndefined();
    expect(validator('1979-12-31T23:10:00.000Z')).toBe('err text');
    expect(validatorNotNull('1970-01-01T01:00:00.000Z')).toBeUndefined();
    expect(validatorNotNull(600000)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('enum', function () {
    var validator = (0, _enum2.default)(['a', 'b', 'c'], 'err text');
    var validatorNotNull = _enum2.default.notNull(['a', 'b', 'c'], 'err text');
    expect(validator('a')).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull('b')).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('float', function () {
    var validator = (0, _float2.default)(3, 10, 'err text');
    var validatorNotNull = _float2.default.notNull(3, 10, 'err text');
    expect(validator(4)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(7, 5)).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('notNull', function () {
    var validator = (0, _notNull2.default)('err text');
    expect(validator(4)).toBeUndefined();
    expect(validator(null)).toBe('err text');
  });

  it('number', function () {
    var validator = (0, _number2.default)(3, 10, 'err text');
    var validatorNotNull = _number2.default.notNull(3, 10, 'err text');
    expect(validator(4)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(7)).toBeUndefined();
    expect(validatorNotNull(34, 5)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('regExp', function () {
    var validator = (0, _regExp2.default)(/abc/, 'err text');
    var validatorNotNull = _regExp2.default.notNull(/abc/, 'err text');
    expect(validator('abcd')).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull('abcd')).toBeUndefined();
    expect(validatorNotNull(34, 5)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('set', function () {
    var validator = (0, _set2.default)(['a', 'b', 'c'], 'err text');
    var validatorNotNull = _set2.default.notNull(['a', 'b', 'c'], 'err text');
    expect(validator(['a'])).toBeUndefined();
    expect(validator(['a', 'rtrtr'])).toBe('err text');
    expect(validatorNotNull(['b'])).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });
});

describe('Validator', function () {
  var validatorBoolean = (0, _boolean2.default)('err text');
  var validator = void 0;
  beforeEach(function () {
    validator = new _common2.default();
  });

  it('field', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validator.field('name', validatorBoolean);
            _context.next = 3;
            return validator.isValidRecord({ name: true });

          case 3:
            result = _context.sent;

            expect(result.toJSON()).toEqual({});
            _context.next = 7;
            return validator.isValidRecord({ name: 6456 });

          case 7:
            result = _context.sent;

            expect(result.toJSON()).toEqual({ 'name': ['err text'] });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('field', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            validator.field('name', validatorBoolean);
            _context2.next = 3;
            return validator.isValidRecord({ name: true });

          case 3:
            result = _context2.sent;

            expect(result.toJSON()).toEqual({});
            _context2.next = 7;
            return validator.isValidRecord({ name: 6456 });

          case 7:
            result = _context2.sent;

            expect(result.toJSON()).toEqual({ 'name': ['err text'] });

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});