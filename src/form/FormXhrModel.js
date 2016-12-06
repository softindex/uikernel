/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

import toPromise from '../common/toPromise';
import callbackify from '../common/callbackify';
import ValidationErrors from '../common/validation/ValidationErrors';
import Validator from '../common/validation/Validator/common';
import defaultXhr from '../common/defaultXhr';
import EventsModel from '../common/Events';
import url from 'url';

const FormXhrModel = function (settings) {
  EventsModel.call(this);

  if (!settings.api) {
    throw Error('Initialization problem: \'api\' must be specified.');
  }

  this._validator = settings.validator || new Validator();
  this._xhr = settings.xhr || defaultXhr;
  this._apiUrl = settings.api
    .replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
};
FormXhrModel.prototype = new EventsModel();
FormXhrModel.prototype.constructor = FormXhrModel;

FormXhrModel.prototype.getData = callbackify(async function (fields) {
  const parsedUrl = url.parse(this._apiUrl, true);
  parsedUrl.query.fields = JSON.stringify(fields);
  delete parsedUrl.search;

  const response = await toPromise(this._xhr.bind(this))({
    method: 'GET',
    uri: url.format(parsedUrl)
  });

  const body = JSON.parse(response);

  return body;
});

FormXhrModel.prototype.submit = callbackify(async function (changes) {
  let body = await toPromise(this._xhr.bind(this))({
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
});

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields   Fields list
 * @returns {Array}  Dependencies
 */
FormXhrModel.prototype.getValidationDependency = function (fields) {
  return this._validator.getValidationDependency(fields);
};

/**
 * Validation check
 *
 * @param {Object}      record
 * @param {Function}    cb      CallBack function
 */
FormXhrModel.prototype.isValidRecord = callbackify(function (record) {
  return toPromise(this._validator.isValidRecord.bind(this._validator))(record);
});

module.exports = FormXhrModel;
