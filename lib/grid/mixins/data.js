"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ValidationErrors = _interopRequireDefault(require("../../common/validation/ValidationErrors"));

var _utils = require("../../common/utils");

var _ThrottleError = _interopRequireDefault(require("../../common/ThrottleError"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

    this._setRowChanges(row, (0, _utils.cloneDeep)(data), cb);

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

    return (0, _utils.cloneDeep)(this._getRecordWithChanges(row));
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

    return this.state.warnings[row] || new _ValidationErrors["default"]();
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
   */
  save: function save() {
    var _this = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _context;

      var errors, changes, data, unhandledErrors, _iterator, _step, _loop, _ret, errorHandler;

      return _regenerator["default"].wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              errors = _this.getErrors(); // Collect all valid changes

              changes = (0, _utils.reduce)(_this.state.changes, function (result, rowChanges, row) {
                if (!errors || !errors[row]) {
                  if (_this.props.saveFullRecord) {
                    result[row] = _this._getRecordWithChanges(row);
                  } else {
                    result[row] = {};
                    Object.assign(result[row], rowChanges, (0, _utils.pick)(_this.state.data[row], _this.props.model.getValidationDependency(Object.keys(result[row]))));
                  }
                }

                return result;
              }, {}); // Cancel new record display

              _this.removeRecordStatusAll('new'); // Pass changes to table model processing


              _context2.next = 5;
              return _this.props.model.update(_this._dataObjectToArray(changes));

            case 5:
              data = _context2.sent;

              if (_this._isMounted) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return");

            case 8:
              _this.state.partialErrorChecking = false;
              unhandledErrors = [];
              _iterator = _createForOfIteratorHelper(data);
              _context2.prev = 11;

              _loop = function _loop() {
                var record = _step.value;

                var row = _this._getRowID(record[0]); // Skip records that are user changed while data processing


                if (!(0, _utils.isEqual)(_this.state.changes[row], changes[row])) {
                  return "continue";
                }

                if (record[1] instanceof Error) {
                  unhandledErrors.push(record[1]);
                  return "continue";
                } // Process validation errors


                if (record[1] instanceof _ValidationErrors["default"]) {
                  _this.state.errors[row] = record[1];
                  return "continue";
                } // Cancel changed data status of the parameters, that are changed


                (0, _utils.forEach)(changes[row], function (value, field) {
                  if ((0, _utils.isEqual)(value, this.state.changes[row][field])) {
                    delete this.state.changes[row][field];
                  }
                }, _this); // Clear changed data row if it's empty

                if ((0, _utils.isEmpty)(_this.state.changes[row])) {
                  delete _this.state.changes[row];

                  if (!_this._isMainRow(row)) {
                    _this._removeRecord(row);
                  }
                }
              };

              _iterator.s();

            case 14:
              if ((_step = _iterator.n()).done) {
                _context2.next = 20;
                break;
              }

              _ret = _loop();

              if (!(_ret === "continue")) {
                _context2.next = 18;
                break;
              }

              return _context2.abrupt("continue", 18);

            case 18:
              _context2.next = 14;
              break;

            case 20:
              _context2.next = 25;
              break;

            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](11);

              _iterator.e(_context2.t0);

            case 25:
              _context2.prev = 25;

              _iterator.f();

              return _context2.finish(25);

            case 28:
              _this._renderBody();

              if (_this.props.onChange) {
                _this.props.onChange(_this.state.changes, _this.state.data);
              }

              errorHandler = _this.props.onError || (_context = console).error.bind(_context);
              unhandledErrors.forEach(function (error) {
                return errorHandler(error);
              });
              return _context2.abrupt("return", data);

            case 33:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, null, [[11, 22, 25, 28]]);
    }))();
  },

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
    var i;

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
      return (0, _utils.cloneDeep)(this.state.changes[row]);
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
    } // TODO done through _dataArrayToObject


    var row = this._getRowID(recordId); // Apply and redraw all record changes


    for (var field in data) {
      this.state.data[row][field] = (0, _utils.cloneDeep)(data[field]);

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
    var i;

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
    var i;

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
    return this.state.errors[row] || new _ValidationErrors["default"]();
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

    changes[row] = (0, _utils.getRecordChanges)(this.props.model, this.state.data[row], changes[row], data);

    if ((0, _utils.isEmpty)(changes[row])) {
      delete changes[row];
    }

    for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
      var column = _Object$keys[_i];

      this._renderBinds(row, column);
    }

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  /**
   * Get table record with changes
   *
   * @param {string} row Row ID
   * @returns {Object} Required table data record
   * @private
   */
  _getRecordWithChanges: function _getRecordWithChanges(row) {
    if (this.state.data[row]) {
      return Object.assign({}, this.state.data[row], this.state.changes[row]);
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

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _iterator2, _step2, _step2$value, id, data;

      return _regenerator["default"].wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Apply all changes
              _iterator2 = _createForOfIteratorHelper(changes);
              _context3.prev = 1;

              _iterator2.s();

            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context3.next = 17;
                break;
              }

              _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2), id = _step2$value[0], data = _step2$value[1];

              // Firstly we update the state
              _this2._setRecordData(id, data); // Then we validate the updated data in state


              _context3.prev = 6;
              _context3.next = 9;
              return _this2._checkWarnings(id);

            case 9:
              _context3.next = 15;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](6);

              if (_context3.t0 instanceof _ThrottleError["default"]) {
                _context3.next = 15;
                break;
              }

              throw _context3.t0;

            case 15:
              _context3.next = 3;
              break;

            case 17:
              _context3.next = 22;
              break;

            case 19:
              _context3.prev = 19;
              _context3.t1 = _context3["catch"](1);

              _iterator2.e(_context3.t1);

            case 22:
              _context3.prev = 22;

              _iterator2.f();

              return _context3.finish(22);

            case 25:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, null, [[1, 19, 22, 25], [6, 11]]);
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
    var i;
    var records = {};
    var info = {};
    var row;

    for (i = 0; i < arr.length; i++) {
      row = (0, _utils.toEncodedString)(arr[i][0]);
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
    var i;
    var arr = [];

    for (i in obj) {
      arr.push([this.state.recordsInfo[i].id, (0, _utils.clone)(obj[i])]);
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
    var row = (0, _utils.toEncodedString)(recordId);
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
    var row = (0, _utils.toEncodedString)(recordId);

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
  _loadData: function _loadData(settings) {
    var _this3 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var data;
      return _regenerator["default"].wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _this3.props.model.read(settings);

            case 3:
              data = _context4.sent;
              _context4.next = 10;
              break;

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);

              if (_context4.t0 && _this3.props.onError) {
                _this3.props.onError(_context4.t0);
              }

              throw _context4.t0;

            case 10:
              if (_this3.props.onPageLoad) {
                _this3.props.onPageLoad(data);
              }

              return _context4.abrupt("return", data);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3, null, [[0, 6]]);
    }))();
  },

  /**
   * Find record IDs that need to be displayed additionally
   *
   * @return {Array} Additional IDs array
   * @private
   */
  _getAdditionalIds: function _getAdditionalIds() {
    var additionalIds = this._getRecordsWithStatus();

    var id;

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

    this._removeTR(rowId); // this.unselectRecord(recordId, true); // TODO Make unselectRecord by rowId method


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
  _checkWarnings: function _checkWarnings(row) {
    var _this4 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (_this4.props.warningsValidator) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              return _context5.abrupt("return", _this4._checkValidatorErrors(row, _this4.props.warningsValidator, _this4._getRecordWithChanges, _this4.state.warnings));

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4);
    }))();
  },
  _validateRow: function _validateRow(row) {
    var _this5 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this5._checkValidatorErrors(row, _this5.props.model, _this5._getRecordChanges, _this5.state.errors);

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee5);
    }))();
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
  _checkValidatorErrors: function _checkValidatorErrors(row, validator, getData, result) {
    var _this6 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var recordId, record, validErrors;
      return _regenerator["default"].wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              recordId = _this6.state.recordsInfo[row].id;
              record = getData(row);
              _context7.next = 4;
              return validator.isValidRecord(record, recordId);

            case 4:
              validErrors = _context7.sent;

              if (!(0, _utils.isEqual)(record, getData(row))) {
                _context7.next = 9;
                break;
              }

              if (validErrors.isEmpty()) {
                delete result[row];
              } else {
                result[row] = validErrors;
              }

              _context7.next = 9;
              return _this6._updateRow(row);

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee6);
    }))();
  },

  /**
   * Handler for "create" event of GridModel
   *
   * @param {*[]|*} recordIds
   * @return {void}
   * @private
   */
  _onRecordsCreated: function _onRecordsCreated(recordIds) {
    var _this7 = this;

    if (!Array.isArray(recordIds)) {
      (0, _utils.warn)('Not array recordsIds in "create" event is deprecated');
      recordIds = [recordIds];
    }

    this.updateTable().then(Promise.all(recordIds.map( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(recordId) {
        var rowId;
        return _regenerator["default"].wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (_this7._isRecordLoaded(recordId)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                rowId = _this7._getRowID(recordId);
                _context8.prev = 3;
                _context8.next = 6;
                return _this7._checkWarnings(rowId);

              case 6:
                _context8.next = 12;
                break;

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](3);

                if (_context8.t0 instanceof _ThrottleError["default"]) {
                  _context8.next = 12;
                  break;
                }

                throw _context8.t0;

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, null, [[3, 8]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }())));
  }
};
var _default = GridDataMixin;
exports["default"] = _default;
module.exports = exports.default;