/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

var validation = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp(/^\w{2,30}$/, 'Invalid first name.'))
  .field('surname', UIKernel.Validators.regExp(/^\w{2,30}$/, 'Invalid last name.'))
  .field('phone', UIKernel.Validators.regExp(/^(\d{3}-)?\d{2,10}$/, 'Invalid phone number.'))
  .field('age', UIKernel.Validators.regExp(/^[^0]\d{0,2}$/, 'Invalid age.'))
  .field('gender', UIKernel.Validators.regExp(/^[12]$/, 'Invalid gender.'));
