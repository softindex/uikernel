"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Validator = _interopRequireDefault(require("../../common/validation/Validator"));

var _AbstractGridModel2 = _interopRequireDefault(require("./AbstractGridModel"));

var _utils = require("../../common/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GridCollectionModel = /*#__PURE__*/function (_AbstractGridModel) {
  (0, _inherits2["default"])(GridCollectionModel, _AbstractGridModel);

  var _super = _createSuper(GridCollectionModel);

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
    _this = _super.call(this);
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

      var _iterator = _createForOfIteratorHelper(data),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
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
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var deletedRecordsIds = (0, _utils.without)(Object.keys(currentData), recordIds).map(JSON.parse);
      this._data = (0, _utils.cloneDeep)(data);

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
  }, {
    key: "getData",
    value: function getData() {
      return this._data;
    }
    /**
     * Remove field by record id from data
     *
     * @param   {Number[]}  recordIds   record id for remove
     * @returns {Number}    recordId    return id of deleted record
     */

  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(recordIds) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._data = this._data.filter(function (record) {
                  return !recordIds.find(function (recordId) {
                    return (0, _utils.isEqual)(recordId, record[0]);
                  });
                });
                this.trigger('delete', recordIds);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _delete(_x) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
    /**
     * Add a record to local collection
     *
     * @param {Object}      record  Record object
     */

  }, {
    key: "create",
    value: function () {
      var _create2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(record) {
        var id, clonedRecord, _iterator2, _step2, field, validationErrors;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = this._getID();
                clonedRecord = (0, _utils.clone)(record); // Create record with definite id

                if (Array.isArray(clonedRecord) && clonedRecord.length === 2) {
                  id = clonedRecord[0];
                  clonedRecord = clonedRecord[1];
                }

                _iterator2 = _createForOfIteratorHelper(this._requiredFields);

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    field = _step2.value;

                    if (!clonedRecord.hasOwnProperty(field)) {
                      clonedRecord[field] = null;
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
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

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x2) {
        return _create2.apply(this, arguments);
      }

      return create;
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
      var data = (0, _utils.cloneDeep)(this._data);
      var result = {}; // Get extra records

      if (settings.extra && settings.extra.length > 0) {
        result.extraRecords = data.filter(function (record) {
          var _iterator3 = _createForOfIteratorHelper(settings.extra),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var recordId = _step3.value;

              if ((0, _utils.isEqual)(recordId, record[0])) {
                return true;
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
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
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(changes) {
        var _this2 = this;

        var appliedChanges, result, _iterator4, _step4, _loop;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
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
                return Promise.all(changes.map( /*#__PURE__*/function () {
                  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
                    var _ref5, recordId, changes, validErrors;

                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _ref5 = (0, _slicedToArray2["default"])(_ref3, 2), recordId = _ref5[0], changes = _ref5[1];
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
                    }, _callee3);
                  }));

                  return function (_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 5:
                result = _context4.sent;

                if (appliedChanges.length) {
                  // Apply changes
                  _iterator4 = _createForOfIteratorHelper(appliedChanges);

                  try {
                    _loop = function _loop() {
                      var _step4$value = (0, _slicedToArray2["default"])(_step4.value, 2),
                          recordId = _step4$value[0],
                          changes = _step4$value[1];

                      _this2._data = _this2._data.map(function (_ref6) {
                        var _ref7 = (0, _slicedToArray2["default"])(_ref6, 2),
                            dataRecordId = _ref7[0],
                            dataRecord = _ref7[1];

                        if (!(0, _utils.isEqual)(dataRecordId, recordId)) {
                          return [dataRecordId, dataRecord];
                        }

                        return [dataRecordId, _objectSpread(_objectSpread({}, dataRecord), changes)];
                      });
                    };

                    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                      _loop();
                    }
                  } catch (err) {
                    _iterator4.e(err);
                  } finally {
                    _iterator4.f();
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

      function update(_x3) {
        return _update.apply(this, arguments);
      }

      return update;
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
      return (0, _utils.find)(this._data, function (record) {
        return (0, _utils.isEqual)(record[0], id);
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