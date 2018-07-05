/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../common/validation/ValidationErrors';
import express from 'express';
import {asyncHandler} from '../common/utils';

class FormExpressApi {
  static create() {
    return new FormExpressApi();
  }

  constructor() {
    this.middlewares = {
      getData: [asyncHandler(async (req, res, next) => {
        const fields = req.query.fields ? JSON.parse(req.query.fields) : null;
        const model = this._getModel(req, res);
        try {
          const data = await model.getData(fields);
          this._result(null, data, req, res, next);
        } catch (err) {
          this._result(err, null, req, res, next);
        }
      })],
      submit: [asyncHandler(async (req, res, next) => {
        const model = this._getModel(req, res);
        try {
          const data = await model.submit(req.body);
          this._result(null, {data: data, error: null}, req, res, next);
        } catch (err) {
          if (err && !(err instanceof ValidationErrors)) {
            this._result(err, null, req, res, next);
            return;
          }
          this._result(null, {data: null, error: err}, req, res, next);
        }
      })],
      validate: [asyncHandler(async (req, res, next) => {
        const model = this._getModel(req, res);
        try {
          const data = await model.isValidRecord(req.body);
          this._result(null, data, req, res, next);
        } catch (err) {
          this._result(err, null, req, res, next);
        }
      })]
    };
  }

  model(model) {
    if (typeof model === 'function') {
      this._getModel = model;
    } else {
      this._getModel = () => model;
    }
    return this;
  }

  getRouter() {
    return new express.Router()
      .get('/', this.middlewares.getData)
      .post('/', this.middlewares.submit)
      .post('/validation', this.middlewares.validate);
  }

  getData(middlewares) {
    return this._addMidelwares('getData', middlewares);
  }
  submit(middlewares) {
    return this._addMidelwares('submit', middlewares);
  }
  validate(middlewares) {
    return this._addMidelwares('validate', middlewares);
  }

  _addMidelwares(method, middlewares) {
    if (!Array.isArray(middlewares)) {
      middlewares = [middlewares];
    }
    this.middlewares[method] = middlewares.concat(this.middlewares[method]);
    return this;
  }

  // Default implementation
  _getModel() {
    throw Error('Model is not defined.');
  }

  _result(err, data, req, res, next) {
    if (err) {
      next(err);
    } else {
      res.json(data);
    }
  }
}

export default FormExpressApi;
