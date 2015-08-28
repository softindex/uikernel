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

var ValidationErrors = require('../common/validation/ValidationErrors');

function FormExpressAPI(router) {
  if (!(this instanceof FormExpressAPI)) {
    return new FormExpressAPI(router);
  }

  var ctx = this;

  router
    .get('/', function (req, res, next) {
      var fields = req.query.fields ? JSON.parse(req.query.fields) : null;
      ctx._getModel(req, res).getData(fields, function (err, data) {
        ctx._result(err, data, req, res, next);
      });
    })
    .post('/', function (req, res, next) {
      ctx._getModel(req, res).submit(req.body, function (err, data) {
        if (err && !(err instanceof ValidationErrors)) {
          ctx._result(err, null, req, res, next);
          return;
        }
        ctx._result(null, {data: data, error: err}, req, res, next);
      });
    })
    .get('/validation', function (req, res, next) {
      var record = JSON.parse(req.query.record);
      ctx._getModel(req, res).isValidRecord(record, function (err, data) {
        ctx._result(err, data, req, res, next);
      });
    });
}

FormExpressAPI.prototype.model = function (model) {
  if (typeof model === 'function') {
    this._getModel = model;
  } else {
    this._getModel = function () {
      return model;
    };
  }
  return this;
};
FormExpressAPI.prototype.result = function (func) {
  this._result = func;
  return this;
};

// Default implementation
FormExpressAPI.prototype._getModel = function () {
  throw Error('Model is not defined.');
};
FormExpressAPI.prototype._result = function (err, data, req, res, next) {
  if (err) {
    next(err);
  } else {
    res.json(data);
  }
};

module.exports = FormExpressAPI;
