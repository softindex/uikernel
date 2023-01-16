/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import notEmptyValidator from '../notEmpty';

const ERROR_TEST = 'test invalid value';

describe('notEmpty validator', () => {
  const validator = notEmptyValidator(ERROR_TEST);

  it('"1" should be valid', () => {
    expect(validator('1')).toEqual(undefined);
  });

  it('"" should not be valid', () => {
    expect(validator('')).toEqual(ERROR_TEST);
  });

  it('\\r\\n\\t should not be valid', () => {
    expect(validator('\r\n\t')).toEqual(ERROR_TEST);
  });

  it('"  " should not be valid', () => {
    expect(validator(' ')).toEqual(ERROR_TEST);
  });

  it('NaN should not be valid', () => {
    expect(validator(NaN)).toEqual(ERROR_TEST);
  });

  it('null should not be valid', () => {
    expect(validator(null)).toEqual(ERROR_TEST);
  });

  it('undefined should not be valid', () => {
    expect(validator(undefined)).toEqual(ERROR_TEST);
  });

  it('0 should not be valid', () => {
    expect(validator(0)).toEqual(ERROR_TEST);
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

  it('{} should not be valid', () => {
    expect(validator({})).toEqual(ERROR_TEST);
  });

  it('[] should not be valid', () => {
    expect(validator([])).toEqual(ERROR_TEST);
  });

  it('Infinity should not be valid', () => {
    expect(validator(Infinity)).toEqual(ERROR_TEST);
  });

  it('"1a" should be valid', () => {
    expect(validator('ab')).toEqual(undefined);
  });

  it('"1ab" should be valid', () => {
    expect(validator('abc')).toEqual(undefined);
  });
});

describe('Error message is not defined', () => {
  const validator = notEmptyValidator();
  it('Should be return default message', () => {
    expect(validator(NaN)).toEqual('Can not be empty');
  });
});
