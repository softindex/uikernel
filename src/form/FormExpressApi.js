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

var express = require('express');
var ValidationErrors = require('../common/validation/ValidationErrors');

function FormExpressApi() {
  if (!(this instanceof FormExpressApi)) {
    return new FormExpressApi();
  }

  var ctx = this;

  ctx.middlewares = {
    getData: [function (req, res, next) {
      var fields = req.query.fields ? JSON.parse(req.query.fields) : null;
      ctx._getModel(req, res).getData(fields, function (err, data) {
        ctx._result(err, data, req, res, next);
      });
    }],
    submit: [function (req, res, next) {
      ctx._getModel(req, res).submit(req.body, function (err, data) {
        if (err && !(err instanceof ValidationErrors)) {
          ctx._result(err, null, req, res, next);
          return;
        }
        ctx._result(null, {data: data, error: err}, req, res, next);
      });
    }],
    validate: [function (req, res, next) {
      ctx._getModel(req, res).isValidRecord(req.body, function (err, data) {
        ctx._result(err, data, req, res, next);
      });
    }]
  };
}

FormExpressApi.prototype.model = function (model) {
  if (typeof model === 'function') {
    this._getModel = model;
  } else {
    this._getModel = function () {
      return model;
    };
  }
  return this;
};

FormExpressApi.prototype.getData = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.getData = middlewares.concat(this.middlewares.getData);
  return this;
};

FormExpressApi.prototype.submit = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.submit = middlewares.concat(this.middlewares.submit);
  return this;
};

FormExpressApi.prototype.validate = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.validate = middlewares.concat(this.middlewares.validate);
  return this;
};

FormExpressApi.prototype.result = function (func) {
  this._result = func;
  return this;
};
FormExpressApi.prototype.getRouter = function () {
  var ctx = this;

  return new express.Router()
    .get('/', ctx.middlewares.getData)
    .post('/', ctx.middlewares.submit)
    .post('/validation', ctx.middlewares.validate);
};

// Default implementation
FormExpressApi.prototype._getModel = function () {
  throw Error('Model is not defined.');
};
FormExpressApi.prototype._result = function (err, data, req, res, next) {
  if (err) {
    next(err);
  } else {
    res.json(data);
  }
};

module.exports = FormExpressApi;
