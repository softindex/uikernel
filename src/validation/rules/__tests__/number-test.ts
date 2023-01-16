/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import numberValidator from '../integer';

describe('Without range and can be empty', () => {
  const validator = numberValidator(null, null, 'test');

  it('"1" should not be valid', () => {
    expect(validator('1')).not.toEqual(undefined);
  });

  it('"" should not be valid', () => {
    expect(validator('')).not.toEqual(undefined);
  });

  it('\\r\\n\\t should not be valid', () => {
    expect(validator('\r\n\t')).not.toEqual(undefined);
  });

  it('" " should not be valid', () => {
    expect(validator(' ')).not.toEqual(undefined);
  });

  it('NaN should not be valid', () => {
    expect(validator(NaN)).not.toEqual(undefined);
  });

  it('null should be valid', () => {
    expect(validator(null)).toEqual(undefined);
  });

  it('undefined should be valid', () => {
    expect(validator(undefined)).toEqual(undefined);
  });

  it('0 should be valid', () => {
    expect(validator(0)).toEqual(undefined);
  });

  it('1 should be valid', () => {
    expect(validator(1)).toEqual(undefined);
  });

  it('-1 should be valid', () => {
    expect(validator(-1)).toEqual(undefined);
  });

  it('1.123 should not be valid', () => {
    expect(validator(1.123)).not.toEqual(undefined);
  });

  it('-1.123 should not be valid', () => {
    expect(validator(-1.123)).not.toEqual(undefined);
  });

  it('{} should not be valid', () => {
    expect(validator({})).not.toEqual(undefined);
  });

  it('[] should not be valid', () => {
    expect(validator([])).not.toEqual(undefined);
  });

  it('Infinity should not be valid', () => {
    expect(validator(Infinity)).not.toEqual(undefined);
  });

  it('"1a" should not be valid', () => {
    expect(validator('ab')).not.toEqual(undefined);
  });

  it('"1ab" should not be valid', () => {
    expect(validator('abc')).not.toEqual(undefined);
  });
});

describe('Without range and can not be empty', () => {
  const validator = numberValidator.notNull(null, null, 'test');

  it('"1" should not be valid', () => {
    expect(validator('1')).not.toEqual(undefined);
  });

  it('"" should not be valid', () => {
    expect(validator('')).not.toEqual(undefined);
  });

  it('\\r\\n\\t should not be valid', () => {
    expect(validator('\r\n\t')).not.toEqual(undefined);
  });

  it('" " should not be valid', () => {
    expect(validator(' ')).not.toEqual(undefined);
  });

  it('NaN should not be valid', () => {
    expect(validator(NaN)).not.toEqual(undefined);
  });

  it('null should not be valid', () => {
    expect(validator(null)).not.toEqual(undefined);
  });

  it('undefined should not be valid', () => {
    expect(validator(undefined)).not.toEqual(undefined);
  });

  it('0 should be valid', () => {
    expect(validator(0)).toEqual(undefined);
  });

  it('1 should be valid', () => {
    expect(validator(1)).toEqual(undefined);
  });

  it('-1 should be valid', () => {
    expect(validator(-1)).toEqual(undefined);
  });

  it('1.123 should not be valid', () => {
    expect(validator(1.123)).not.toEqual(undefined);
  });

  it('-1.123 should not be valid', () => {
    expect(validator(-1.123)).not.toEqual(undefined);
  });

  it('{} should not be valid', () => {
    expect(validator({})).not.toEqual(undefined);
  });

  it('[] should not be valid', () => {
    expect(validator([])).not.toEqual(undefined);
  });

  it('Infinity should not be valid', () => {
    expect(validator(Infinity)).not.toEqual(undefined);
  });

  it('"1a" should not be valid', () => {
    expect(validator('ab')).not.toEqual(undefined);
  });

  it('"1ab" should not be valid', () => {
    expect(validator('abc')).not.toEqual(undefined);
  });
});

describe('With range [-1, 1] and can be empty', () => {
  const validator = numberValidator(-1, 1, 'test');

  it('"1" should not be valid', () => {
    expect(validator('1')).not.toEqual(undefined);
  });

  it('"" should not be valid', () => {
    expect(validator('')).not.toEqual(undefined);
  });

  it('\\r\\n\\t should not be valid', () => {
    expect(validator('\r\n\t')).not.toEqual(undefined);
  });

  it('" " should not be valid', () => {
    expect(validator(' ')).not.toEqual(undefined);
  });

  it('NaN should not be valid', () => {
    expect(validator(NaN)).not.toEqual(undefined);
  });

  it('null should be valid', () => {
    expect(validator(null)).toEqual(undefined);
  });

  it('undefined should be valid', () => {
    expect(validator(undefined)).toEqual(undefined);
  });

  it('0 should be valid', () => {
    expect(validator(0)).toEqual(undefined);
  });

  it('1 should be valid', () => {
    expect(validator(1)).toEqual(undefined);
  });

  it('1.123 should not be valid', () => {
    expect(validator(1.123)).not.toEqual(undefined);
  });

  it('-1.123 should not be valid', () => {
    expect(validator(-1.123)).not.toEqual(undefined);
  });

  it('{} should not be valid', () => {
    expect(validator({})).not.toEqual(undefined);
  });

  it('[] should not be valid', () => {
    expect(validator([])).not.toEqual(undefined);
  });

  it('Infinity should not be valid', () => {
    expect(validator(Infinity)).not.toEqual(undefined);
  });

  it('"1a" should not be valid', () => {
    expect(validator('ab')).not.toEqual(undefined);
  });

  it('"1ab" should not be valid', () => {
    expect(validator('abc')).not.toEqual(undefined);
  });
});

describe('With range [-1, 1] and can not be empty', () => {
  const validator = numberValidator.notNull(-1, 1, 'test');

  it('"1" should not be valid', () => {
    expect(validator('1')).not.toEqual(undefined);
  });

  it('"" should not be valid', () => {
    expect(validator('')).not.toEqual(undefined);
  });

  it('\\r\\n\\t should not be valid', () => {
    expect(validator('\r\n\t')).not.toEqual(undefined);
  });

  it('" " should not be valid', () => {
    expect(validator(' ')).not.toEqual(undefined);
  });

  it('NaN should not be valid', () => {
    expect(validator(NaN)).not.toEqual(undefined);
  });

  it('null should not be valid', () => {
    expect(validator(null)).not.toEqual(undefined);
  });

  it('undefined should not be valid', () => {
    expect(validator(undefined)).not.toEqual(undefined);
  });

  it('0 should be valid', () => {
    expect(validator(0)).toEqual(undefined);
  });

  it('1 should be valid', () => {
    expect(validator(1)).toEqual(undefined);
  });

  it('1.123 should not be valid', () => {
    expect(validator(1.123)).not.toEqual(undefined);
  });

  it('-1.123 should not be valid', () => {
    expect(validator(-1.123)).not.toEqual(undefined);
  });

  it('{} should not be valid', () => {
    expect(validator({})).not.toEqual(undefined);
  });

  it('[] should not be valid', () => {
    expect(validator([])).not.toEqual(undefined);
  });

  it('Infinity should not be valid', () => {
    expect(validator(Infinity)).not.toEqual(undefined);
  });

  it('"1a" should not be valid', () => {
    expect(validator('ab')).not.toEqual(undefined);
  });

  it('"1ab" should not be valid', () => {
    expect(validator('abc')).not.toEqual(undefined);
  });
});

describe('Error message is not defined', () => {
  const validator = numberValidator(null, null);
  it('Should be return default message', () => {
    expect(validator(NaN)).toEqual('Invalid number');
  });
});
