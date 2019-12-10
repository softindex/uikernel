"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Validator = _interopRequireDefault(require("../common/validation/Validator"));

var _AbstractFormModel2 = _interopRequireDefault(require("./AbstractFormModel"));

var _utils = require("../common/utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var FormModel =
/*#__PURE__*/
function (_AbstractFormModel) {
  (0, _inherits2["default"])(FormModel, _AbstractFormModel);

  /**
   * Simple form model
   *
   * @param {Object}    defaultValues Default form field values
   * @param {Validator} validation    Validation
   * @constructor
   */
  function FormModel(defaultValues, validation) {
    var _this;

    (0, _classCallCheck2["default"])(this, FormModel);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FormModel).call(this));
    _this._validation = validation || new _Validator["default"]();
    _this._data = defaultValues ? (0, _utils.clone)(defaultValues) : {};
    return _this;
  }
  /**
   * Get data
   *
   * @param {Array}    fields     Required fields
   */


  (0, _createClass2["default"])(FormModel, [{
    key: "getData",
    value: function getData(fields) {
      var record, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, field;

      return _regenerator["default"].async(function getData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              record = {};

              if (!fields) {
                _context.next = 23;
                break;
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;

              for (_iterator = fields[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                field = _step.value;
                record[field] = this._data[field];
              }

              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 13:
              _context.prev = 13;
              _context.prev = 14;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 16:
              _context.prev = 16;

              if (!_didIteratorError) {
                _context.next = 19;
                break;
              }

              throw _iteratorError;

            case 19:
              return _context.finish(16);

            case 20:
              return _context.finish(13);

            case 21:
              _context.next = 24;
              break;

            case 23:
              record = (0, _utils.clone)(this._data);

            case 24:
              return _context.abrupt("return", record);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[5, 9, 13, 21], [14,, 16, 20]]);
    }
    /**
     * Process form data
     *
     * @param {Object}      changes     Form data
     */

  }, {
    key: "submit",
    value: function submit(changes) {
      var validErrors;
      return _regenerator["default"].async(function submit$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator["default"].awrap(this.isValidRecord(changes));

            case 2:
              validErrors = _context2.sent;

              if (validErrors.isEmpty()) {
                _context2.next = 5;
                break;
              }

              throw validErrors;

            case 5:
              Object.assign(this._data, changes);
              this.trigger('update', changes);
              return _context2.abrupt("return", changes);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /**
     * Validation check
     *
     * @param {Object}      record
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord(record) {
      return _regenerator["default"].async(function isValidRecord$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator["default"].awrap(this._validation.isValidRecord(record));

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
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
      return this._validation.getValidationDependency(fields);
    }
  }]);
  return FormModel;
}(_AbstractFormModel2["default"]);

var _default = FormModel;
exports["default"] = _default;
module.exports = exports.default;