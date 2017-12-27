/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import notNullValidator from '../notNull.js';

describe('notNull validator', () => {
  const validator = notNullValidator('test');

  it('"1" should be valid', () => {
    expect(validator('1')).toEqual(undefined);
  });

  it('"" should not be valid', () => {
    expect(validator('')).not.toEqual(undefined);
  });

  it('\\r\\n\\t should be valid', () => {
    expect(validator('\r\n\t')).toEqual(undefined);
  });

  it('" " should be valid', () => {
    expect(validator(' ')).toEqual(undefined);
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

  it('1.123 should be valid', () => {
    expect(validator(1.123)).toEqual(undefined);
  });

  it('-1.123 should be valid', () => {
    expect(validator(-1.123)).toEqual(undefined);
  });

  it('{} should be valid', () => {
    expect(validator({})).toEqual(undefined);
  });

  it('[] should be valid', () => {
    expect(validator([])).toEqual(undefined);
  });

  it('Infinity should not be valid', () => {
    expect(validator(Infinity)).not.toEqual(undefined);
  });

  it('"1a" should be valid', () => {
    expect(validator('ab')).toEqual(undefined);
  });

  it('"1ab" should be valid', () => {
    expect(validator('abc')).toEqual(undefined);
  });
});

describe('Error message is not defined', () => {
  const validator = notNullValidator();
  it('Should be return default message', () => {
    expect(validator(NaN)).toEqual('Can not be empty');
  });
});
