/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import toPromise from '../../common/toPromise';
import callbackify from '../../common/callbackify';
import ValidationErrors from '../../common/validation/ValidationErrors';
import Validator from '../../common/validation/Validator/common';
import defaultXhr from '../../common/defaultXhr';
import AbstractGridModel from './AbstractGridModel';
import url from 'url';

/**
 * Grid model, that works with API via XHR
 *
 * @param {Object}    settings                          Model settings
 * @param {string}    settings.api                      API address
 * @param {Validator} [settings.validator]        General validator
 * @param {Function}  [settings.xhr]                    XHR interface
 * @constructor
 */
const GridXhrModel = function (settings) {
  AbstractGridModel.call(this);

  if (!settings.api) {
    throw Error('Initialization problem: \'api\' must be specified.');
  }

  this._validator = settings.validator || new Validator();
  this._xhr = settings.xhr || defaultXhr;
  this._apiUrl = settings.api
    .replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
};
GridXhrModel.prototype = new AbstractGridModel();
GridXhrModel.prototype.constructor = GridXhrModel;

/**
 * Add a record
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 */
GridXhrModel.prototype.create = callbackify(async function (record) {
  let body = await toPromise(this._xhr.bind(this))({
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    uri: this._apiUrl,
    body: JSON.stringify(record)
  });

  body = JSON.parse(body);

  if (body.error) {
    throw ValidationErrors.createFromJSON(body.error);
  }

  this.trigger('create', body.data);

  return body.data;
});

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
 * @param {Function}    cb                      CallBack function
 */
GridXhrModel.prototype.read = callbackify(async function (settings) {
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

  const response = await toPromise(this._xhr.bind(this))({
    method: 'GET',
    uri: url.format(parsedUrl)
  });

  return JSON.parse(response);
});

/**
 * Get the particular record
 *
 * @param {number|string}   id      Record ID
 * @param {Array}           fields  Required fields
 * @param {Function}        cb      CallBack function
 */
GridXhrModel.prototype.getRecord = callbackify(async function (id, fields) {
  const parsedUrl = url.parse(this._apiUrl, true);
  parsedUrl.query.cols = JSON.stringify(fields); // TODO rename cols to fields
  parsedUrl.pathname = url.resolve(parsedUrl.pathname, JSON.stringify(id));
  delete parsedUrl.search;

  const body = await toPromise(this._xhr.bind(this))({
    method: 'GET',
    uri: url.format(parsedUrl)
  });

  return JSON.parse(body);
});

/**
 * Apply record changes
 *
 * @param {Array}       changes     Changes array
 * @param {Function}    cb          CallBack function
 * @abstract
 */
GridXhrModel.prototype.update = callbackify(async function (changes) {
  let body = await toPromise(this._xhr.bind(this))({
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    uri: this._apiUrl,
    body: JSON.stringify(changes)
  });

  body = JSON.parse(body);

  if (body.changes.length) {
    this.trigger('update', body.changes);
  }

  body.errors.forEach(error => {
    error[1] = ValidationErrors.createFromJSON(error[1]);
  });

  return body.changes.concat(body.errors);
});

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields   Fields list
 * @returns {Array}  Dependencies
 */
GridXhrModel.prototype.getValidationDependency = function (fields) {
  return this._validator.getValidationDependency(fields);
};

/**
 * Validation check
 *
 * @param {Object}      record
 * @param {Function}    cb      CallBack function
 */
GridXhrModel.prototype.isValidRecord = callbackify(function (record) {
  return toPromise(this._validator.isValidRecord.bind(this._validator))(record);
});

export default GridXhrModel;
