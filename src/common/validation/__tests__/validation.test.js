/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationError from '../ValidationErrors';

import boolean from '../validators/boolean';
import date from '../validators/date';
import enumValidator from '../validators/enum';
import float from '../validators/float';
import notNull from '../validators/notNull';
import number from '../validators/number';
import regExp from '../validators/regExp';
import set from '../validators/set';

import Validator from '../Validator/common';

describe('ValidationError', () => {
  let validationError;
  beforeEach(() => {
    validationError = ValidationError.createFromJSON({test: ['error']});
  });

  it('add', () => {
    validationError.add('test2', 'error2');
    expect(validationError.toJSON()).toEqual({test: ['error'], test2: ['error2']});
  });

  it('hasError', () => {
    expect(validationError.hasError('test')).toBeTruthy();
  });

  it('getFieldErrors', () => {
    expect(validationError.getFieldErrors('test')).toEqual(['error']);
  });

  it('getFailedFields', () => {
    expect(validationError.getFailedFields()).toEqual(['test']);
  });

  it('isEmpty', () => {
    expect(validationError.isEmpty()).not.toBeTruthy();
  });

  it('clearField', () => {
    expect(validationError.clearField('test').toJSON()).toEqual({});
  });

  it('clear', () => {
    expect(validationError.clear().toJSON()).toEqual({});
  });

  it('clone', () => {
    expect(validationError.clone()).not.toBe(validationError);
    expect(validationError.clone().toJSON()).toEqual({test: ['error']});
  });
});

describe('validators', () => {
  it('boolean', () => {
    const validator = boolean('err text');
    const validatorNotNull = boolean.notNull('err text');
    expect(validator(true)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(false)).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('date', () => {
    const validator = date(0, 500000, 'err text');
    const validatorNotNull = date.notNull(0, 500000, 'err text');
    expect(validator(245545)).toBeUndefined();
    expect(validator('1979-12-31T23:10:00.000Z')).toBe('err text');
    expect(validatorNotNull('1970-01-01T01:00:00.000Z')).toBeUndefined();
    expect(validatorNotNull(600000)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('enum', () => {
    const validator = enumValidator(['a', 'b', 'c'], 'err text');
    const validatorNotNull = enumValidator.notNull(['a', 'b', 'c'], 'err text');
    expect(validator('a')).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull('b')).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('float', () => {
    const validator = float(3, 10, 'err text');
    const validatorNotNull = float.notNull(3, 10, 'err text');
    expect(validator(4)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(7, 5)).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('notNull', () => {
    const validator = notNull('err text');
    expect(validator(4)).toBeUndefined();
    expect(validator(null)).toBe('err text');
  });

  it('number', () => {
    const validator = number(3, 10, 'err text');
    const validatorNotNull = number.notNull(3, 10, 'err text');
    expect(validator(4)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(7)).toBeUndefined();
    expect(validatorNotNull(34, 5)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('regExp', () => {
    const validator = regExp(/abc/, 'err text');
    const validatorNotNull = regExp.notNull(/abc/, 'err text');
    expect(validator('abcd')).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull('abcd')).toBeUndefined();
    expect(validatorNotNull(34, 5)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });

  it('set', () => {
    const validator = set(['a', 'b', 'c'], 'err text');
    const validatorNotNull = set.notNull(['a', 'b', 'c'], 'err text');
    expect(validator(['a'])).toBeUndefined();
    expect(validator(['a', 'rtrtr'])).toBe('err text');
    expect(validatorNotNull(['b'])).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull()).toBe('err text');
  });
});

describe('Validator', () => {
  const validatorBoolean = boolean('err text');
  let validator;
  beforeEach(() => {
    validator = new Validator();
  });

  it('field', async () => {
    validator.field('name', validatorBoolean);
    let result = await validator.isValidRecord({name: true});
    expect(result.toJSON()).toEqual({});
    result = await validator.isValidRecord({name: 6456});
    expect(result.toJSON()).toEqual({'name': ['err text']});
  });

  it('field', async () => {
    validator.field('name', validatorBoolean);
    let result = await validator.isValidRecord({name: true});
    expect(result.toJSON()).toEqual({});
    result = await validator.isValidRecord({name: 6456});
    expect(result.toJSON()).toEqual({'name': ['err text']});
  });
});
