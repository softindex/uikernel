/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const validator = UIKernel.createValidator()
  .field('country', UIKernel.Validators.notNull('Invalid country.'));
