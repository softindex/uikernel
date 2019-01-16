/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dateValidator from '../date';

describe('Can be empty', () => {
  it('null should be valid', () => {
    expect(dateValidator(null, null, 'test')(null)).toEqual(undefined);
  });

  it('"" should be invalid', () => {
    expect(dateValidator(null, null, 'test')('')).toEqual('test');
  });

  it('Should not return error if date correct', () => {
    expect(dateValidator(null, null, 'test')('2018-01-02')).toEqual(undefined);
    expect(dateValidator(null, null, 'test')(new Date('2018-01-02'))).toEqual(undefined);
    expect(dateValidator(null, null, 'test')(new Date())).toEqual(undefined);
    expect(dateValidator(null, null, 'test')(Date.now())).toEqual(undefined);
  });

  it('Should return error if date incorrect', () => {
    expect(dateValidator(null, null, 'error msg')('abc')).toEqual('error msg');
    expect(dateValidator(null, null, 'error msg')(true)).toEqual('error msg');
    expect(dateValidator(null, null, 'error msg')(false)).toEqual('error msg');
    expect(dateValidator(null, null, 'error msg')(function () {})).toEqual('error msg');
    expect(dateValidator(null, null, 'error msg')([])).toEqual('error msg');
  });

  it('Should return error if date < minDate', () => {
    expect(dateValidator('2018-01-10', null, 'test')('2018-01-02')).toEqual('test');
  });

  it('Should not return error if date <= minDate', () => {
    expect(dateValidator('2018-01-10', null, 'test')('2018-01-10')).toEqual(undefined);
  });

  it('Should not return error if date > minDate', () => {
    expect(dateValidator('2018-01-10', null, 'test')('2018-01-11')).toEqual(undefined);
  });

  it('Should return error if date > maxDate', () => {
    expect(dateValidator(null, '2018-01-02', 'test')('2018-01-10')).toEqual('test');
  });

  it('Should not return error if date >= maxDate', () => {
    expect(dateValidator(null, '2018-01-10', 'test')('2018-01-10')).toEqual(undefined);
  });

  it('Should not return error if date < maxDate', () => {
    expect(dateValidator(null, '2018-01-10', 'test')('2018-01-02')).toEqual(undefined);
  });

  it('Should not return error if date < maxDate && date > minDate', () => {
    expect(dateValidator('2018-01-10', '2018-01-20', 'test')('2018-01-15')).toEqual(undefined);
  });
});

describe('Can not be empty', () => {
  it('null should be invalid', () => {
    expect(dateValidator.notNull(null, null, 'test')(null)).toEqual('test');
  });

  it('"" should be invalid', () => {
    expect(dateValidator.notNull(null, null, 'test')('')).toEqual('test');
  });

  it('Should not return error if date correct', () => {
    expect(dateValidator.notNull(null, null, 'test')('2018-01-02')).toEqual(undefined);
    expect(dateValidator.notNull(null, null, 'test')(new Date('2018-01-02'))).toEqual(undefined);
    expect(dateValidator.notNull(null, null, 'test')(new Date())).toEqual(undefined);
    expect(dateValidator.notNull(null, null, 'test')(Date.now())).toEqual(undefined);
  });

  it('Should return error if date incorrect', () => {
    expect(dateValidator.notNull(null, null, 'test')('abc')).toEqual('test');
  });

  it('Should return error if date < minDate', () => {
    expect(dateValidator.notNull('2018-01-10', null, 'test')('2018-01-02')).toEqual('test');
  });

  it('Should not return error if date <= minDate', () => {
    expect(dateValidator.notNull('2018-01-10', null, 'test')('2018-01-10')).toEqual(undefined);
  });

  it('Should not return error if date > minDate', () => {
    expect(dateValidator.notNull('2018-01-10', null, 'test')('2018-01-11')).toEqual(undefined);
  });

  it('Should return error if date > maxDate', () => {
    expect(dateValidator.notNull(null, '2018-01-02', 'test')('2018-01-10')).toEqual('test');
  });

  it('Should not return error if date >= maxDate', () => {
    expect(dateValidator.notNull(null, '2018-01-10', 'test')('2018-01-10')).toEqual(undefined);
  });

  it('Should not return error if date < maxDate', () => {
    expect(dateValidator.notNull(null, '2018-01-10', 'test')('2018-01-02')).toEqual(undefined);
  });

  it('Should not return error if date < maxDate && date > minDate', () => {
    expect(dateValidator.notNull('2018-01-10', '2018-01-20', 'test')('2018-01-15')).toEqual(undefined);
  });
});

describe('Error message is not defined', () => {
  const validator = dateValidator(/./);
  it('Should be return default message', () => {
    expect(validator('abc')).toEqual('Invalid date');
  });
});
