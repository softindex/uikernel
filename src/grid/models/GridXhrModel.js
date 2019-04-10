/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../../common/validation/ValidationErrors';
import Validator from '../../common/validation/Validator';
import defaultXhr from '../../common/defaultXhr';
import AbstractGridModel from './AbstractGridModel';
import url from 'url';

/**
 * Grid model, that works with API via XHR
 *
 * @param {Object}    settings                          Model settings
 * @param {string}    settings.api                      API address
 * @param {Validator} [settings.validator]              General validator
 * @param {Function}  [settings.xhr]                    XHR interface
 * @param {boolean}   [settings.validateOnClient=false] Don't send validation request to server
 * @constructor
 */
class GridXhrModel extends AbstractGridModel {
  constructor(settings) {
    super();
    if (!settings.api) {
      throw Error('Initialization problem: \'api\' must be specified.');
    }

    this._validator = settings.validator || new Validator();
    this._xhr = settings.xhr || defaultXhr;
    this._validateOnClient = settings.validateOnClient || false;
    this._apiUrl = settings.api
      .replace(/([^/])\?/, '$1/?') // Add "/" before "?"
      .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
  }

  /**
   * Add a record
   *
   * @param {Object}      record  Record object
   */
  async create(record) {
    let body = await this._xhr({
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      uri: this._apiUrl,
      body: JSON.stringify(record)
    });

    body = JSON.parse(body);

    if (body.error) {
      throw ValidationErrors.createFromJSON(body.error);
    }

    this.trigger('create', [body.data]);

    return body.data;
  }

  /**
   * Get records list
   *
   * @param {Object}      settings                Request
   * @param {Array}       settings.fields         Fields
   * @param {number}      [settings.limit]        Limit
   * @param {number}      [settings.offset=0]     Offset
   * @param {Object}      [settings.filters]      Filter values object
   * @param {Array}       [settings.sort]         Sort parameters
   * @param {Array}       [settings.extra]        Record IDs, we need to get for sure
   */
  async read(settings) {
    const maxUriLengthForGetRequest = 2048;
    const queryUrl = this._getQueryUrl(settings);
    const queryBody = this._getQueryBody(settings);

    if (url.format(queryUrl).length > maxUriLengthForGetRequest) {
      const parsedUrl = url.parse(this._apiUrl, true);
      parsedUrl.pathname = url.resolve(parsedUrl.pathname, 'read');

      return await this._xhr({
        method: 'POST',
        json: true,
        uri: url.format(parsedUrl),
        body: queryBody
      });
    }

    const response = await this._xhr({
      method: 'GET',
      uri: url.format(queryUrl)
    });

    return JSON.parse(response);
  }

  /**
   * Get the particular record
   *
   * @param {number|string}   id      Record ID
   * @param {Array}           fields  Required fields
   */
  async getRecord(id, fields) {
    const parsedUrl = url.parse(this._apiUrl, true);
    parsedUrl.query.cols = JSON.stringify(fields); // TODO rename cols to fields
    parsedUrl.pathname = url.resolve(parsedUrl.pathname, JSON.stringify(id));
    delete parsedUrl.search;

    const body = await this._xhr({
      method: 'GET',
      uri: url.format(parsedUrl)
    });

    return JSON.parse(body);
  }

  /**
   * Apply record changes
   *
   * @param {Array}       changes     Changes array
   * @abstract
   */
  async update(changes) {
    let body = await this._xhr({
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      uri: this._apiUrl,
      body: JSON.stringify(changes)
    });

    body = JSON.parse(body);
    const res = [];

    if (body.changes && body.changes.length) {
      this.trigger('update', body.changes);
      res.push(...body.changes);
    }
    if (body.validation && body.validation.length) {
      for (const error of body.validation) {
        if (error && error[1]) {
          error[1] = ValidationErrors.createFromJSON(error[1]);
          res.push(error);
        }
      }
    }
    if (body.errors && body.errors.length) {
      for (const error of body.errors) {
        if (error && error[1]) {
          error[1] = Object.assign(new Error(), error[1]); // Note, that Object spread operator won't work here
          res.push(error);
        }
      }
    }

    return res;
  }

  /**
   * Validation check
   *
   * @param {{[string]: *}} record
   * @param {Promise<*>}    recordId
   */
  async isValidRecord(record, recordId) {
    if (this._validateOnClient) {
      return await this._validator.isValidRecord(record);
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
   * @param   {string[]}  fields   Fields list
   * @returns {string[]}  Dependencies
   */
  getValidationDependency(fields) {
    return this._validator.getValidationDependency(fields);
  }

  _getQueryUrl(settings) {
    const parsedUrl = url.parse(this._apiUrl, true);
    parsedUrl.query.fields = JSON.stringify(settings.fields);
    parsedUrl.query.offset = settings.offset || 0;
    if (settings.limit) {
      parsedUrl.query.limit = settings.limit;
    }
    if (settings.filters) {
      parsedUrl.query.filters = JSON.stringify(settings.filters);
    }
    if (settings.sort) {
      parsedUrl.query.sort = JSON.stringify(settings.sort);
    }
    if (settings.extra) {
      parsedUrl.query.extra = JSON.stringify(settings.extra);
    }
    delete parsedUrl.search;

    return parsedUrl;
  }

  _getQueryBody(settings) {
    const requestBody = {};
    requestBody.fields = settings.fields;
    requestBody.offset = settings.offset || 0;
    if (settings.limit) {
      requestBody.limit = settings.limit;
    }
    if (settings.filters) {
      requestBody.filters = settings.filters;
    }
    if (settings.sort) {
      requestBody.sort = settings.sort;
    }
    if (settings.extra) {
      requestBody.extra = settings.extra;
    }

    return requestBody;
  }
}

export default GridXhrModel;
