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

var _Events2 = _interopRequireDefault(require("../../common/Events"));

var _utils = require("../../common/utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var GridToFormCreate =
/*#__PURE__*/
function (_Events) {
  (0, _inherits2["default"])(GridToFormCreate, _Events);

  /**
   * Adapter allows to use Grid model as a model for new form record creation
   *
   * @param {AbstractGridModel}   model           Grid model
   * @param {Object}              [initialData]   Default field values
   * @constructor
   */
  function GridToFormCreate(model, initialData) {
    var _this;

    (0, _classCallCheck2["default"])(this, GridToFormCreate);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(GridToFormCreate).call(this));
    _this._adapter = {
      model: model,
      initialData: initialData || {}
    };
    return _this;
  }
  /**
   * Get data
   *
   * @param {Array}     fields     Required fields
   */


  (0, _createClass2["default"])(GridToFormCreate, [{
    key: "getData",
    value: function getData(fields) {
      return _regenerator["default"].async(function getData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(fields && fields.length)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", (0, _utils.pick)(this._adapter.initialData, fields));

            case 2:
              return _context.abrupt("return", this._adapter.initialData);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
    /**
     * Create new record
     *
     * @param   {Object}      data      Record
     */

  }, {
    key: "submit",
    value: function submit(data) {
      var model;
      return _regenerator["default"].async(function submit$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              model = this._adapter.model;
              _context2.next = 3;
              return _regenerator["default"].awrap(model.create(data));

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /**
     * Validation checking
     *
     * @param {Object}      record  Record object
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord(record) {
      var model;
      return _regenerator["default"].async(function isValidRecord$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              model = this._adapter.model;
              _context3.next = 3;
              return _regenerator["default"].awrap(model.isValidRecord(record, null));

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields
     * @returns {Array}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._adapter.model.getValidationDependency(fields);
    }
  }]);
  return GridToFormCreate;
}(_Events2["default"]);

var _default = GridToFormCreate;
exports["default"] = _default;
module.exports = exports.default;