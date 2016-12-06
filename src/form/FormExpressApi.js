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
import ValidationErrors from '../common/validation/ValidationErrors';
import express from 'express';

function FormExpressApi() {
  if (!(this instanceof FormExpressApi)) {
    return new FormExpressApi();
  }

  const ctx = this;

  ctx.middlewares = {
    getData: [(req, res, next) =>{
      const fields = req.query.fields ? JSON.parse(req.query.fields) : null;
      const model = ctx._getModel(req, res);
      toPromise(model.getData.bind(model))(fields)
        .then(data =>{
          ctx._result(null, data, req, res, next);
        })
        .catch(err =>{
          ctx._result(err, null, req, res, next);
        });
    }],
    submit: [(req, res, next) =>{
      const model = ctx._getModel(req, res);
      toPromise(model.submit.bind(model))(req.body)
        .then(data =>{
          ctx._result(null, {data: data, error: null}, req, res, next);
        })
        .catch(err =>{
          if (err && !(err instanceof ValidationErrors)) {
            ctx._result(err, null, req, res, next);
            return;
          }
          ctx._result(err, {data: null, error: err}, req, res, next);
        });
    }],
    validate: [(req, res, next) =>{
      const model = ctx._getModel(req, res);
      toPromise(model.isValidRecord.bind(model))(req.body)
        .then(data =>{
          ctx._result(null, data, req, res, next);
        })
        .catch(err =>{
          ctx._result(err, null, req, res, next);
        });
    }]
  };
}

FormExpressApi.prototype.model = function (model) {
  if (typeof model === 'function') {
    this._getModel = model;
  } else {
    this._getModel = () => model;
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
  const ctx = this;

  return new express.Router()
    .get('/', ctx.middlewares.getData)
    .post('/', ctx.middlewares.submit)
    .post('/validation', ctx.middlewares.validate);
};

// Default implementation
FormExpressApi.prototype._getModel = () =>{
  throw Error('Model is not defined.');
};
FormExpressApi.prototype._result = (err, data, req, res, next) =>{
  if (err) {
    next(err);
  } else {
    res.json(data);
  }
};

module.exports = FormExpressApi;
