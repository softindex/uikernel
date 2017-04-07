/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ValidationErrors = require('../../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _toPromise = require('../../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var model = builderContext._getModel(req, res);
      (0, _toPromise2.default)(model.read.bind(model))(settings).then(function (response) {
        builderContext._result(null, response, req, res, next);
      }).catch(function (err) {
        builderContext._result(err, null, req, res, next);
      });
    }],
    validate: [function (req, res, next) {
      var model = builderContext._getModel(req, res);
      (0, _toPromise2.default)(model.isValidRecord.bind(model))(req.body).then(function (errors) {
        builderContext._result(null, errors, req, res, next);
      }).catch(function (err) {
        builderContext._result(err, null, req, res, next);
      });
    }],
    getRecord: [function (req, res, next) {
      var cols = req.query.cols ? JSON.parse(req.query.cols) : null;
      var recordId = req.params.recordId ? JSON.parse(req.params.recordId) : null;
      var model = builderContext._getModel(req, res);
      (0, _toPromise2.default)(model.getRecord.bind(model))(recordId, cols).then(function (response) {
        builderContext._result(null, response, req, res, next);
      }).catch(function (err) {
        builderContext._result(err, null, req, res, next);
      });
    }],
    update: [function (req, res, next) {
      var model = builderContext._getModel(req, res);
      (0, _toPromise2.default)(model.update.bind(model))(req.body).then(function (data) {
        data = data.reduce(function (result, record) {
          if (record[1] instanceof _ValidationErrors2.default || record[1] instanceof Error) {
            result.errors.push(record);
          } else {
            result.changes.push(record);
          }
          return result;
        }, {
          changes: [],
          errors: []
        });
        builderContext._result(null, data, req, res, next);
      }).catch(function (err) {
        builderContext._result(err, null, req, res, next);
      });
    }],
    create: [function (req, res, next) {
      var model = builderContext._getModel(req, res);
      (0, _toPromise2.default)(model.create.bind(model))(req.body).then(function (data) {
        builderContext._result(null, { data: data, error: null }, req, res, next);
      }).catch(function (err) {
        if (!(err instanceof _ValidationErrors2.default)) {
          return builderContext._result(err, null, req, res, next);
        }
        builderContext._result(null, { data: null, error: err }, req, res, next);
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
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
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

  return new _express2.default.Router().get('/', builderContext.middlewares.read).post('/validation', builderContext.middlewares.validate).get('/:recordId', builderContext.middlewares.getRecord).put('/', builderContext.middlewares.update).post('/', builderContext.middlewares.create).use(function (err, req, res, next) {
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

exports.default = GridExpressApi;
module.exports = exports['default'];