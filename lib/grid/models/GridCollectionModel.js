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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _callbackify = require('../../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _toPromise = require('../../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _common = require('../../common/validation/Validator/common');

var _common2 = _interopRequireDefault(_common);

var _AbstractGridModel = require('./AbstractGridModel');

var _AbstractGridModel2 = _interopRequireDefault(_AbstractGridModel);

var _utils = require('../../common/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Specifies a grid model that will work with array data passed to it as a parameter.
 *
 * @param {Object}    [options]
 * @param {Object[]}  [options.data]              Data array
 * @param {Function}  [options.filtersHandler]
 * @param {Validator} [options.validator]
 * @param {string[]}  [options.requiredFields]
 * @param {bool}      [options.validateOnCreate]
 * @constructor
 */
var GridCollectionModel = function GridCollectionModel(options) {
  _AbstractGridModel2.default.call(this);

  options = options || {};

  this.data = options.data || [];
  this._id = 1;
  this._filtersHandler = options.filtersHandler;
  if (options.validation) {
    _utils2.default.warn('Property "validation" is deprecated, use "validator" instead');
  }
  this._validator = options.validator || options.validation || new _common2.default();
  this._requiredFields = options.requiredFields || [];
  this._validateOnCreate = options.hasOwnProperty('validateOnCreate') ? options.validateOnCreate : true;

  // TODO Deprecated. Will be deleted in v0.17.0
  if (!this._validateOnCreate) {
    console.warn('Deprecated option "validateOnCreate".');
  }
}; /**
    * Copyright (с) 2015-present, SoftIndex LLC.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    */

GridCollectionModel.prototype = new _AbstractGridModel2.default();
GridCollectionModel.prototype.constructor = GridCollectionModel;

/**
 * Set data array in model
 *
 * @param {Object[]} data
 */
GridCollectionModel.prototype.setData = function (data) {
  this.data = data;
};

/**
 * Add a record to local collection
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 */
GridCollectionModel.prototype.create = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(record) {
    var i, field, validationErrors, clonedRecord;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = void 0;
            field = void 0;
            validationErrors = void 0;
            clonedRecord = _utils2.default.clone(record);


            for (i in this._requiredFields) {
              field = this._requiredFields[i];
              if (!clonedRecord.hasOwnProperty(field)) {
                clonedRecord[field] = record[field];
              }
            }

            if (!this._validateOnCreate) {
              _context.next = 14;
              break;
            }

            _context.next = 8;
            return this.isValidRecord(clonedRecord);

          case 8:
            validationErrors = _context.sent;

            if (validationErrors.isEmpty()) {
              _context.next = 11;
              break;
            }

            throw validationErrors;

          case 11:
            return _context.abrupt('return', this._create(clonedRecord));

          case 14:
            return _context.abrupt('return', this._create(clonedRecord));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

GridCollectionModel.prototype._create = (0, _callbackify2.default)(function (record) {
  var id = this._getID();
  this.data.push([id, record]);
  this.trigger('create', id);
  return id;
});

/**
 * Get records list
 *
 * @param {Object}      settings                Request
 * @param {string[]}    settings.fields         Fields
 * @param {number}      [settings.limit]        Limit
 * @param {number}      [settings.offset=0]     Offset
 * @param {Object}      [settings.filters]      Filter values object
 * @param {Array}       [settings.sort]         Sort parameters
 * @param {Array}       [settings.ids]          Record IDs, we need to get for sure
 * @param {Function}    cb                      CallBack function
 */
GridCollectionModel.prototype.read = (0, _callbackify2.default)(function (settings) {
  var data = _utils2.default.cloneDeep(this.data);
  var result = {};

  // Get extra records
  if (settings.extra && settings.extra.length > 0) {
    result.extraRecords = data.filter(function (record) {
      return settings.extra.indexOf(record[0]) >= 0;
    });
  }

  // Delete unnecessary fields
  if (settings.fields) {
    _utils2.default.forEach(result.extraRecords, function (record) {
      _utils2.default.forEach(record[1], function (value, key) {
        if (settings.fields.indexOf(key) === -1) {
          delete record[1][key];
        }
      });
    });
  }

  // Sorting
  if (settings.sort && settings.sort.length > 0) {
    (function () {
      var sortField = settings.sort[0][0];
      var sortMode = settings.sort[0][1];

      data = data.sort(function (prev, next) {
        if (prev[1][sortField] < next[1][sortField]) {
          return sortMode === 'asc' ? -1 : 1;
        } else if (prev[1][sortField] > next[1][sortField]) {
          return sortMode === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    })();
  }

  // Apply filters
  if (this._filtersHandler && settings.filters) {
    data = _utils2.default.cloneDeep(this._filtersHandler(data, settings.filters));
  }

  result.count = data.length;

  // Offset and limit
  if (settings.offset || settings.limit) {
    var start = settings.offset || 0;
    var end = settings.offset + settings.limit || data.length;
    data = data.slice(start, end);
  }

  // Delete unnecessary fields
  if (settings.fields) {
    _utils2.default.forEach(data, function (record) {
      _utils2.default.forEach(record[1], function (value, key) {
        if (settings.fields.indexOf(key) === -1) {
          delete record[1][key];
        }
      });
    });
  }

  result.records = data;

  return _promise2.default.resolve(result);
});

/**
 * Get the particular record
 *
 * @param {number|string}   id      Record ID
 * @param {Array}           fields  Required fields
 * @param {Function}        cb      CallBack function
 */
GridCollectionModel.prototype.getRecord = (0, _callbackify2.default)(function (id, fields) {
  var record = _utils2.default.cloneDeep(this._getRecordByID(id));
  if (!record) {
    return _promise2.default.reject(new Error('Record not found.'));
  }

  var returnRecord = record[1];

  // Deleting unused fields
  if (fields) {
    _utils2.default.forEach(returnRecord, function (value, key) {
      if (fields.indexOf(key) === -1) {
        delete returnRecord[key];
      }
    });
  }

  return _promise2.default.resolve(returnRecord);
});

/**
 * Apply record changes
 *
 * @param {Array}       changes     Changes array
 * @param {Function}    cb          CallBack function
 * @abstract
 */
GridCollectionModel.prototype.update = (0, _callbackify2.default)(function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(changes) {
    var _this = this;

    var completed, appliedChanges, finish, validErrors, promises, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            completed = 0;
            appliedChanges = [];
            finish = false;
            validErrors = void 0;

            if (changes.length) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt('return', []);

          case 6:
            promises = changes.map(function () {
              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(change) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!finish) {
                          _context2.next = 2;
                          break;
                        }

                        return _context2.abrupt('return');

                      case 2:
                        _context2.prev = 2;
                        _context2.next = 5;
                        return _this.isValidRecord(change[1]);

                      case 5:
                        validErrors = _context2.sent;
                        _context2.next = 12;
                        break;

                      case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](2);

                        finish = true;
                        throw _context2.t0;

                      case 12:

                        ++completed;

                        if (!validErrors.isEmpty()) {
                          _context2.next = 19;
                          break;
                        }

                        (0, _assign2.default)(_this._getRecordByID(change[0])[1], change[1]);
                        appliedChanges.push(change);
                        return _context2.abrupt('return', change);

                      case 19:
                        return _context2.abrupt('return', [change[0], validErrors]);

                      case 20:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this, [[2, 8]]);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());
            _context3.next = 9;
            return _promise2.default.all(promises);

          case 9:
            result = _context3.sent;


            if (completed === changes.length) {
              this.trigger('update', appliedChanges);
            }

            return _context3.abrupt('return', result);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields   Fields list
 * @returns {Array}  Dependencies
 */
GridCollectionModel.prototype.getValidationDependency = function (fields) {
  return this._validator.getValidationDependency(fields);
};

/**
 * Validation check
 *
 * @param {Object}      record
 * @param {Function}    cb      CallBack function
 */
GridCollectionModel.prototype.isValidRecord = (0, _callbackify2.default)(function (record) {
  return (0, _toPromise2.default)(this._validator.isValidRecord.bind(this._validator))(record);
});

GridCollectionModel.prototype._getID = function () {
  while (this._getRecordByID(this._id)) {
    this._id++;
  }
  return this._id++;
};

GridCollectionModel.prototype._getRecordByID = function (id) {
  return _utils2.default.find(this.data, function (record) {
    return record[0] === id;
  });
};

exports.default = GridCollectionModel;
module.exports = exports['default'];