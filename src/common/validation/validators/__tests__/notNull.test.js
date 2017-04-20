/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import notNullValidator from '../notNull.js';

describe('notNullValidator', () => {
  const validator = notNullValidator('test');

  it('"" should not be valid', () => {
    expect(validator('')).not.toEqual(undefined);
  });

  it('"null" should not be valid', () => {
    expect(validator(null)).not.toEqual(undefined);
  });

  it('"undefined" should not be valid', () => {
    expect(validator(undefined)).not.toEqual(undefined);
  });

  it('" " should be valid', () => {
    expect(validator(' ')).toEqual(undefined);
  });

  it('1 should be valid', () => {
    expect(validator(1)).toEqual(undefined);
  });

  it('Object should be valid', () => {
    expect(validator({})).toEqual(undefined);
  });
});
