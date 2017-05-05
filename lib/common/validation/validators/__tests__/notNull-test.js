/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var _notNull = require('../notNull.js');

var _notNull2 = _interopRequireDefault(_notNull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('notNull validator', function () {
  var validator = (0, _notNull2.default)('test');

  it('"1" should be valid', function () {
    expect(validator('1')).toEqual(undefined);
  });

  it('"" should not be valid', function () {
    expect(validator('')).not.toEqual(undefined);
  });

  it('" " should be valid', function () {
    expect(validator(' ')).toEqual(undefined);
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

  it('0 should be valid', function () {
    expect(validator(0)).toEqual(undefined);
  });

  it('1 should be valid', function () {
    expect(validator(1)).toEqual(undefined);
  });

  it('-1 should be valid', function () {
    expect(validator(-1)).toEqual(undefined);
  });

  it('1.123 should be valid', function () {
    expect(validator(1.123)).toEqual(undefined);
  });

  it('-1.123 should be valid', function () {
    expect(validator(-1.123)).toEqual(undefined);
  });

  it('{} should be valid', function () {
    expect(validator({})).toEqual(undefined);
  });

  it('[] should be valid', function () {
    expect(validator([])).toEqual(undefined);
  });

  it('Infinity should not be valid', function () {
    expect(validator(Infinity)).not.toEqual(undefined);
  });

  it('"1a" should be valid', function () {
    expect(validator('ab')).toEqual(undefined);
  });

  it('"1ab" should be valid', function () {
    expect(validator('abc')).toEqual(undefined);
  });
}); /**
     * Copyright (с) 2015-present, SoftIndex LLC.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree.
     */

describe('Error message is not defined', function () {
  var validator = (0, _notNull2.default)();
  it('Should be return default message', function () {
    expect(validator(NaN)).toEqual('Can not be empty');
  });
});