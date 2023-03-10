/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import notNullValidator from '../notNull';

describe('notNull validator', () => {
  const validator = notNullValidator('test');

  it('"1" should be valid', () => {
    expect(validator('1')).toBeUndefined();
  });

  it('"" should not be valid', () => {
    expect(validator('')).toBeDefined();
  });

  it('\\r\\n\\t should be valid', () => {
    expect(validator('\r\n\t')).toBeUndefined();
  });

  it('" " should be valid', () => {
    expect(validator(' ')).toBeUndefined();
  });

  it('NaN should not be valid', () => {
    expect(validator(NaN)).toBeDefined();
  });

  it('null should not be valid', () => {
    expect(validator(null)).toBeDefined();
  });

  it('undefined should not be valid', () => {
    expect(validator(undefined)).toBeDefined();
  });

  it('0 should be valid', () => {
    expect(validator(0)).toBeUndefined();
  });

  it('1 should be valid', () => {
    expect(validator(1)).toBeUndefined();
  });

  it('-1 should be valid', () => {
    expect(validator(-1)).toBeUndefined();
  });

  it('1.123 should be valid', () => {
    expect(validator(1.123)).toBeUndefined();
  });

  it('-1.123 should be valid', () => {
    expect(validator(-1.123)).toBeUndefined();
  });

  it('{} should be valid', () => {
    expect(validator({})).toBeUndefined();
  });

  it('[] should be valid', () => {
    expect(validator([])).toBeUndefined();
  });

  it('Infinity should not be valid', () => {
    expect(validator(Infinity)).toBeDefined();
  });

  it('"1a" should be valid', () => {
    expect(validator('ab')).toBeUndefined();
  });

  it('"1ab" should be valid', () => {
    expect(validator('abc')).toBeUndefined();
  });
});

describe('Error message is not defined', () => {
  const validator = notNullValidator();
  it('Should be return default message', () => {
    expect(validator(NaN)).toBe('Can not be empty');
  });
});
