/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import floatValidator from '../float';

const testValidator = floatValidator(null, null, 'test');
describe('Float validator', () => {
  it('"  "   is not valid', () => {
    expect(testValidator(' ')).not.toEqual(undefined);
  });

  it('Nan is not valid', () => {
    expect(testValidator(NaN)).not.toEqual(undefined);
  });
});
