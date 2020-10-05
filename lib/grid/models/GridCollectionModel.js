"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Validator = _interopRequireDefault(require("../../common/validation/Validator"));

var _AbstractGridModel2 = _interopRequireDefault(require("./AbstractGridModel"));

var _utils = require("../../common/utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var GridCollectionModel =
/*#__PURE__*/
function (_AbstractGridModel) {
  (0, _inherits2["default"])(GridCollectionModel, _AbstractGridModel);

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
  function GridCollectionModel() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, GridCollectionModel);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(GridCollectionModel).call(this));
    _this._data = (0, _utils.cloneDeep)(options.data) || [];
    _this._id = 1;
    _this._filtersHandler = options.filtersHandler;

    if (options.validation) {
      (0, _utils.warn)('Property "validation" is deprecated, use "validator" instead');
    }

    _this._validator = options.validator || options.validation || new _Validator["default"]();
    _this._requiredFields = options.requiredFields || [];
    return _this;
  }
  /**
   * Set data array in model
   *
   * @param {Object[]} data
   */


  (0, _createClass2["default"])(GridCollectionModel, [{
    key: "setData",
    value: function setData(data) {
      var currentData = this._data.reduce(function (result, _ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
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
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
              recordId = _step$value[0],
              record = _step$value[1];

          var id = JSON.stringify(recordId);
          recordIds.push(id);

          if (!currentData[id]) {
            createdRecordsIds.push(recordId);
            continue;
          }

          if (!(0, _utils.isEqual)(record, currentData[id])) {
            updatedRecords.push(record);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var deletedRecordsIds = (0, _utils.without)(Object.keys(currentData), recordIds).map(JSON.parse);
      this._data = (0, _utils.cloneDeep)(data);

      if (createdRecordsIds.length) {
        this.trigger('create', [createdRecordsIds]);
      }

      if (deletedRecordsIds.length) {
        this.trigger('delete', deletedRecordsIds);
      }

      if (updatedRecords.length) {
        this.trigger('update', updatedRecords);
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      return this._data;
    }
    /**
     * Remove field by record id from data
     *
     * @param   {Number}  recordId   record id for remove
     * @returns {Number}  recordId   return id of deleted record
     */

  }, {
    key: "delete",
    value: function _delete(recordId) {
      return _regenerator["default"].async(function _delete$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this._data = this._data.filter(function (record) {
                return record[0] !== recordId;
              });
              this.trigger('delete', recordId);
              return _context.abrupt("return", recordId);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
    /**
     * Add a record to local collection
     *
     * @param {Object}      record  Record object
     */

  }, {
    key: "create",
    value: function create(record) {
      var id, clonedRecord, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, field, validationErrors;

      return _regenerator["default"].async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = this._getID();
              clonedRecord = (0, _utils.clone)(record); // Create record with definite id

              if (Array.isArray(clonedRecord) && clonedRecord.length === 2) {
                id = clonedRecord[0];
                clonedRecord = clonedRecord[1];
              }

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 6;

              for (_iterator2 = this._requiredFields[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                field = _step2.value;

                if (!clonedRecord.hasOwnProperty(field)) {
                  clonedRecord[field] = null;
                }
              }

              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](6);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 14:
              _context2.prev = 14;
              _context2.prev = 15;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 17:
              _context2.prev = 17;

              if (!_didIteratorError2) {
                _context2.next = 20;
                break;
              }

              throw _iteratorError2;

            case 20:
              return _context2.finish(17);

            case 21:
              return _context2.finish(14);

            case 22:
              _context2.next = 24;
              return _regenerator["default"].awrap(this.isValidRecord(clonedRecord));

            case 24:
              validationErrors = _context2.sent;

              if (validationErrors.isEmpty()) {
                _context2.next = 27;
                break;
              }

              throw validationErrors;

            case 27:
              return _context2.abrupt("return", this._create(clonedRecord, id));

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[6, 10, 14, 22], [15,, 17, 21]]);
    }
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
      var data = (0, _utils.cloneDeep)(this._data);
      var result = {}; // Get extra records

      if (settings.extra && settings.extra.length > 0) {
        result.extraRecords = data.filter(function (record) {
          return settings.extra.indexOf(record[0]) >= 0;
        });
      } // Delete unnecessary fields


      if (settings.fields) {
        (0, _utils.forEach)(result.extraRecords, function (record) {
          (0, _utils.forEach)(record[1], function (value, key) {
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
        data = (0, _utils.cloneDeep)(this._filtersHandler(data, settings.filters));
      }

      result.count = data.length; // Offset and limit

      if (settings.offset || settings.limit) {
        var start = settings.offset || 0;
        var end = settings.offset + settings.limit || data.length;
        data = data.slice(start, end);
      } // Delete unnecessary fields


      if (settings.fields) {
        (0, _utils.forEach)(data, function (record) {
          (0, _utils.forEach)(record[1], function (value, key) {
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
      var record = (0, _utils.cloneDeep)(this._getRecordByID(id));

      if (!record) {
        return Promise.reject(new Error('Record not found.'));
      }

      var returnRecord = record[1]; // Deleting unused fields

      if (fields) {
        (0, _utils.forEach)(returnRecord, function (value, key) {
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
    value: function update(changes) {
      var _this2 = this;

      var appliedChanges, result, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, recordId, _changes;

      return _regenerator["default"].async(function update$(_context4) {
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
              return _regenerator["default"].awrap(Promise.all(changes.map(function _callee(_ref3) {
                var _ref4, recordId, changes, validErrors;

                return _regenerator["default"].async(function _callee$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _ref4 = (0, _slicedToArray2["default"])(_ref3, 2), recordId = _ref4[0], changes = _ref4[1];
                        _context3.next = 3;
                        return _regenerator["default"].awrap(_this2.isValidRecord(changes));

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
                });
              })));

            case 5:
              result = _context4.sent;

              if (!appliedChanges.length) {
                _context4.next = 27;
                break;
              }

              // Apply changes
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context4.prev = 10;

              for (_iterator3 = appliedChanges[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2), recordId = _step3$value[0], _changes = _step3$value[1];
                Object.assign(this._getRecordByID(recordId)[1], _changes);
              }

              _context4.next = 18;
              break;

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](10);
              _didIteratorError3 = true;
              _iteratorError3 = _context4.t0;

            case 18:
              _context4.prev = 18;
              _context4.prev = 19;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 21:
              _context4.prev = 21;

              if (!_didIteratorError3) {
                _context4.next = 24;
                break;
              }

              throw _iteratorError3;

            case 24:
              return _context4.finish(21);

            case 25:
              return _context4.finish(18);

            case 26:
              this.trigger('update', appliedChanges);

            case 27:
              return _context4.abrupt("return", result);

            case 28:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[10, 14, 18, 26], [19,, 21, 25]]);
    }
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
      return (0, _utils.find)(this._data, function (record) {
        return record[0] === id;
      });
    }
  }, {
    key: "_create",
    value: function _create(record, id) {
      this._data = [].concat((0, _toConsumableArray2["default"])(this._data), [[id, record]]);
      this.trigger('create', [id]);
      return id;
    }
  }]);
  return GridCollectionModel;
}(_AbstractGridModel2["default"]);

var _default = GridCollectionModel;
exports["default"] = _default;
module.exports = exports.default;