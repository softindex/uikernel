/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import UIKernel from 'uikernel';

const model = new UIKernel.Models.Grid.Collection({
  data: [
    [1, {id: 1, name: "Sonya", surname: "Weaver", phone: "555-0159", age: 59, gender: 2}],
    [2, {id: 2, name: "Bates", surname: "Weaver", phone: "555-0144", age: 54, gender: 2}],
    [3, {id: 3, name: "Rodriguez", surname: "Terrell", phone: "555-0146", age: 40, gender: 1}]
    // ...
  ]
});

export default model
