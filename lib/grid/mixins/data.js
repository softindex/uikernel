'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _ThrottleError = require('../../common/ThrottleError');

var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    if (this.props.autoSubmit || this.props.realtime) {
      if (this.props.realtime) {
        console.warn('Deprecated: Grid prop "realtime" renamed to "autoSubmit"');
      }
      this.save(this.props.onRealtimeSubmit);
    } else if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
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
  save: (0, _callbackify2.default)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
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

            if (this.props.onChange) {
              this.props.onChange(this.state.changes, this.state.data);
            }

            return _context.abrupt('return', data);

          case 13:
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

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
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

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
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
    var _this2 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, id, data;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Apply all changes
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 3;
              _iterator = (0, _getIterator3.default)(changes);

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 20;
                break;
              }

              _step$value = (0, _slicedToArray3.default)(_step.value, 2), id = _step$value[0], data = _step$value[1];

              // Firstly we update the state
              _this2._setRecordData(id, data);
              // Then we validate the updated data in state
              _context2.prev = 8;
              _context2.next = 11;
              return _this2._checkWarnings(id);

            case 11:
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2['catch'](8);

              if (_context2.t0 instanceof _ThrottleError2.default) {
                _context2.next = 17;
                break;
              }

              throw _context2.t0;

            case 17:
              _iteratorNormalCompletion = true;
              _context2.next = 5;
              break;

            case 20:
              _context2.next = 26;
              break;

            case 22:
              _context2.prev = 22;
              _context2.t1 = _context2['catch'](3);
              _didIteratorError = true;
              _iteratorError = _context2.t1;

            case 26:
              _context2.prev = 26;
              _context2.prev = 27;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 29:
              _context2.prev = 29;

              if (!_didIteratorError) {
                _context2.next = 32;
                break;
              }

              throw _iteratorError;

            case 32:
              return _context2.finish(29);

            case 33:
              return _context2.finish(26);

            case 34:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[3, 22, 26, 34], [8, 13], [27,, 29, 33]]);
    }))();
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
      row = _utils2.default.toEncodedString(arr[i][0]);
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
    var row = _utils2.default.toEncodedString(recordId);
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
    var row = _utils2.default.toEncodedString(recordId);

    if (!this.state.data.hasOwnProperty(row)) {
      throw Error('Record with the ID is not contained in the table.');
    }

    return row;
  },

  /**
   * Load model data
   *
   * @param {Object}      settings    Request parameters
   * @private
   */
  _loadData: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(settings) {
      var data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = void 0;
              _context3.prev = 1;
              _context3.next = 4;
              return this.props.model.read(settings);

            case 4:
              data = _context3.sent;
              _context3.next = 11;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3['catch'](1);

              if (_context3.t0 && this.props.onError) {
                this.props.onError(_context3.t0);
              }
              throw _context3.t0;

            case 11:

              if (this.props.onPageLoad) {
                this.props.onPageLoad(data);
              }
              return _context3.abrupt('return', data);

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 7]]);
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

  _removeRecord: function _removeRecord(rowId, cb) {
    var touchedChanges = this.state.changes[rowId];
    this._removeTR(rowId);
    // this.unselectRecord(recordId, true); // TODO Make unselectRecord by rowId method
    delete this.state.data[rowId];
    delete this.state.recordsInfo[rowId];
    delete this.state.changes[rowId];
    delete this.state.warnings[rowId];
    delete this.state.errors[rowId];
    delete this.state.editor[rowId];
    this.setState(this.state, cb ? cb.bind(this) : null);

    if (touchedChanges && this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  _checkWarnings: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(row) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this.props.warningsValidator) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return');

            case 2:
              return _context4.abrupt('return', this._checkValidatorErrors(row, this.props.warningsValidator, this._getRecord, this.state.warnings));

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function _checkWarnings(_x2) {
      return _ref3.apply(this, arguments);
    }

    return _checkWarnings;
  }(),

  _validateRow: function _validateRow(row) {
    return this._checkValidatorErrors(row, this.props.model, this._getRecordChanges, this.state.errors);
  },

  /**
   * Check errors in "validator" object
   *
   * @param {string}        row         Row ID
   * @param {Validator}     validator   Validator object
   * @param {Function}      getData     Data provider function
   * @param {{}}            result      Validation result object
   * @private
   */
  _checkValidatorErrors: function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(row, validator, getData, result) {
      var _this3 = this;

      var record, validErrors;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              record = getData(row);
              _context5.next = 3;
              return validator.isValidRecord(record);

            case 3:
              validErrors = _context5.sent;


              if (_utils2.default.isEqual(record, getData(row))) {
                if (validErrors.isEmpty()) {
                  delete result[row];
                } else {
                  result[row] = validErrors;
                }

                (0, _keys2.default)(record).forEach(function (field) {
                  _this3._renderBinds(row, field);
                });
              }

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function _checkValidatorErrors(_x3, _x4, _x5, _x6) {
      return _ref4.apply(this, arguments);
    }

    return _checkValidatorErrors;
  }(),

  _onRecordCreated: function _onRecordCreated(recordId) {
    var _this4 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var ids, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, id;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this4.updateTable();

            case 2:
              ids = Array.isArray(recordId) ? recordId : [recordId];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context6.prev = 6;
              _iterator2 = (0, _getIterator3.default)(ids);

            case 8:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context6.next = 23;
                break;
              }

              id = _step2.value;

              if (!_this4._isRecordLoaded(id)) {
                _context6.next = 20;
                break;
              }

              _context6.prev = 11;
              _context6.next = 14;
              return _this4._checkWarnings(_this4._getRowID(id));

            case 14:
              _context6.next = 20;
              break;

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6['catch'](11);

              if (_context6.t0 instanceof _ThrottleError2.default) {
                _context6.next = 20;
                break;
              }

              throw _context6.t0;

            case 20:
              _iteratorNormalCompletion2 = true;
              _context6.next = 8;
              break;

            case 23:
              _context6.next = 29;
              break;

            case 25:
              _context6.prev = 25;
              _context6.t1 = _context6['catch'](6);
              _didIteratorError2 = true;
              _iteratorError2 = _context6.t1;

            case 29:
              _context6.prev = 29;
              _context6.prev = 30;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 32:
              _context6.prev = 32;

              if (!_didIteratorError2) {
                _context6.next = 35;
                break;
              }

              throw _iteratorError2;

            case 35:
              return _context6.finish(32);

            case 36:
              return _context6.finish(29);

            case 37:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this4, [[6, 25, 29, 37], [11, 16], [30,, 32, 36]]);
    }))();
  }
}; /**
    * Copyright (с) 2015-present, SoftIndex LLC.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    */

exports.default = GridDataMixin;
module.exports = exports['default'];