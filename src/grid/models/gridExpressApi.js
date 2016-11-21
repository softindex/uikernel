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
var ValidationErrors = require('../../common/validation/ValidationErrors');

/**
 * Form Express API for Grid model interaction
 *
 * @return {GridExpressApi}
 * @constructor
 */
function GridExpressApi() {
  if (!(this instanceof GridExpressApi)) {
    return new GridExpressApi();
  }

  var builderContext = this;

  builderContext.middlewares = {
    read: [function (req, res, next) {
      var settings = {};
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
      builderContext._getModel(req, res).read(settings, function (err, response) {
        builderContext._result(err, response, req, res, next);
      });
    }],
    validate: [function (req, res, next) {
      builderContext._getModel(req, res).isValidRecord(req.body, function (err, errors) {
        builderContext._result(err, errors, req, res, next);
      });
    }],
    getRecord: [function (req, res, next) {
      var cols = req.query.cols ? JSON.parse(req.query.cols) : null;
      var recordId = req.params.recordId ? JSON.parse(req.params.recordId) : null;
      builderContext._getModel(req, res).getRecord(recordId, cols, function (err, response) {
        builderContext._result(err, response, req, res, next);
      });
    }],
    update: [function (req, res, next) {
      builderContext._getModel(req, res).update(req.body, function (err, data) {
        if (!err) {
          data = data.reduce(function (result, record) {
            if (record[1] instanceof ValidationErrors) {
              result.errors.push(record);
            } else {
              result.changes.push(record);
            }
            return result;
          }, {
            changes: [],
            errors: []
          });
        }
        builderContext._result(err, data, req, res, next);
      });
    }],
    create: [function (req, res, next) {
      builderContext._getModel(req, res).create(req.body, function (err, data) {
        if (err && !(err instanceof ValidationErrors)) {
          return builderContext._result(err, null, req, res, next);
        }
        builderContext._result(null, {data: data, error: err}, req, res, next);
      });
    }]
  };
}

/**
 * Specify Grid model
 *
 * @param   {Function|AbstractGridModel}  model   Grid model
 * @return  {GridExpressApi}
 */
GridExpressApi.prototype.model = function (model) {
  if (typeof model === 'function') {
    this._getModel = model;
  } else {
    this._getModel = function () {
      return model;
    };
  }
  return this;
};

GridExpressApi.prototype.read = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.read = middlewares.concat(this.middlewares.read);
  return this;
};

GridExpressApi.prototype.validate = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.validate = middlewares.concat(this.middlewares.validate);
  return this;
};

GridExpressApi.prototype.getRecord = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.getRecord = middlewares.concat(this.middlewares.getRecord);
  return this;
};

GridExpressApi.prototype.update = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.update = middlewares.concat(this.middlewares.update);
  return this;
};

GridExpressApi.prototype.create = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.create = middlewares.concat(this.middlewares.create);
  return this;
};

/**
 * Specify send response function
 *
 * @param func
 * @return {GridExpressApi}
 */
GridExpressApi.prototype.result = function (func) {
  this._result = func;
  return this;
};

GridExpressApi.prototype.getRouter = function () {
  var builderContext = this;

  return new express.Router()
    .get('/', builderContext.middlewares.read)
    .post('/validation', builderContext.middlewares.validate)
    .get('/:recordId', builderContext.middlewares.getRecord)
    .put('/', builderContext.middlewares.update)
    .post('/', builderContext.middlewares.create)
    .use(function (err, req, res, next) {
      builderContext._result(err, null, req, res, next);
    });
};

// Default implementation
GridExpressApi.prototype._getModel = function () {
  throw Error('Model is not defined.');
};
GridExpressApi.prototype._result = function (err, data, req, res, next) {
  if (err) {
    next(err);
  } else {
    res.json(data);
  }
};

module.exports = GridExpressApi;
