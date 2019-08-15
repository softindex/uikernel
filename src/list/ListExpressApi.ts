/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from 'express';
import {asyncHandler} from '../common/utils';
import ListXMLHttpRequestModel from "./ListXhrModel";

/**
 * Form Express API for List model interaction
 *
 * @return {ListExpressApi}
 * @constructor
 */
class ListExpressApi<TKey> {
  private middlewares: {[index: string]: express.RequestHandler[]};
  static create() {
    return new ListExpressApi();
  }

  constructor() {
    this.middlewares = {
      read: [asyncHandler(async (req, res, next) => {
        const model = this._getModel(req, res);
        try {
          const response = await model.read(req.query.v);
          this._result(null, response, req, res, next);
        } catch (err) {
          this._result(err, null, req, res, next);
        }
      })],
      getLabel: [asyncHandler(async (req, res, next) => {
        const id = JSON.parse(req.params.id);
        const model = this._getModel(req, res);
        try {
          const response = await model.getLabel(id);
          this._result(null, response, req, res, next);
        } catch (err) {
          this._result(err, null, req, res, next);
        }
      })]
    };
  }

  /**
   * Specify List model
   *
   * @param   {Function|AbstractListModel}  model  List model
   * @return {ListExpressApi}
   */
  model(model: ListXMLHttpRequestModel<TKey>) {
    if (typeof model === 'function') {
      this._getModel = model;
    } else {
      this._getModel = () => model;
    }
    return this;
  }

  getRouter() {
    return express.Router()
      .get('/', this.middlewares.read)
      .get('/label/:id', this.middlewares.getLabel);
  }

  read(middlewares: express.RequestHandler[]) {
    if (!Array.isArray(middlewares)) {
      middlewares = [middlewares];
    }
    this.middlewares.read = middlewares.concat(this.middlewares.read);
    return this;
  }

  getLabel(middlewares: express.RequestHandler[]) {
    if (!Array.isArray(middlewares)) {
      middlewares = [middlewares];
    }
    this.middlewares.getLabel = middlewares.concat(this.middlewares.getLabel);
    return this;
  }

  // Default implementation
  // eslint-disable-next-line no-unused-vars
  _getModel(req: express.Request, res: express.Response):() => ListXMLHttpRequestModel<TKey> {
    throw Error('Model is not defined.');
  }

  _result(err: any, data: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err) {
      next(err);
    } else {
      if (typeof data === 'number') {
        data = data.toString();
      }
      res.json(data);
    }
  }
}

export default ListExpressApi;
