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
 * @param {string[]|Function}   availableMethods
 * @return {GridExpressApi}
 * @constructor
 */
function GridExpressApi(availableMethods) {
  if (!(this instanceof GridExpressApi)) {
    return new GridExpressApi(availableMethods);
  }
  if (availableMethods && Array.isArray(availableMethods)) {
    availableMethods = function () {
      return availableMethods;
    };
  }

  var builderContext = this;

  builderContext._router = new express.Router()
    .get('/', function (req, res, next) {
      if (availableMethods && availableMethods(req).indexOf('read') === -1) {
        return next();
      }
      var settings = {};
      if (req.query.limit) {
        settings.limit = req.query.limit;
      }
      if (req.query.offset) {
        settings.offset = req.query.offset;
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
    })
    .post('/validation', function (req, res, next) {
      builderContext._getModel(req, res).isValidRecord(req.body, function (err, errors) {
        builderContext._result(err, errors, req, res, next);
      });
    })
    .get('/:recordId', function (req, res, next) {
      if (availableMethods && availableMethods(req).indexOf('getRecord') === -1) {
        return next();
      }
      var cols = req.query.cols ? JSON.parse(req.query.cols) : null;
      builderContext._getModel(req, res).getRecord(req.params.recordId, cols, function (err, response) {
        builderContext._result(err, response, req, res, next);
      });
    })
    .put('/', function (req, res, next) {
      if (availableMethods && availableMethods(req).indexOf('update') === -1) {
        return next();
      }
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
    })
    .post('/', function (req, res, next) {
      if (availableMethods && availableMethods(req).indexOf('create') === -1) {
        return next();
      }
      builderContext._getModel(req, res).create(req.body, function (err, data) {
        if (err && !(err instanceof ValidationErrors)) {
          return builderContext._result(err, null, req, res, next);
        }
        builderContext._result(null, {data: data, error: err}, req, res, next);
      });
    })
    .use(function (err, req, res, next) {
      builderContext._result(err, null, req, res, next);
    });
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
  return this._router;
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
