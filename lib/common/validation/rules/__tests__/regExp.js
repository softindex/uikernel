"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regExp = _interopRequireDefault(require("../regExp"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
describe('Can be empty', function () {
  var validator = (0, _regExp.default)(/^.{3,}$/, 'test');
  it('"1" should not be valid', function () {
    expect(validator('1')).not.toEqual(undefined);
  });
  it('"" should be valid', function () {
    expect(validator('')).toEqual(undefined);
  });
  it('\\r\\n\\t should not be valid', function () {
    expect(validator('\r\n\t')).not.toEqual(undefined);
  });
  it('" " should not be valid', function () {
    expect(validator(' ')).not.toEqual(undefined);
  });
  it('NaN should not be valid', function () {
    expect(validator(NaN)).not.toEqual(undefined);
  });
  it('null should be valid', function () {
    expect(validator(null)).toEqual(undefined);
  });
  it('undefined should be valid', function () {
    expect(validator(undefined)).toEqual(undefined);
  });
  it('0 should not be valid', function () {
    expect(validator(0)).not.toEqual(undefined);
  });
  it('1 should not be valid', function () {
    expect(validator(1)).not.toEqual(undefined);
  });
  it('-1 should not be valid', function () {
    expect(validator(-1)).not.toEqual(undefined);
  });
  it('1.123 should not be valid', function () {
    expect(validator(1.123)).not.toEqual(undefined);
  });
  it('-1.123 should not be valid', function () {
    expect(validator(-1.123)).not.toEqual(undefined);
  });
  it('{} should not be valid', function () {
    expect(validator({})).not.toEqual(undefined);
  });
  it('[] should not be valid', function () {
    expect(validator([])).not.toEqual(undefined);
  });
  it('Infinity should not be valid', function () {
    expect(validator(Infinity)).not.toEqual(undefined);
  });
  it('"1a" should not be valid', function () {
    expect(validator('ab')).not.toEqual(undefined);
  });
  it('"1ab" should be valid', function () {
    expect(validator('abc')).toEqual(undefined);
  });
});
describe('Can not be empty', function () {
  var validator = _regExp.default.notNull(/^.{3,}$/, 'test');

  it('"1" should not be valid', function () {
    expect(validator('1')).not.toEqual(undefined);
  });
  it('"" should not be valid', function () {
    expect(validator('')).not.toEqual(undefined);
  });
  it('\\r\\n\\t should not be valid', function () {
    expect(validator('\r\n\t')).not.toEqual(undefined);
  });
  it('" " should not be valid', function () {
    expect(validator(' ')).not.toEqual(undefined);
  });
  it('NaN should not be valid', function () {
    expect(validator(NaN)).not.toEqual(undefined);
  });
  it('null should not be valid', function () {
    expect(validator(null)).not.toEqual(undefined);
  });
  it('undefined should not be valid', function () {
    expect(validator(undefined)).not.toEqual(undefined);
  });
  it('0 should not be valid', function () {
    expect(validator(0)).not.toEqual(undefined);
  });
  it('1 should not be valid', function () {
    expect(validator(1)).not.toEqual(undefined);
  });
  it('-1 should not be valid', function () {
    expect(validator(-1)).not.toEqual(undefined);
  });
  it('1.123 should not be valid', function () {
    expect(validator(1.123)).not.toEqual(undefined);
  });
  it('-1.123 should not be valid', function () {
    expect(validator(-1.123)).not.toEqual(undefined);
  });
  it('{} should not be valid', function () {
    expect(validator({})).not.toEqual(undefined);
  });
  it('[] should not be valid', function () {
    expect(validator([])).not.toEqual(undefined);
  });
  it('Infinity should not be valid', function () {
    expect(validator(Infinity)).not.toEqual(undefined);
  });
  it('"1a" should not be valid', function () {
    expect(validator('ab')).not.toEqual(undefined);
  });
  it('"1ab" should be valid', function () {
    expect(validator('abc')).toEqual(undefined);
  });
});
describe('Error message is not defined', function () {
  var validator = (0, _regExp.default)(/./);
  it('Should be return default message', function () {
    expect(validator(NaN)).toEqual('Invalid value');
  });
});