/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArgumentsError from '../../common/error/ArgumentsError';
import boolean from '../rules/boolean';
import date from '../rules/date';
import enumValidator from '../rules/enum';
import float from '../rules/float';
import integer from '../rules/integer';
import notNull from '../rules/notNull';
import regExp from '../rules/regExp';
import set from '../rules/set';
import ValidationError from '../ValidationErrors';
import Validator from '../Validator';

describe('ValidationError', () => {
  describe('Check "static createWithError" method', () => {
    it('Should create ValidationErrors instance with one error', () => {
      const validationError = ValidationError.createWithError('test', 'error');
      expect(validationError.toJSON()).toEqual({test: [{message: 'error'}]});
    });
  });

  describe('Check "add" method', () => {
    it('Should add a new error to the ValidationErrors error instance', () => {
      const validationError = ValidationError.createFromJSON<'test' | 'test2'>({test: ['error']});
      validationError.add('test2', 'error2');
      expect(validationError.toJSON()).toEqual({test: [{message: 'error'}], test2: [{message: 'error2'}]});
    });
  });

  describe('Check "hasError" method', () => {
    it('Should return true if the ValidationErrors instance has an error for a given field', () => {
      const validationError = ValidationError.createFromJSON({test: ['error']});
      expect(validationError.hasError('test')).toBeTruthy();
    });
  });

  describe('Check "getFieldErrorMessages" method', () => {
    it('Should return an array of error messages for a given field', () => {
      const validationError = ValidationError.createFromJSON({test: ['error']});
      expect(validationError.getFieldErrorMessages('test')).toEqual(['error']);
    });
  });

  describe('Check "getFailedFields" method', () => {
    it('Should return an array of failed field keys', () => {
      const validationError = ValidationError.createFromJSON({test: ['error']});
      expect(validationError.getFailedFields()).toEqual(['test']);
    });
  });

  describe('Check "isEmpty" method', () => {
    it('Should return true if ValidationErrors instance is empty', () => {
      const validationError = ValidationError.createFromJSON({test: ['error']});
      expect(validationError.isEmpty()).not.toBeTruthy();
    });
  });

  describe('Check "clearField" method', () => {
    it('Should remove all error messages for a given field', () => {
      const validationError = ValidationError.createFromJSON({test: ['error']});
      expect(validationError.clearField('test').toJSON()).toEqual({});
    });
  });

  describe('Check "clear" method', () => {
    it('Should remove all error messages in ValidationErrors instance', () => {
      const validationError = ValidationError.createFromJSON({test: ['error']});
      expect(validationError.clear().toJSON()).toEqual({});
    });
  });

  describe('Check "clone" method', () => {
    it('Should create a deep copy of ValidationErrors instance', () => {
      const validationError = ValidationError.createFromJSON({test: ['error']});
      expect(validationError.clone()).not.toBe(validationError);
      expect(validationError.clone().toJSON()).toEqual({test: [{message: 'error'}]});
    });
  });

  describe('Check "merge" method', () => {
    it('Should merge error messages from another ValidationErrors instance', () => {
      const validationError = ValidationError.createFromJSON<'test' | 'test2'>({test: ['error']});
      const errorToMerge = ValidationError.createFromJSON({test2: [{message: 'error2'}]});
      expect(validationError.merge(errorToMerge).toJSON()).toEqual({
        test: [{message: 'error'}],
        test2: [{message: 'error2'}]
      });
    });
  });
});

