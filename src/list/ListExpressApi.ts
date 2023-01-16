/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Request, RequestHandler, Response, Router} from 'express';
import asyncServerRouteHandler from '../common/asyncServerRouteHandler';
import {IListModel} from './types/IListModel';

type ListExpressApiMiddlewares = {
  getLabel: RequestHandler[];
  read: RequestHandler[];
};

/**
 * Form Express API for List model interaction
 */
class ListExpressApi<TKey, TMetadata extends {}> {
  static create<TKey, TMetadata extends {}>(): ListExpressApi<TKey, TMetadata> {
    return new ListExpressApi();
  }

  private middlewares: ListExpressApiMiddlewares = {
    read: [
      asyncServerRouteHandler(async (req, res) => {
        const model = this.getModel(req, res);
        const data = await model.read(req.query.v?.toString());
        this.sendResult(res, data);
      })
    ],
    getLabel: [
      asyncServerRouteHandler(async (req, res) => {
        const id = JSON.parse(req.params.id);
        const model = this.getModel(req, res);
        const data = await model.getLabel(id);
        this.sendResult(res, data);
      })
    ]
  };

  /**
   * Specify List model
   */
  model(
    model: IListModel<TKey, TMetadata> | ((req: Request, res: Response) => IListModel<TKey, TMetadata>)
  ): this {
    if (typeof model === 'function') {
      this.getModel = model;
    } else {
      this.getModel = () => model;
    }

    return this;
  }

  getRouter(): Router {
    return Router().get('/', this.middlewares.read).get('/label/:id', this.middlewares.getLabel);
  }

  read(middleware: RequestHandler | RequestHandler[]): this {
    const middlewares = Array.isArray(middleware) ? middleware : [middleware];
    this.middlewares.read = middlewares.concat(this.middlewares.read);
    return this;
  }

  getLabel(middleware: RequestHandler | RequestHandler[]): this {
    const middlewares = Array.isArray(middleware) ? middleware : [middleware];
    this.middlewares.getLabel = middlewares.concat(this.middlewares.getLabel);
    return this;
  }

  // Default implementation
  private getModel(_req: Request, _res: Response): IListModel<TKey, TMetadata> {
    throw new Error('Model is not defined.');
  }

  private sendResult(res: Response, data: unknown): void {
    res.json(typeof data === 'number' ? data.toString() : data);
  }
}

export default ListExpressApi;
