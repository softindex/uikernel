/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var model = new UIKernel.Models.Grid.Collection({
  data: [
    [1, {'id': 1, 'name': 'Stacey', 'age': 22}],
    [2, {'id': 2, 'name': 'Adam',   'age': 43}],
    [3, {'id': 3, 'name': 'Deanna', 'age': 21}]
  ],
  validation: Validation
});