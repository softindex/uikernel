"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _date = _interopRequireDefault(require("../date"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
describe('Can be empty', function () {
  it('null should be valid', function () {
    expect((0, _date.default)(null, null, 'test')(null)).toEqual(undefined);
  });
  it('"" should be invalid', function () {
    expect((0, _date.default)(null, null, 'test')('')).toEqual('test');
  });
  it('Should not return error if date correct', function () {
    expect((0, _date.default)(null, null, 'test')('2018-01-02')).toEqual(undefined);
    expect((0, _date.default)(null, null, 'test')(new Date('2018-01-02'))).toEqual(undefined);
    expect((0, _date.default)(null, null, 'test')(new Date())).toEqual(undefined);
    expect((0, _date.default)(null, null, 'test')(Date.now())).toEqual(undefined);
  });
  it('Should return error if date incorrect', function () {
    expect((0, _date.default)(null, null, 'test')('abc')).toEqual('test');
  });
  it('Should return error if date < minDate', function () {
    expect((0, _date.default)('2018-01-10', null, 'test')('2018-01-02')).toEqual('test');
  });
  it('Should not return error if date <= minDate', function () {
    expect((0, _date.default)('2018-01-10', null, 'test')('2018-01-10')).toEqual(undefined);
  });
  it('Should not return error if date > minDate', function () {
    expect((0, _date.default)('2018-01-10', null, 'test')('2018-01-11')).toEqual(undefined);
  });
  it('Should return error if date > maxDate', function () {
    expect((0, _date.default)(null, '2018-01-02', 'test')('2018-01-10')).toEqual('test');
  });
  it('Should not return error if date >= maxDate', function () {
    expect((0, _date.default)(null, '2018-01-10', 'test')('2018-01-10')).toEqual(undefined);
  });
  it('Should not return error if date < maxDate', function () {
    expect((0, _date.default)(null, '2018-01-10', 'test')('2018-01-02')).toEqual(undefined);
  });
  it('Should not return error if date < maxDate && date > minDate', function () {
    expect((0, _date.default)('2018-01-10', '2018-01-20', 'test')('2018-01-15')).toEqual(undefined);
  });
});
describe('Can not be empty', function () {
  it('null should be invalid', function () {
    expect(_date.default.notNull(null, null, 'test')(null)).toEqual('test');
  });
  it('"" should be invalid', function () {
    expect(_date.default.notNull(null, null, 'test')('')).toEqual('test');
  });
  it('Should not return error if date correct', function () {
    expect(_date.default.notNull(null, null, 'test')('2018-01-02')).toEqual(undefined);
    expect(_date.default.notNull(null, null, 'test')(new Date('2018-01-02'))).toEqual(undefined);
    expect(_date.default.notNull(null, null, 'test')(new Date())).toEqual(undefined);
    expect(_date.default.notNull(null, null, 'test')(Date.now())).toEqual(undefined);
  });
  it('Should return error if date incorrect', function () {
    expect(_date.default.notNull(null, null, 'test')('abc')).toEqual('test');
  });
  it('Should return error if date < minDate', function () {
    expect(_date.default.notNull('2018-01-10', null, 'test')('2018-01-02')).toEqual('test');
  });
  it('Should not return error if date <= minDate', function () {
    expect(_date.default.notNull('2018-01-10', null, 'test')('2018-01-10')).toEqual(undefined);
  });
  it('Should not return error if date > minDate', function () {
    expect(_date.default.notNull('2018-01-10', null, 'test')('2018-01-11')).toEqual(undefined);
  });
  it('Should return error if date > maxDate', function () {
    expect(_date.default.notNull(null, '2018-01-02', 'test')('2018-01-10')).toEqual('test');
  });
  it('Should not return error if date >= maxDate', function () {
    expect(_date.default.notNull(null, '2018-01-10', 'test')('2018-01-10')).toEqual(undefined);
  });
  it('Should not return error if date < maxDate', function () {
    expect(_date.default.notNull(null, '2018-01-10', 'test')('2018-01-02')).toEqual(undefined);
  });
  it('Should not return error if date < maxDate && date > minDate', function () {
    expect(_date.default.notNull('2018-01-10', '2018-01-20', 'test')('2018-01-15')).toEqual(undefined);
  });
});
describe('Error message is not defined', function () {
  var validator = (0, _date.default)(/./);
  it('Should be return default message', function () {
    expect(validator('abc')).toEqual('Invalid date');
  });
});