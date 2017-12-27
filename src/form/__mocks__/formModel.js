/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../../common/validation/ValidationErrors';

const formModelMock = {
  getData: jest.fn(async function () {
    return {
      name: null,
      age: null
    };
  }),
  submit: jest.fn(async function () {
    return {};
  }),
  isValidRecord: jest.fn(async function () {
    return new ValidationErrors();
  }),
  getValidationDependency: jest.fn(function () {
    return [];
  }),
  on: jest.fn(),
  off: jest.fn()
};

export default formModelMock;
