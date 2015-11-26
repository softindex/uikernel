/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

var Validation = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp(/^\w{2,30}$/, 'Invalid first name.'))
  .field('age', UIKernel.Validators.number(15, 90, 'Age must be between 15 and 90'));