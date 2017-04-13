/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import numberValidator from '../number';

const testValidator = numberValidator(null, null, 'test');

describe('Number validator', () => {
  it('"  " is not valid', () => {
    expect(testValidator('  ')).not.toEqual(undefined);
  });

  it('"1" is not valid', () => {
    expect(testValidator('1')).not.toEqual(undefined);
  });

  it('1 is valid', () => {
    expect(testValidator(1)).toEqual(undefined);
  });
});
