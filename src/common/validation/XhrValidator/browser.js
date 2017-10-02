/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import defaultXhr from '../../defaultXhr';
import ValidationErrors from '../ValidationErrors';
import Validator from '../Validator/common';

class ClientValidator extends Validator {
  /**
   * Get validator.
   *
   * @param {string}        validationUrl
   * @param {Validator}     validator
   * @param {{}}      xhr
   *
   * @return {Validator}
   */
  constructor(validationUrl, validator, xhr) {
    super();
    this._settings.validationUrl = validationUrl;
    this._settings.xhr = xhr || defaultXhr;
    this._validator = validator;
  }

  async isValidRecord(record) {
    let xhrResult;
    try {
      xhrResult = await this._settings.xhr({
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(record),
        uri: this._settings.validationUrl
      });
    } catch (err) {
      if (err.statusCode === 413) {
        // When request exceeds server limits and
        // client validators are able to find errors,
        // we need to return these errors
        const validationErrors = await this._validator::Validator.prototype.isValidRecord(record);
        if (!validationErrors.isEmpty()) {
          return validationErrors;
        }
      }
      throw err;
    }

    return ValidationErrors.createFromJSON(JSON.parse(xhrResult));
  }

  getValidationDependency(fields) {
    return this._validator::super.getValidationDependency(fields);
  }
}

export default ClientValidator;
