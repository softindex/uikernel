/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../../common/validation/ValidationErrors';

class FormModelMock {
  constructor() {
    this.getData = jest.fn(async function () {
      return {
        name: null,
        age: null
      };
    });

    this.submit = jest.fn(async function () {
      return {};
    });

    this.isValidRecord = jest.fn(async function () {
      return new ValidationErrors();
    });

    this.getValidationDependency = jest.fn(function () {
      return [];
    });

    this.on = jest.fn();

    this.off = jest.fn();
  }
}

export default FormModelMock;