describe('UIKernel validation functions', () => {
  it('boolean', () => {
    const validator = boolean('err text');
    const validatorNotNull = boolean.notNull('err text');
    expect(validator(true)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(false)).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull(undefined)).toBe('err text');
  });

  it('date', () => {
    const validator = date(0, 500000, 'err text');
    const validatorNotNull = date.notNull(0, 500000, 'err text');
    expect(validator(245545)).toBeUndefined();
    expect(validator('1979-12-31T23:10:00.000Z')).toBe('err text');
    expect(validatorNotNull('1970-01-01T01:00:00.000Z')).toBe('err text');
    expect(validatorNotNull('1970-01-01T03:00:00.000Z')).toBeUndefined();
    expect(validatorNotNull(600000)).toBe('err text');
    expect(validatorNotNull(undefined)).toBe('err text');
  });

  it('enum', () => {
    const validator = enumValidator(['a', 'b', 'c'], 'err text');
    const validatorNotNull = enumValidator.notNull(['a', 'b', 'c'], 'err text');
    expect(validator('a')).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull('b')).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull(undefined)).toBe('err text');
  });

  it('float', () => {
    const validator = float(3, 10, 'err text');
    const validatorNotNull = float.notNull(3, 10, 'err text');
    expect(validator(4)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(7)).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull(undefined)).toBe('err text');
  });

  it('notNull', () => {
    const validator = notNull('err text');
    expect(validator(4)).toBeUndefined();
    expect(validator(null)).toBe('err text');
  });

  it('integer', () => {
    const validator = integer(3, 10, 'err text');
    const validatorNotNull = integer.notNull(3, 10, 'err text');
    expect(validator(4)).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull(7)).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull(undefined)).toBe('err text');
  });

  it('regExp', () => {
    const validator = regExp(/abc/, 'err text');
    const validatorNotNull = regExp.notNull(/abc/, 'err text');
    expect(validator('abcd')).toBeUndefined();
    expect(validator('rtrtr')).toBe('err text');
    expect(validatorNotNull('abcd')).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull(undefined)).toBe('err text');
  });

  it('set', () => {
    const validator = set(['a', 'b', 'c'], 'err text');
    const validatorNotNull = set.notNull(['a', 'b', 'c'], 'err text');
    expect(validator(['a'])).toBeUndefined();
    expect(validator(['a', 'rtrtr'])).toBe('err text');
    expect(validatorNotNull(['b'])).toBeUndefined();
    expect(validatorNotNull(34)).toBe('err text');
    expect(validatorNotNull(undefined)).toBe('err text');
  });
});

describe('Validator', () => {
  const validatorBoolean = boolean('err text');
  let validator: Validator<Record<string, unknown>>;
  beforeEach(() => {
    validator = new Validator();
  });

  describe('Check "field" method', () => {
    it('Should add field sync validator', async () => {
      validator.field('name', validatorBoolean);
      let result = await validator.isValidRecord({name: true});
      expect(result.toJSON()).toEqual({});
      result = await validator.isValidRecord({name: 6456});
      expect(result.toJSON()).toEqual({name: [{message: 'err text'}]});
    });
  });

  describe('Check "getValidationDependency" method', () => {
    it('Should return list of dependent fields', async () => {
      const groupValidationFunction = <TRecord extends Record<string, unknown>>(
        data: Partial<TRecord>,
        errors: ValidationError<keyof TRecord & string>
      ): void => {
        if (data.password !== data.passwordConfirm) {
          errors.add('passwordConfirm', "Passwords don't match");
        }
      };
      validator.fields(['password', 'passwordConfirm'], groupValidationFunction);
      const dependentFields = validator.getValidationDependency(['passwordConfirm']);
      expect(dependentFields).toEqual(['password']);
    });
  });

  describe('Check "isValidRecord" method', () => {
    it('Should return {} if client record is valid', async () => {
      validator.field('name', validatorBoolean);
      const result = await validator.isValidRecord({name: true});
      expect(result.toJSON()).toEqual({});
    });

    it('Should return errors if client record is not valid', async () => {
      validator.field('name', validatorBoolean);
      const result = await validator.isValidRecord({name: 6456});
      expect(result.toJSON()).toEqual({name: [{message: 'err text'}]});
    });
    it('Should return {} if all additional values are passed', async () => {
      const groupValidationFunction = <TRecord extends Record<string, unknown>>(
        data: Partial<TRecord>,
        errors: ValidationError<keyof TRecord & string>
      ): void => {
        if (data.password !== data.passwordConfirm) {
          errors.add('passwordConfirm', "Passwords don't match");
        }
      };
      validator.fields(['password', 'passwordConfirm'], groupValidationFunction);
      const result = await validator.isValidRecord({password: 'password', passwordConfirm: 'password'});
      expect(result.toJSON()).toEqual({});
    });
    it('Should return {} if some additional values are not passed', async () => {
      const groupValidationFunction = <TRecord extends Record<string, unknown>>(
        data: Partial<TRecord>,
        errors: ValidationError<keyof TRecord & string>
      ): void => {
        if (data.password !== data.passwordConfirm) {
          errors.add('passwordConfirm', "Passwords don't match");
        }
      };
      const checkPassword = async (): Promise<void> => {
        validator.fields(['password', 'passwordConfirm'], groupValidationFunction);
        await validator.isValidRecord({password: 'password'});
      };
      await expect(checkPassword).rejects.toThrow(
        new ArgumentsError('Not enough fields for validator: passwordConfirm')
      );
    });
  });
});
