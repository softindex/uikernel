/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../ValidationErrors';

class ValidatorMock {
  constructor() {
    this.field = jest.fn(() => this);
    this.fields = jest.fn(() => this);
    this.asyncDependence = jest.fn(() => this);
    this.asyncField = jest.fn(() => this);
    this.asyncFields = jest.fn(() => this);
    this.getValidationDependency = jest.fn(() => []);
    this.isValidRecord = jest.fn(async () => await new ValidationErrors()); // or throw new ArgumentsError
  }
}

export default ValidatorMock;
