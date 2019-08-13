/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../common/validation/ValidationErrors';
import express from 'express';
import {asyncHandler} from '../common/utils';
// eslint-disable-next-line no-unused-vars
import FormModel from './FormModel';

class FormExpressApi {
  private middlewares: {[index: string]: express.RequestHandler[]};
  static create() {
    return new FormExpressApi();
  }

  constructor() {
    this.middlewares = {
      getData: [asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const fields = req.query.fields ? JSON.parse(req.query.fields) : null;
        const model = this._getModel(req, res);
        try {
          const data = await model.getData(fields);
          this._result(null, data, req, res, next);
        } catch (err) {
          this._result(err, null, req, res, next);
        }
      })],
      submit: [asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
      validate: [asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

  model(model: FormModel) {
    if (typeof model === 'function') {
      this._getModel = model;
    } else {
      this._getModel = () => model;
    }
    return this;
  }

  getRouter() {
    return express.Router()
      .get('/', this.middlewares.getData)
      .post('/', this.middlewares.submit)
      .post('/validation', this.middlewares.validate);
  }

  getData(middlewares: express.RequestHandler[] | express.RequestHandler) {
    return this._addMidelwares('getData', middlewares);
  }
  submit(middlewares: express.RequestHandler[] | express.RequestHandler) {
    return this._addMidelwares('submit', middlewares);
  }
  validate(middlewares: express.RequestHandler[] | express.RequestHandler) {
    return this._addMidelwares('validate', middlewares);
  }

  _addMidelwares(method: string, middlewares: express.RequestHandler[] | express.RequestHandler) {
    if (!Array.isArray(middlewares)) {
      middlewares = [middlewares];
    }
    this.middlewares[method] = middlewares.concat(this.middlewares[method]);
    return this;
  }

  // Default implementation
  // eslint-disable-next-line no-unused-vars
  _getModel(req: express.Request, res: express.Response): FormModel {
    throw Error('Model is not defined.');
  }

  _result(err: any, data: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err) {
      next(err);
    } else {
      res.json(data);
    }
  }
}

export default FormExpressApi;
