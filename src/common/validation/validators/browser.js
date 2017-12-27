/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import callbackify from '../../callbackify';
import toPromise from '../../toPromise';
import defaultXhr from '../../defaultXhr';
import ValidationErrors from '../ValidationErrors';
import Validator from './common';

class ClientValidator extends Validator {
  /**
   * Get validator.
   *
   * @param {string}  serverValidationUrl
   * @param {{}}      xhr
   *
   * @return {Validator}
   */
  constructor(serverValidationUrl, xhr) {
    super();
    this._settings.serverValidationUrl = serverValidationUrl;
    this._settings.xhr = xhr || defaultXhr;
  }

  static create(serverValidationUrl, xhr) {
    return new ClientValidator(serverValidationUrl, xhr);
  }

}

ClientValidator.prototype.isValidRecord = callbackify(async function(record) {
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
});

export default ClientValidator;
