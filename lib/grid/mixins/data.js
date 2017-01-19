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

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _callbackify = require('../../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _toPromise = require('../../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _ValidationErrors = require('../../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _utils = require('../../common/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var GridDataMixin = {
  /**
   * Change table record
   * This method marks changed fields and validates them
   *
   * @param {*}         recordId    Record ID
   * @param {Object}    data        Changed data
   * @param {Function}  cb          CallBack function
   */
  set: function set(recordId, data, cb) {
    //TODO cb does't used
    var row = this._getRowID(recordId);
    this._setRowChanges(row, _utils2.default.cloneDeep(data), cb);
  },

  /**
   * Get record data
   *
   * @param recordId
   * @return {Object}
   */
  getRecord: function getRecord(recordId) {
    var row = this._getRowID(recordId);
    return _utils2.default.cloneDeep(this._getRecord(row));
  },

  /**
   * Get record changes object
   *
   * @param   {*} recordId Record ID
   * @return  {Object}
   */
  getRecordChanges: function getRecordChanges(recordId) {
    var row = this._getRowID(recordId);
    return this._getRecordChanges(row);
  },

  /**
   * Get record warnings object
   *
   * @param   {*} recordId  Record ID
   * @return  {ValidationErrors}
   * @private
   */
  getRecordWarnings: function getRecordWarnings(recordId) {
    var row = this._getRowID(recordId);
    return this.state.warnings[row] || new _ValidationErrors2.default();
  },

  /**
   * Get validation warnings
   *
   * @return {Array|null}
   */
  getWarnings: function getWarnings() {
    var result = [];
    for (var i in this.state.warnings) {
      result.push([this.state.recordsInfo[i].id, this.state.warnings[i]]);
    }
    return result.length ? result : null;
  },

  /**
   * Get record errors object
   *
   * @param   {*} recordId  Record ID
   * @return  {ValidationErrors}
   * @private
   */
  getRecordErrors: function getRecordErrors(recordId) {
    var row = this._getRowID(recordId);
    return this._getRecordErrors(row);
  },

  /**
   * Get validation errors
   *
   * @return {Array|null}
   */
  getErrors: function getErrors() {
    var result = [];
    for (var i in this.state.errors) {
      result.push([this.state.recordsInfo[i].id, this.state.errors[i]]);
    }
    return result.length ? result : null;
  },

  /**
   * Get table model
   *
   * @returns {AbstractGridModel}
   */
  getModel: function getModel() {
    return this.props.model;
  },

  /**
   * Save grid changes
   *
   * @param {Function} cb CallBack function
   */
  save: (0, _callbackify2.default)((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var _this = this;

    var errors, changes, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = this.getErrors();

            // Collect all valid changes

            changes = _utils2.default.reduce(this.state.changes, function (result, rowChanges, row) {
              if (!errors || !errors[row]) {
                if (_this.props.saveFullRecord) {
                  result[row] = _this._getRecord(row);
                } else {
                  result[row] = {};
                  (0, _assign2.default)(result[row], rowChanges, _utils2.default.pick(_this.state.data[row], _this.props.model.getValidationDependency((0, _keys2.default)(result[row]))));
                }
              }
              return result;
            }, {});

            // Cancel new record display

            this.removeRecordStatusAll('new');

            // Pass changes to table model processing
            _context.next = 5;
            return (0, _toPromise2.default)(this.props.model.update.bind(this.props.model))(this._dataObjectToArray(changes));

          case 5:
            data = _context.sent;

            if (this._isMounted) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return');

          case 8:

            this.state.partialErrorChecking = false;

            data.forEach(function (record) {
              var row = _this._getRowID(record[0]);

              // Skip records that are user changed while data processing
              if (!_utils2.default.isEqual(_this.state.changes[row], changes[row])) {
                return;
              }

              // Process validation errors
              if (record[1] instanceof _ValidationErrors2.default) {
                _this.state.errors[row] = record[1];
                return;
              }

              // Cancel changed data status of the parameters, that are changed
              _utils2.default.forEach(changes[row], function (value, field) {
                if (_utils2.default.isEqual(value, this.state.changes[row][field])) {
                  delete this.state.changes[row][field];
                }
              }, _this);

              // Clear changed data row if it's empty
              if (_utils2.default.isEmpty(_this.state.changes[row])) {
                delete _this.state.changes[row];
                if (!_this._isMainRow(row)) {
                  _this._removeRecord(row);
                }
              }
            });

            this._renderBody();

            return _context.abrupt('return', data);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }))),

  /**
   * Clear record changes
   *
   * @param {*} recordId Record ID
   */
  clearRecordChanges: function clearRecordChanges(recordId) {
    var row = this._getRowID(recordId);

    delete this.state.changes[row];
    delete this.state.warnings[row];
    delete this.state.errors[row];

    this._updateRow(row);
  },

  /**
   * Clear all table changes
   */
  clearAllChanges: function clearAllChanges() {
    var i = void 0;
    for (i in this.state.data) {
      if (!this._isMainRow(i)) {
        delete this.state.data[i];
        delete this.state.recordsInfo[i];
      }
    }
    this.state.changes = {};
    this.state.statuses = {};
    this.state.warnings = {};
    this.state.errors = {};
    this.state.partialErrorChecking = this.props.partialErrorChecking;

    this._renderBody();
  },

  /**
   * Reset to initial table state
   */
  reset: function reset() {
    this._setPage(0);
    if (!this._isSortingPropsMode()) {
      this._resetSorting();
    }
    this.updateTable();
  },

  /**
   * Get record changes object
   *
   * @param   {string}        row     Row ID
   * @return  {Object}
   */
  _getRecordChanges: function _getRecordChanges(row) {
    if (this.state.changes.hasOwnProperty(row)) {
      return _utils2.default.cloneDeep(this.state.changes[row]);
    }
    return {};
  },

  /**
   * Set record data
   *
   * @param {*}       recordId  Record ID
   * @param {Object}  data      Data
   * @private
   */
  _setRecordData: function _setRecordData(recordId, data) {
    if (!this._isRecordLoaded(recordId)) {
      return;
    }

    // TODO done through _dataArrayToObject
    var field = void 0;
    var row = this._getRowID(recordId);

    // Apply and redraw all record changes
    for (field in data) {
      this.state.data[row][field] = _utils2.default.cloneDeep(data[field]);
      this._renderBinds(row, field);
    }
  },

  /**
   * Table row has warning flag
   *
   * @param   {string}        row     Row ID
   * @param   {Array|string}  fields
   * @returns {boolean}
   * @private
   */
  _hasWarning: function _hasWarning(row, fields) {
    return this._checkFieldInValidation(row, fields, this.state.warnings);
  },

  /**
   * Table row has error flag
   *
   * @param   {string}        row     Row ID
   * @param   {Array|string}  fields
   * @returns {boolean}
   * @private
   */
  _hasError: function _hasError(row, fields) {
    return this._checkFieldInValidation(row, fields, this.state.errors);
  },

  /**
   * Table row has error in "validation" object
   *
   * @param   {string}        row
   * @param   {Array|string}  fields
   * @param   {Validation}    validation
   * @returns {boolean}
   * @private
   */
  _checkFieldInValidation: function _checkFieldInValidation(row, fields, validation) {
    var i = void 0;

    if (!validation[row]) {
      return false;
    }

    if (this.state.partialErrorChecking && !this.state.changes.hasOwnProperty(row)) {
      return false;
    }

    if (!Array.isArray(fields)) {
      fields = [fields];
    }

    for (i = 0; i < fields.length; i++) {
      if (validation[row].hasError(fields[i])) {
        return true;
      }
    }
    return false;
  },

  /**
   * Table row changed flag
   *
   * @param   {string}        row         Row ID
   * @param   {Array|string}  [fields]
   * @return  {boolean}
   * @private
   */
  _isChanged: function _isChanged(row, fields) {
    var i = void 0;
    if (!this.state.changes[row]) {
      return false;
    }

    if (fields) {
      if (!Array.isArray(fields)) {
        fields = [fields];
      }
      for (i = 0; i < fields.length; i++) {
        if (this.state.changes[row].hasOwnProperty(fields[i])) {
          return true;
        }
      }
      return false;
    }

    return true;
  },

  /**
   * Get table row errors object
   *
   * @param   {string} row  Row ID
   * @return  {ValidationErrors}
   * @private
   */
  _getRecordErrors: function _getRecordErrors(row) {
    return this.state.errors[row] || new _ValidationErrors2.default();
  },

  /**
   * Pass changes to the table
   * This method marks changed fields
   *
   * @param {string}      row         Row ID
   * @param {Object}      data        Changed data
   * @private
   */
  _setRowChanges: function _setRowChanges(row, data) {
    var changes = this.state.changes;

    if (!changes[row]) {
      changes[row] = {};
    }

    changes[row] = _utils2.default.getRecordChanges(this.props.model, this.state.data[row], changes[row], data);

    if (_utils2.default.isEmpty(changes[row])) {
      delete changes[row];
    } else {
      // Redraw the changes in the row
      _utils2.default.forEach(changes[row], function (value, field) {
        this._renderBinds(row, field);
      }, this);
    }
  },

  /**
   * Get table record
   *
   * @param {string} row Row ID
   * @returns {Object} Required table data record
   * @private
   */
  _getRecord: function _getRecord(row) {
    if (this.state.data[row]) {
      return (0, _assign2.default)({}, this.state.data[row], this.state.changes[row]);
    }
    return null;
  },

  /**
   * Set table data
   *
   * @param {Array}  changes  Changes
   * @private
   */
  _setData: function _setData(changes) {
    var i = void 0;

    // Apply all changes
    for (i = 0; i < changes.length; i++) {
      this._setRecordData(changes[i][0], changes[i][1]);
    }
  },

  /**
   * Get record field title that changes column Editor
   *
   * @param       {string}        id  Column ID
   * @returns     {Array|string}     Fields that change Editor
   * @private
   */
  _getBindParam: function _getBindParam(id) {
    return this.props.cols[id].editorField || id;
  },

  /**
   * This method converts data array to the object with keys presented as record ID hash
   *
   * @param   {Array}    arr     Data array
   * @returns {Object}    Object result
   * @private
   */
  _dataArrayToObject: function _dataArrayToObject(arr) {
    var i = void 0;
    var records = {};
    var info = {};
    var row = void 0;

    for (i = 0; i < arr.length; i++) {
      row = (0, _stringify2.default)(arr[i][0]);
      records[row] = arr[i][1];
      info[row] = {
        id: arr[i][0],
        index: i // Sort index
      };
    }

    return {
      records: records,
      info: info
    };
  },

  /**
   * This method converts data object to the array with keys presented as record ID hash
   *
   * @param   {Object}  obj     Data object
   * @returns {Array}   Array result
   * @private
   */
  _dataObjectToArray: function _dataObjectToArray(obj) {
    var i = void 0;
    var arr = [];

    for (i in obj) {
      arr.push([this.state.recordsInfo[i].id, _utils2.default.clone(obj[i])]);
    }

    return arr;
  },

  /**
   * Is main table row flag
   *
   * @param   {string}    row     Row ID
   * @return  {boolean}
   * @private
   */
  _isMainRow: function _isMainRow(row) {
    return this.state.mainIds.indexOf(row) >= 0;
  },

  _isRecordLoaded: function _isRecordLoaded(recordId) {
    // TODO Can be optimized
    var row = (0, _stringify2.default)(recordId);
    return this.state.data.hasOwnProperty(row);
  },

  /**
   * Get table row ID having record ID
   *
   * @param   {*}       recordId    Record ID
   * @return  {string}  Row ID
   * @private
   */
  _getRowID: function _getRowID(recordId) {
    var row = (0, _stringify2.default)(recordId);

    if (!this.state.data.hasOwnProperty(row)) {
      throw Error('Record with the ID is not contained in the table.');
    }

    return row;
  },

  /**
   * Load model data
   *
   * @param {Object}      settings    Request parameters
   * @param {Function}    cb          CallBack function
   * @private
   */
  _loadData: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(settings) {
      var data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return this.props.model.read(settings);

            case 4:
              data = _context2.sent;
              _context2.next = 11;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](1);

              if (_context2.t0 && this.props.onError) {
                this.props.onError(_context2.t0);
              }
              throw _context2.t0;

            case 11:

              if (this.props.onPageLoad) {
                this.props.onPageLoad(data);
              }
              return _context2.abrupt('return', data);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 7]]);
    }));

    function _loadData(_x) {
      return _ref2.apply(this, arguments);
    }

    return _loadData;
  }(),

  /**
   * Find record IDs that need to be displayed additionally
   *
   * @return {Array} Additional IDs array
   * @private
   */
  _getAdditionalIds: function _getAdditionalIds() {
    var additionalIds = this._getRecordsWithStatus();
    var id = void 0;
    for (var row in this.state.changes) {
      id = this.state.recordsInfo[row].id;
      if (additionalIds.indexOf(id) < 0) {
        additionalIds.push(id);
      }
    }
    return additionalIds;
  },

  _removeRecord: function _removeRecord(recordId, cb) {
    this._removeTR(recordId);
    this.unselectRecord(recordId, true);
    delete this.state.data[recordId];
    delete this.state.recordsInfo[recordId];
    delete this.state.changes[recordId];
    delete this.state.warnings[recordId];
    delete this.state.errors[recordId];
    delete this.state.editor[recordId];
    this.setState({
      data: this.state.data,
      changes: this.state.changes,
      warnings: this.state.warnings,
      errors: this.state.errors,
      editor: this.state.editor
    }, cb ? cb.bind(this) : null);
  },

  _checkWarnings: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(row) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.props.warningsValidator) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return');

            case 2:
              return _context3.abrupt('return', this._checkValidatorErrors(row, this.props.warningsValidator, this.state.warnings));

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _checkWarnings(_x2) {
      return _ref3.apply(this, arguments);
    }

    return _checkWarnings;
  }(),

  _validateRow: function _validateRow(row) {
    return this._checkValidatorErrors(row, this.props.model, this.state.errors);
  },

  /**
   * Check errors in "validator" object
   *
   * @param {string}        row         Row ID
   * @param {Validator}     validator   Validator object
   * @param {Validation[]}  result      Result object
   * @private
   */
  _checkValidatorErrors: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(row, validator, result) {
      var _this2 = this;

      var record, validErrors;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              record = this._getRecordChanges(row);
              _context4.next = 3;
              return validator.isValidRecord(record);

            case 3:
              validErrors = _context4.sent;


              if (_utils2.default.isEqual(record, this._getRecordChanges(row))) {
                if (validErrors.isEmpty()) {
                  delete result[row];
                } else {
                  result[row] = validErrors;
                }

                (0, _keys2.default)(record).forEach(function (field) {
                  _this2._renderBinds(row, field);
                });
              }

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function _checkValidatorErrors(_x3, _x4, _x5) {
      return _ref4.apply(this, arguments);
    }

    return _checkValidatorErrors;
  }(),

  _onRecordCreated: function _onRecordCreated(recordId) {
    var _this3 = this;

    this.updateTable().then(function () {
      if (_this3._isRecordLoaded(recordId)) {
        _this3._checkWarnings(_this3._getRowID(recordId));
      }
    });
  }
};

exports.default = GridDataMixin;
module.exports = exports['default'];