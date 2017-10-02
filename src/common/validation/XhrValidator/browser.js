/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import toPromise from '../../toPromise';
import defaultXhr from '../../defaultXhr';
import ValidationErrors from '../ValidationErrors';
import Validator from '../Validator/common';

class ClientValidator extends Validator {
  /**
   * Get validator.
   *
   * @param String      serverValidationUrl
   * @param {Validator}      commonValidator
   * @param {{}}      xhr
   *
   * @return {Validator}
   */
  constructor(serverValidationUrl, commonValidator, xhr) {
    super();
    this._settings.serverValidationUrl = serverValidationUrl;
    this._settings.xhr = xhr || defaultXhr;
    this._commonValidator = commonValidator;
  }

  static create(serverValidationUrl, commonValidator, xhr) {
    return new ClientValidator(serverValidationUrl, commonValidator, xhr);
  }

  async isValidRecord(record) {
    return await this._isValidRecord.bind(this._commonValidator)(record);
  }

  async _isValidRecord(record) {
    if (!this._settings.serverValidationUrl) {
      return await this::Validator.prototype.isValidRecord(record);
    }

    let xhrResult;
    try {
      xhrResult = await toPromise(this._settings.xhr.bind(this._settings))({
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(record),
        uri: this._settings.serverValidationUrl
      });
    } catch (err) {
      if (err.statusCode === 413) {
        // When request exceeds server limits and
        // client validators are able to find errors,
        // we need to return these errors
        const validationErrors = await this::Validator.prototype.isValidRecord(record);
        if (!validationErrors.isEmpty()) {
          return validationErrors;
        }
      }
      throw err;
    }

    return ValidationErrors.createFromJSON(JSON.parse(xhrResult));
  }

  getValidationDependency(fields) {
    return super.getValidationDependency.bind(this._commonValidator)(fields);
  }
}

export default ClientValidator;
