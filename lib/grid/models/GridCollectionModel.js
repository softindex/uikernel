"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _common = _interopRequireDefault(require("../../common/validation/validators/common"));

var _AbstractGridModel2 = _interopRequireDefault(require("./AbstractGridModel"));

var _utils = _interopRequireDefault(require("../../common/utils"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var GridCollectionModel =
/*#__PURE__*/
function (_AbstractGridModel) {
  (0, _inherits2.default)(GridCollectionModel, _AbstractGridModel);

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
  function GridCollectionModel(options) {
    var _this;

    (0, _classCallCheck2.default)(this, GridCollectionModel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GridCollectionModel).call(this));
    options = options || {};
    _this.data = _utils.default.cloneDeep(options.data) || [];
    _this._id = 1;
    _this._filtersHandler = options.filtersHandler;

    if (options.validation) {
      _utils.default.warn('Property "validation" is deprecated, use "validator" instead');
    }

    _this._validator = options.validator || options.validation || new _common.default();
    _this._requiredFields = options.requiredFields || [];
    _this._validateOnCreate = options.hasOwnProperty('validateOnCreate') ? options.validateOnCreate : true; // TODO Deprecated. Will be deleted in v0.17.0

    if (!_this._validateOnCreate) {
      console.warn('Deprecated option "validateOnCreate".');
    }

    return _this;
  }
  /**
   * Set data array in model
   *
   * @param {Object[]} data
   */


  (0, _createClass2.default)(GridCollectionModel, [{
    key: "setData",
    value: function setData(data) {
      var currentData = this.data.reduce(function (result, _ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            recordId = _ref2[0],
            record = _ref2[1];

        result[JSON.stringify(recordId)] = record;
        return result;
      }, {});
      var createdRecordsIds = [];
      var updatedRecords = [];
      var recordIds = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
              recordId = _step$value[0],
              record = _step$value[1];

          var id = JSON.stringify(recordId);
          recordIds.push(id);

          if (!currentData[id]) {
            createdRecordsIds.push(recordId);
            continue;
          }

          if (!_utils.default.isEqual(record, currentData[id])) {
            updatedRecords.push(record);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var deletedRecordsIds = _utils.default.without(Object.keys(currentData), recordIds).map(JSON.parse);

      this.data = _utils.default.cloneDeep(data);

      if (createdRecordsIds.length) {
        this.trigger('create', createdRecordsIds);
      }

      if (deletedRecordsIds.length) {
        this.trigger('delete', deletedRecordsIds);
      }

      if (updatedRecords.length) {
        this.trigger('update', updatedRecords);
      }
    }
    /**
     * Remove field by record id from data
     *
     * @param   {Number}  recordId   record id for remove
     * @returns {Number}  recordId   return id of deleted record
     */

  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(recordId) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.data = this.data.filter(function (record) {
                  return record[0] !== recordId;
                });
                this.trigger('delete', recordId);
                return _context.abrupt("return", recordId);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function _delete(_x) {
        return _delete2.apply(this, arguments);
      };
    }()
    /**
     * Add a record to local collection
     *
     * @param {Object}      record  Record object
     */

  }, {
    key: "create",
    value: function () {
      var _create2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(record) {
        var i, field, validationErrors, id, clonedRecord;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = this._getID();
                clonedRecord = _utils.default.clone(record); // Create record with definite id

                if (Array.isArray(clonedRecord) && clonedRecord.length === 2) {
                  id = clonedRecord[0];
                  clonedRecord = clonedRecord[1];
                }

                for (i in this._requiredFields) {
                  field = this._requiredFields[i];

                  if (!clonedRecord.hasOwnProperty(field)) {
                    clonedRecord[field] = null;
                  }
                }

                if (!this._validateOnCreate) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 7;
                return this.isValidRecord(clonedRecord);

              case 7:
                validationErrors = _context2.sent;

                if (validationErrors.isEmpty()) {
                  _context2.next = 10;
                  break;
                }

                throw validationErrors;

              case 10:
                return _context2.abrupt("return", this._create(clonedRecord, id));

              case 13:
                return _context2.abrupt("return", this._create(clonedRecord, id));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function create(_x2) {
        return _create2.apply(this, arguments);
      };
    }()
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
     */

  }, {
    key: "read",
    value: function read(settings) {
      var data = _utils.default.cloneDeep(this.data);

      var result = {}; // Get extra records

      if (settings.extra && settings.extra.length > 0) {
        result.extraRecords = data.filter(function (record) {
          return settings.extra.indexOf(record[0]) >= 0;
        });
      } // Delete unnecessary fields


      if (settings.fields) {
        _utils.default.forEach(result.extraRecords, function (record) {
          _utils.default.forEach(record[1], function (value, key) {
            if (settings.fields.indexOf(key) === -1) {
              delete record[1][key];
            }
          });
        });
      } // Sorting


      if (settings.sort && settings.sort.length > 0) {
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
      } // Apply filters


      if (this._filtersHandler && settings.filters) {
        data = _utils.default.cloneDeep(this._filtersHandler(data, settings.filters));
      }

      result.count = data.length; // Offset and limit

      if (settings.offset || settings.limit) {
        var start = settings.offset || 0;
        var end = settings.offset + settings.limit || data.length;
        data = data.slice(start, end);
      } // Delete unnecessary fields


      if (settings.fields) {
        _utils.default.forEach(data, function (record) {
          _utils.default.forEach(record[1], function (value, key) {
            if (settings.fields.indexOf(key) === -1) {
              delete record[1][key];
            }
          });
        });
      }

      result.records = data;
      return Promise.resolve(result);
    }
    /**
     * Get the particular record
     *
     * @param {number|string}   id      Record ID
     * @param {Array}           fields  Required fields
     */

  }, {
    key: "getRecord",
    value: function getRecord(id, fields) {
      var record = _utils.default.cloneDeep(this._getRecordByID(id));

      if (!record) {
        return Promise.reject(new Error('Record not found.'));
      }

      var returnRecord = record[1]; // Deleting unused fields

      if (fields) {
        _utils.default.forEach(returnRecord, function (value, key) {
          if (fields.indexOf(key) === -1) {
            delete returnRecord[key];
          }
        });
      }

      return Promise.resolve(returnRecord);
    }
    /**
     * Apply record changes
     *
     * @param {Array}       changes     Changes array
     * @abstract
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(changes) {
        var _this2 = this;

        var appliedChanges, result, _i, _appliedChanges$_i, recordId, _changes;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (changes.length) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", []);

              case 2:
                appliedChanges = [];
                _context4.next = 5;
                return Promise.all(changes.map(
                /*#__PURE__*/
                function () {
                  var _ref4 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee3(_ref3) {
                    var _ref5, recordId, changes, validErrors;

                    return _regenerator.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _ref5 = (0, _slicedToArray2.default)(_ref3, 2), recordId = _ref5[0], changes = _ref5[1];
                            _context3.next = 3;
                            return _this2.isValidRecord(changes);

                          case 3:
                            validErrors = _context3.sent;

                            if (validErrors.isEmpty()) {
                              _context3.next = 6;
                              break;
                            }

                            return _context3.abrupt("return", [recordId, validErrors]);

                          case 6:
                            appliedChanges.push([recordId, changes]);
                            return _context3.abrupt("return", [recordId, changes]);

                          case 8:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, this);
                  }));

                  return function (_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 5:
                result = _context4.sent;

                if (appliedChanges.length) {
                  // Apply changes
                  for (_i = 0; _i < appliedChanges.length; _i++) {
                    _appliedChanges$_i = (0, _slicedToArray2.default)(appliedChanges[_i], 2), recordId = _appliedChanges$_i[0], _changes = _appliedChanges$_i[1];
                    Object.assign(this._getRecordByID(recordId)[1], _changes);
                  }

                  this.trigger('update', appliedChanges);
                }

                return _context4.abrupt("return", result);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function update(_x3) {
        return _update.apply(this, arguments);
      };
    }()
    /**
     * Validation check
     *
     * @param {Object}      record
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord(record) {
      return this._validator.isValidRecord(record);
    }
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields   Fields list
     * @returns {Array}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }, {
    key: "_getID",
    value: function _getID() {
      while (this._getRecordByID(this._id)) {
        this._id++;
      }

      return this._id++;
    }
  }, {
    key: "_getRecordByID",
    value: function _getRecordByID(id) {
      return _utils.default.find(this.data, function (record) {
        return record[0] === id;
      });
    }
  }, {
    key: "_create",
    value: function _create(record, id) {
      this.data.push([id, record]);
      this.trigger('create', id);
      return id;
    }
  }]);
  return GridCollectionModel;
}(_AbstractGridModel2.default);

var _default = GridCollectionModel;
exports.default = _default;
module.exports = exports.default;