/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../../common/validation/ValidationErrors';

const data = {
  name: '',
  surname: '',
  phone: '',
  age: '',
  gender: 1
};

module.exports = {
  getData: function () {
    return data;
  },
  submit: function (data) {
    if (data.name === 'Error') {
      throw ValidationErrors.createFromJSON({name: 'error in name'});
    }
  },
  isValidRecord: function (data) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (!data.name === 'globalError') {
          reject(new Error('Global error exist'));
          return;
        }
        if (data.name === 'Error') {
          resolve(ValidationErrors.createFromJSON({name: 'error in name'}));
          return;
        }
        resolve(new ValidationErrors());
      });
    });
  },
  getValidationDependency: function () {
    return [];
  },
  on: jest.fn(),
  off: jest.fn()
};