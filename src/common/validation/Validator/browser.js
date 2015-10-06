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
var Validator = require('./common');
var ValidationErrors = require('../ValidationErrors');
var defaultXHR = require('../../defaultXHR');

/**
 * Get validator.
 *
 * @param {string}  serverValidationUrl
 * @param {Object}  xhr
 *
 * @return {Validator}
 * @type {Module}
 */
var ClientValidator = function (serverValidationUrl, xhr) {
  if (!(this instanceof ClientValidator)) {
    return new ClientValidator(serverValidationUrl, xhr);
  }

  Validator.call(this);
  this._settings.serverValidationUrl = serverValidationUrl;
  this._settings.xhr = xhr || defaultXHR;
};

ClientValidator.prototype = new Validator();
ClientValidator.prototype.constructor = ClientValidator;

ClientValidator.prototype.isValidRecord = function (record, cb) {
  if (!this._settings.serverValidationUrl) {
    return Validator.prototype.isValidRecord.call(this, record, cb);
  }

  var parsedUrl = url.parse(this._settings.serverValidationUrl, true);
  parsedUrl.query.record = JSON.stringify(record);
  delete parsedUrl.search;

  // Server validation start
  this._settings.xhr({
    method: 'GET',
    uri: url.format(parsedUrl)
  }, function (err, resp, body) {
    if (err) {
      if (resp.status === 413) {
        // When request exceeds server limits and
        // client validators are able to find errors,
        // we need to return these errors
        Validator.prototype.isValidRecord.call(this, record, function (err2, errors) {
          if (errors.isEmpty()) {
            return cb(err);
          }
          cb(err2, errors);
        });
        return;
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
};

module.exports = ClientValidator;
