/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import toPromise from '../common/toPromise';
import express from 'express';

/**
 * Form Express API for List model interaction
 *
 * @return {ListExpressApi}
 * @constructor
 */
function ListExpressApi() {
  if (!(this instanceof ListExpressApi)) {
    return new ListExpressApi();
  }

  const builderContext = this;

  builderContext.middlewares = {
    read: [(req, res, next) => {
      builderContext._read(req.query.v, req, builderContext._getModel(req, res), (err, response) => {
        builderContext._result(err, response, req, res, next);
      });
    }],
    getLabel: [(req, res, next) => {
      const id = JSON.parse(req.params.id);
      builderContext._getLabel(id, req, builderContext._getModel(req, res), (err, response) => {
        builderContext._result(err, response, req, res, next);
      });
    }]
  };
}

/**
 * Specify List model
 *
 * @param   {Function|AbstractListModel}  model  List model
 * @return {ListExpressApi}
 */
ListExpressApi.prototype.model = function (model) {
  if (typeof model === 'function') {
    this._getModel = model;
  } else {
    this._getModel = () => model;
  }
  return this;
};

ListExpressApi.prototype.read = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.read = middlewares.concat(this.middlewares.read);
  return this;
};

ListExpressApi.prototype.getLabel = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.getLabel = middlewares.concat(this.middlewares.getLabel);
  return this;
};

ListExpressApi.prototype.result = function (func) {
  this._result = func;
  return this;
};
ListExpressApi.prototype.getRouter = function () {
  const builderContext = this;

  return new express.Router()
    .get('/', builderContext.middlewares.read)
    .get('/label/:id', builderContext.middlewares.getLabel);
};

// Default implementation
ListExpressApi.prototype._getModel = () => {
  throw Error('Model is not defined.');
};
ListExpressApi.prototype._read = (search, req, model, cb) => {
  toPromise(model.read.bind(model))(search)
    .then(data => {
      cb(null, data);
    })
    .catch(err => {
      cb(err);
    });
};
ListExpressApi.prototype._getLabel = (id, req, model, cb) => {
  toPromise(model.getLabel.bind(model))(id)
    .then(data => {
      cb(null, data);
    })
    .catch(err => {
      cb(err);
    });
};
ListExpressApi.prototype._result = (err, data, req, res, next) => {
  if (err) {
    next(err);
  } else {
    if (typeof data === 'number') {
      data = data.toString();
    }
    res.json(data);
  }
};

export default ListExpressApi;
