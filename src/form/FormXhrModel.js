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

const MAX_URI_LENGTH = 2048;

class FormXhrModel extends EventsModel {
  constructor(settings) {
    super();

    if (!settings.api) {
      throw new Error('Initialization problem: \'api\' must be specified.');
    }

    this._multipartFormDataEncoded = settings.multipartFormData || false;
    this._validator = settings.validator || new Validator();
    this._validateOnClient = settings.validateOnClient || false;
    this._xhr = settings.xhr || defaultXhr;
    this._apiUrl = settings.api
      .replace(/([^/])\?/, '$1/?') // Add "/" before "?"
      .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
  }

  async getData(fields) {
    const parsedUrl = url.parse(this._apiUrl, true);
    parsedUrl.query.fields = JSON.stringify(fields);
    delete parsedUrl.search;

    if (url.format(parsedUrl).length > MAX_URI_LENGTH) {
      return await this._getDataPostRequest(fields);
    }

    const response = await this._xhr({
      method: 'GET',
      uri: url.format(parsedUrl)
    });

    return JSON.parse(response);
  }

  async submit(record) {
    const formData = new FormData();

    if (this._multipartFormDataEncoded) {
      const ordinaryData = {};
      for (const [prop, value] of Object.entries(record)) {
        if (value instanceof File) {
          formData.append(JSON.stringify(prop), value);
        } else {
          ordinaryData[prop] = value;
        }
      }
      formData.append('rest', JSON.stringify(ordinaryData));
    }

    let body = await this._xhr({
      method: 'POST',
      ...!this._multipartFormDataEncoded && {
        headers: {
          'Content-type': 'application/json'
        }
      },
      uri: this._apiUrl,
      body: this._multipartFormDataEncoded ? formData : JSON.stringify(record)
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
  async isValidRecord(record, recordId) {
    if (this._validateOnClient) {
      return this._validator.isValidRecord(record);
    }
    const parsedUrl = url.parse(this._apiUrl, true);
    parsedUrl.pathname = url.resolve(parsedUrl.pathname, 'validation');

    let response;
    try {
      response = await this._xhr({
        method: 'POST',
        uri: url.format(parsedUrl),
        body: {
          record,
          id: recordId
        },
        json: true
      });
    } catch (err) {
      if (err.statusCode === 413) {
        // When request exceeds server limits and
        // client validators are able to find errors,
        // we need to return these errors{
        const validationErrors = await this._validator.isValidRecord(record);
        if (!validationErrors.isEmpty()) {
          return validationErrors;
        }
      }
      throw err;
    }

    return ValidationErrors.createFromJSON(response);
  }

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields   Fields list
   * @returns {Array}  Dependencies
   */
  getValidationDependency(fields) {
    return this._validator.getValidationDependency(fields);
  }

  async _getDataPostRequest(fields) {
    const parsedUrl = url.parse(this._apiUrl, true);
    parsedUrl.pathname = url.resolve(parsedUrl.pathname, 'data');

    return await this._xhr({
      method: 'POST',
      json: true,
      uri: url.format(parsedUrl),
      body: { fields }
    });
  }
}

export default FormXhrModel;
