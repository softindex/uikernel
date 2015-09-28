/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

var utils = require('../common/utils');
var url = require('url');
var EventsModel = require('../common/Events');
var defaultXHR = require('../common/defaultXHR');
var Validator = require('../common/validation/Validator');
var ValidationErrors = require('../common/validation/ValidationErrors');

var FormXhrModel = function (settings) {
  EventsModel.call(this);

  if (!settings.api) {
    throw Error('Initialization problem: \'api\' must be specified.');
  }

  this._validator = settings.validator || new Validator();
  this._serverValidation = settings.serverValidation || false;
  this._xhr = settings.xhr || defaultXHR;
  this._apiUrl = settings.api
    .replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
};
FormXhrModel.prototype = new EventsModel();
FormXhrModel.prototype.constructor = FormXhrModel;

FormXhrModel.prototype.getData = function (fields, cb) {
  var parsedUrl = url.parse(this._apiUrl, true);
  parsedUrl.query.fields = JSON.stringify(fields);
  delete parsedUrl.search;

  this._xhr({
    method: 'GET',
    uri: url.format(parsedUrl)
  }, function (err, resp, response) {
    var body;

    if (err) {
      return cb(err);
    }

    // Parse response
    try {
      body = JSON.parse(response);
    } catch (e) {
      cb(e);
    }

    cb(null, body);
  });
};

FormXhrModel.prototype.getData = function (fields, cb) {
  var parsedUrl = url.parse(this._apiUrl, true);
  parsedUrl.query.fields = JSON.stringify(fields);
  delete parsedUrl.search;

  this._xhr({
    method: 'GET',
    uri: url.format(parsedUrl)
  }, function (err, resp, body) {
    if (typeof cb === 'function') {
      if (err) {
        return cb(err);
      }
      cb(null, JSON.parse(body));
    }
  });
};

FormXhrModel.prototype.submit = function (changes, cb) {
  this._xhr({
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    uri: this._apiUrl,
    body: JSON.stringify(changes)
  }, function (err, resp, body) {
    if (err) {
      return cb(err);
    }

    try {
      body = JSON.parse(body);
    } catch (e) {
      return cb(e);
    }

    if (body.error) {
      return cb(ValidationErrors.createFromJSON(body.error));
    }

    this.trigger('update', body.data);
    cb(null, body.data);
  }.bind(this));
};

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
FormXhrModel.prototype.isValidRecord = function (record, cb) {
  if (this._serverValidation && !utils.isEmpty(record)) {
    var parsedUrl = url.parse(this._apiUrl, true);
    parsedUrl.pathname = url.resolve(parsedUrl.pathname, 'validation');
    parsedUrl.query.record = JSON.stringify(record);
    delete parsedUrl.search;

    // Server validation start
    this._xhr({
      method: 'GET',
      uri: url.format(parsedUrl)
    }, function (err, resp, body) {
      if (err) {
        if (resp.status === 413) {
          // When request exceeds server limits and
          // client validators are able to find errors,
          // we need to return these errors
          return this._validator.isValidRecord(record, function (err2, errors) {
            if (!err2 && errors.isEmpty()) {
              return cb(err);
            }
            cb(err2, errors);
          });
        }
        return cb(err);
      }

      try {
        body = JSON.parse(body);
      } catch (e) {
        return cb(e);
      }

      cb(null, ValidationErrors.createFromJSON(body));
    }.bind(this));
  } else {
    this._validator.isValidRecord(record, cb);
  }
};

module.exports = FormXhrModel;
