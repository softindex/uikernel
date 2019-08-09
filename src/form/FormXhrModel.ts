/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../common/validation/ValidationErrors';
import Validator from '../common/validation/Validator';
import defaultXhr from '../common/defaultXhr';
import EventsModel from '../common/Events';
import url from 'url';

export type FormXhrModelSettings = {
  api: string,
  validator: Validator,
  xhr: any
};

class FormXhrModel extends EventsModel {
  private readonly _apiUrl: string;
  private _validator: Validator;
  private readonly _xhr: any;

  constructor(settings: FormXhrModelSettings) {
    super();

    if (!settings.api) {
      throw Error('Initialization problem: \'api\' must be specified.');
    }

    this._validator = settings.validator || new Validator();
    this._xhr = settings.xhr || defaultXhr;
    this._apiUrl = settings.api
      .replace(/([^/])\?/, '$1/?') // Add "/" before "?"
      .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
  }

  async getData(fields: string[]) {
    const parsedUrl = url.parse(this._apiUrl, true);
    parsedUrl.query.fields = JSON.stringify(fields);
    delete parsedUrl.search;

    const response = await this._xhr({
      method: 'GET',
      uri: url.format(parsedUrl)
    });

    return JSON.parse(response);
  }

  async submit(changes: {[index: string]: any}) {
    let body = await this._xhr({
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      uri: this._apiUrl,
      body: JSON.stringify(changes)
    });

    body = JSON.parse(body);

    if (body.error) {
      throw ValidationErrors.createFromJSON(body.error);
    }

    this.trigger('update', body.data);
    return body.data;
  }

  /**
   * Validation check
   *
   * @param {Object}      record
   */
  isValidRecord(record: object) {
    return this._validator.isValidRecord(record);
  }

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields   Fields list
   * @returns {Array}  Dependencies
   */
  getValidationDependency(fields: string[]) {
    return this._validator.getValidationDependency(fields);
  }
}

export default FormXhrModel;
