/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from 'express';
import ValidationErrors from '../../common/validation/ValidationErrors';
import {asyncHandler} from '../../common/utils';

/**
 * Form Express API for Grid model interaction
 *
 * @return {GridExpressApi}
 * @constructor
 */
class GridExpressApi {
  static create() {
    return new GridExpressApi();
  }

  constructor() {
    this.middlewares = {
      read: [asyncHandler(async (req, res, next) => {
        const settings = {};
        if (req.query.limit) {
          settings.limit = parseInt(req.query.limit);
        }
        if (req.query.offset) {
          settings.offset = parseInt(req.query.offset);
        }
        if (req.query.sort) {
          settings.sort = JSON.parse(req.query.sort);
        }
        if (req.query.fields) {
          settings.fields = JSON.parse(req.query.fields);
        }
        if (req.query.extra) {
          settings.extra = JSON.parse(req.query.extra);
        }
        if (req.query.filters) {
          settings.filters = JSON.parse(req.query.filters);
        }
        const model = this._getModel(req, res);
        const result = this._result('read');
        try {
          const response = await model.read(settings);
          result(null, response, req, res, next);
        } catch (err) {
          result(err, null, req, res, next);
        }
      })],
      validate: [asyncHandler(async (req, res, next) => {
        const model = this._getModel(req, res);
        const result = this._result('validate');
        try {
          const errors = await model.isValidRecord(req.body);
          result(null, errors, req, res, next);
        } catch (err) {
          result(err, null, req, res, next);
        }
      })],
      getRecord: [asyncHandler(async (req, res, next) => {
        const cols = req.query.cols ? JSON.parse(req.query.cols) : null;
        const recordId = req.params.recordId ? JSON.parse(req.params.recordId) : null;
        const model = this._getModel(req, res);
        const result = this._result('getRecord');
        try {
          const response = await model.getRecord(recordId, cols);
          result(null, response, req, res, next);
        } catch (err) {
          result(err, null, req, res, next);
        }
      })],
      update: [asyncHandler(async (req, res, next) => {
        const model = this._getModel(req, res);
        const result = this._result('update');
        try {
          const data = await model.update(req.body);
          result(null, data, req, res, next);
        } catch (err) {
          result(err, null, req, res, next);
        }
      })],
      create: [asyncHandler(async (req, res, next) => {
        const model = this._getModel(req, res);
        const result = this._result('create');
        try {
          const data = await model.create(req.body);
          result(null, data, req, res, next);
        } catch (err) {
          result(err, null, req, res, next);
        }
      })]
    };
  }

  /**
   * Specify Grid model
   *
   * @param   {Function|AbstractGridModel}  model   Grid model
   * @return  {GridExpressApi}
   */
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
      .get('/', this.middlewares.read)
      .post('/validation', this.middlewares.validate)
      .get('/:recordId', this.middlewares.getRecord)
      .put('/', this.middlewares.update)
      .post('/', this.middlewares.create)
      .use((err, req, res, next) => {
        this._result()(err, null, req, res, next);
      });
  }

  read(middlewares) {
    return this._addMidelwares('read', middlewares);
  }

  validate(middlewares) {
    return this._addMidelwares('validate', middlewares);
  }

  getRecord(middlewares) {
    return this._addMidelwares('getRecord', middlewares);
  }

  update(middlewares) {
    return this._addMidelwares('update', middlewares);
  }

  create(middlewares) {
    return this._addMidelwares('create', middlewares);
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

  _result(method) {
    if (method === 'update') {
      return (err, data, req, res, next) => {
        if (err) {
          return send(err, null, req, res, next);
        }

        data = data.reduce((result, record) => {
          if (record[1] instanceof ValidationErrors || record[1] instanceof Error) {
            result.errors.push(record);
          } else {
            result.changes.push(record);
          }
          return result;
        }, {changes: [], errors: []});

        send(null, data, req, res, next);
      };
    }

    if (method === 'create') {
      return (err, data, req, res, next) => {
        if (err) {
          if (!(err instanceof ValidationErrors)) {
            return send(err, null, req, res, next);
          }
          return send(null, {data: null, error: err}, req, res, next);
        }
        return send(null, {data: data, error: null}, req, res, next);
      };
    }

    return send;

    function send(err, data, req, res, next) {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    }
  }
}

export default GridExpressApi;
