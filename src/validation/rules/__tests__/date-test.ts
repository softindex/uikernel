/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dateValidator from '../date';

describe('Can be empty', () => {
  it('null should be valid', () => {
    expect(dateValidator(null, null, 'test')(null)).toBeUndefined();
  });

  it('"" should be invalid', () => {
    expect(dateValidator(null, null, 'test')('')).toBe('test');
  });

  it('Should not return error if date correct', () => {
    expect(dateValidator(null, null, 'test')('2018-01-02')).toBeUndefined();
    expect(dateValidator(null, null, 'test')(new Date('2018-01-02'))).toBeUndefined();
    expect(dateValidator(null, null, 'test')(new Date())).toBeUndefined();
    expect(dateValidator(null, null, 'test')(Date.now())).toBeUndefined();
  });

  it('Should return error if date incorrect', () => {
    expect(dateValidator(null, null, 'error msg')('abc')).toBe('error msg');
    expect(dateValidator(null, null, 'error msg')(true)).toBe('error msg');
    expect(dateValidator(null, null, 'error msg')(false)).toBe('error msg');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(dateValidator(null, null, 'error msg')(function () {})).toBe('error msg');
    expect(dateValidator(null, null, 'error msg')([])).toBe('error msg');
  });

  it('Should return error if date < minDate', () => {
    expect(dateValidator('2018-01-10', null, 'test')('2018-01-02')).toBe('test');
  });

  it('Should not return error if date <= minDate', () => {
    expect(dateValidator('2018-01-10', null, 'test')('2018-01-10')).toBeUndefined();
  });

  it('Should not return error if date > minDate', () => {
    expect(dateValidator('2018-01-10', null, 'test')('2018-01-11')).toBeUndefined();
  });

  it('Should return error if date > maxDate', () => {
    expect(dateValidator(null, '2018-01-02', 'test')('2018-01-10')).toBe('test');
  });

  it('Should not return error if date >= maxDate', () => {
    expect(dateValidator(null, '2018-01-10', 'test')('2018-01-10')).toBeUndefined();
  });

  it('Should not return error if date < maxDate', () => {
    expect(dateValidator(null, '2018-01-10', 'test')('2018-01-02')).toBeUndefined();
  });

  it('Should not return error if date < maxDate && date > minDate', () => {
    expect(dateValidator('2018-01-10', '2018-01-20', 'test')('2018-01-15')).toBeUndefined();
  });
});

describe('Can not be empty', () => {
  it('null should be invalid', () => {
    expect(dateValidator.notNull(null, null, 'test')(null)).toBe('test');
  });

  it('"" should be invalid', () => {
    expect(dateValidator.notNull(null, null, 'test')('')).toBe('test');
  });

  it('Should not return error if date correct', () => {
    expect(dateValidator.notNull(null, null, 'test')('2018-01-02')).toBeUndefined();
    expect(dateValidator.notNull(null, null, 'test')(new Date('2018-01-02'))).toBeUndefined();
    expect(dateValidator.notNull(null, null, 'test')(new Date())).toBeUndefined();
    expect(dateValidator.notNull(null, null, 'test')(Date.now())).toBeUndefined();
  });

  it('Should return error if date incorrect', () => {
    expect(dateValidator.notNull(null, null, 'test')('abc')).toBe('test');
  });

  it('Should return error if date < minDate', () => {
    expect(dateValidator.notNull('2018-01-10', null, 'test')('2018-01-02')).toBe('test');
  });

  it('Should not return error if date <= minDate', () => {
    expect(dateValidator.notNull('2018-01-10', null, 'test')('2018-01-10')).toBeUndefined();
  });

  it('Should not return error if date > minDate', () => {
    expect(dateValidator.notNull('2018-01-10', null, 'test')('2018-01-11')).toBeUndefined();
  });

  it('Should return error if date > maxDate', () => {
    expect(dateValidator.notNull(null, '2018-01-02', 'test')('2018-01-10')).toBe('test');
  });

  it('Should not return error if date >= maxDate', () => {
    expect(dateValidator.notNull(null, '2018-01-10', 'test')('2018-01-10')).toBeUndefined();
  });

  it('Should not return error if date < maxDate', () => {
    expect(dateValidator.notNull(null, '2018-01-10', 'test')('2018-01-02')).toBeUndefined();
  });

  it('Should not return error if date < maxDate && date > minDate', () => {
    expect(dateValidator.notNull('2018-01-10', '2018-01-20', 'test')('2018-01-15')).toBeUndefined();
  });
});

describe('Error message is not defined', () => {
  const validator = dateValidator(undefined, undefined);
  it('Should be return default message', () => {
    expect(validator('abc')).toBe('Invalid date');
  });
});
