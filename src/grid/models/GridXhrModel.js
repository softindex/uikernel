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

var url = require('url');
var AbstractGridModel = require('./AbstractGridModel');
var defaultXHR = require('../../common/defaultXHR');
var Validator = require('../../common/validation/Validator/common');
var ValidationErrors = require('../../common/validation/ValidationErrors');

/**
 * Grid model, that works with API via XHR
 *
 * @param {Object}    settings                          Model settings
 * @param {string}    settings.api                      API address
 * @param {Validator} [settings.validator]        General validator
 * @param {Function}  [settings.xhr]                    XHR interface
 * @constructor
 */
var GridXhrModel = function (settings) {
  AbstractGridModel.call(this);

  if (!settings.api) {
    throw Error('Initialization problem: \'api\' must be specified.');
  }

  this._validator = settings.validator || new Validator();
  this._xhr = settings.xhr || defaultXHR;
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
GridXhrModel.prototype.create = function (record, cb) {
  this._xhr({
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    uri: this._apiUrl,
    body: JSON.stringify(record)
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
    this.trigger('create', body.data);
    cb(null, body.data);
  }.bind(this));
};

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
GridXhrModel.prototype.read = function (settings, cb) {
  var parsedUrl = url.parse(this._apiUrl, true);

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

/**
 * Get the particular record
 *
 * @param {number|string}   id      Record ID
 * @param {Array}           fields  Required fields
 * @param {Function}        cb      CallBack function
 */
GridXhrModel.prototype.getRecord = function (id, fields, cb) {
  var parsedUrl = url.parse(this._apiUrl, true);
  parsedUrl.query.cols = JSON.stringify(fields); // TODO rename cols to fields
  parsedUrl.pathname = url.resolve(parsedUrl.pathname, JSON.stringify(id));
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

/**
 * Apply record changes
 *
 * @param {Array}       changes     Changes array
 * @param {Function}    cb          CallBack function
 * @abstract
 */
GridXhrModel.prototype.update = function (changes, cb) {
  this._xhr({
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    uri: this._apiUrl,
    body: JSON.stringify(changes)
  }, function (err, resp, body) {
    var i;

    if (err) {
      return cb(err);
    }

    try {
      body = JSON.parse(body);
    } catch (e) {
      return cb(e);
    }

    if (body.data) {
      this.trigger('update', body.data);
    }

    if (body.error) {
      for (i = 0; i < body.error.length; i++) {
        body.error[i][1] = ValidationErrors.createFromJSON(body.error[i][1]);
      }
      return cb(body.error, body.data);
    } else {
      cb(null, body.data);
    }

  }.bind(this));
};

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
GridXhrModel.prototype.isValidRecord = function (record, cb) {
  this._validator.isValidRecord(record, cb);
};

module.exports = GridXhrModel;
