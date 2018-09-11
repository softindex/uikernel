'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Events2 = require('../../common/Events');

var _Events3 = _interopRequireDefault(_Events2);

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

var GridToFormCreate = function (_Events) {
  (0, _inherits3.default)(GridToFormCreate, _Events);

  /**
   * Adapter allows to use Grid model as a model for new form record creation
   *
   * @param {AbstractGridModel}   model           Grid model
   * @param {Object}              [initialData]   Default field values
   * @constructor
   */
  function GridToFormCreate(model, initialData) {
    (0, _classCallCheck3.default)(this, GridToFormCreate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GridToFormCreate.__proto__ || (0, _getPrototypeOf2.default)(GridToFormCreate)).call(this));

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


  (0, _createClass3.default)(GridToFormCreate, [{
    key: 'getData',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fields) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(fields && fields.length)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', _utils2.default.pick(this._adapter.initialData, fields));

              case 2:
                return _context.abrupt('return', this._adapter.initialData);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData(_x) {
        return _ref.apply(this, arguments);
      }

      return getData;
    }()

    /**
     * Create new record
     *
     * @param   {Object}      data      Record
     */

  }, {
    key: 'submit',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
        var model;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                model = this._adapter.model;
                _context2.next = 3;
                return model.create(data);

              case 3:
                return _context2.abrupt('return', _context2.sent);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function submit(_x2) {
        return _ref2.apply(this, arguments);
      }

      return submit;
    }()

    /**
     * Validation checking
     *
     * @param {Object}      record  Record object
     */

  }, {
    key: 'isValidRecord',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(record) {
        var model;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                model = this._adapter.model;
                _context3.next = 3;
                return model.isValidRecord(record);

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function isValidRecord(_x3) {
        return _ref3.apply(this, arguments);
      }

      return isValidRecord;
    }()

    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields
     * @returns {Array}  Dependencies
     */

  }, {
    key: 'getValidationDependency',
    value: function getValidationDependency(fields) {
      return this._adapter.model.getValidationDependency(fields);
    }
  }]);
  return GridToFormCreate;
}(_Events3.default);

exports.default = GridToFormCreate;
module.exports = exports['default'];