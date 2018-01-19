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

var _callbackify = require('../../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _toPromise = require('../../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _ValidationErrors = require('../../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _Events2 = require('../../common/Events');

var _Events3 = _interopRequireDefault(_Events2);

var _utils = require('../../common/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridToFormUpdate = function (_Events) {
  (0, _inherits3.default)(GridToFormUpdate, _Events);

  /**
   * Adapter that allows us to use Grid model record as a form model
   *
   * @param {AbstractGridModel} model   Grid model
   * @param {number|string}     id      Record ID
   * @constructor
   */
  function GridToFormUpdate(model, id) {
    (0, _classCallCheck3.default)(this, GridToFormUpdate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GridToFormUpdate.__proto__ || (0, _getPrototypeOf2.default)(GridToFormUpdate)).call(this));

    _this._adapter = {
      model: model,
      id: id
    };

    _this._onUpdateHandlers = [];
    return _this;
  }

  /**
   * Subscribe to inner model event
   *
   * @param {string}      event   Event ID
   * @param {Function}    cb      CallBack function
   */


  (0, _createClass3.default)(GridToFormUpdate, [{
    key: 'on',
    value: function on(event, cb) {
      var ctx = this;

      if (event !== 'update') {
        _Events3.default.prototype.on.call(this, event, cb);
        return;
      }

      // onChange filters out table events, that do not regard to our record
      function onChange(changes) {
        for (var i = 0; i < changes.length; i++) {
          if (_utils2.default.isEqual(changes[i][0], ctx._adapter.id)) {
            cb(changes[i][1]);
            return;
          }
        }
      }

      this._onUpdateHandlers.push({
        originalCallback: cb,
        wrappedCallback: onChange
      });

      this._adapter.model.on('update', onChange);
    }

    /**
     * Unsubscribe from inner model event
     *
     * @param {string}      event   Event ID
     * @param {Function}    cb      CallBack function
     */

  }, {
    key: 'off',
    value: function off(event, cb) {
      var ctx = this;
      var newOnUpdateHandlers = [];

      if (event !== 'update') {
        _Events3.default.prototype.off.call(this, event, cb);
        return;
      }

      this._onUpdateHandlers.forEach(function (handler) {
        if (handler.originalCallback === cb) {
          ctx._adapter.model.off('update', handler.wrappedCallback);
        } else {
          newOnUpdateHandlers.push(handler);
        }
      });

      this._onUpdateHandlers = newOnUpdateHandlers;
    }
  }, {
    key: 'listenerCount',
    value: function listenerCount(event) {
      return this._adapter.model.listenerCount(event);
    }

    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields  Fields list
     * @returns {Array}  Dependencies
     */

  }, {
    key: 'getValidationDependency',
    value: function getValidationDependency(fields) {
      return this._adapter.model.getValidationDependency(fields);
    }
  }]);
  return GridToFormUpdate;
}(_Events3.default);

/**
 * Get data
 *
 * @param {Array}     fields     Required fields
 * @param {Function}  cb         CallBack function
 */
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

GridToFormUpdate.prototype.getData = (0, _callbackify2.default)(function (fields) {
  var model = this._adapter.model;
  return (0, _toPromise2.default)(model.getRecord.bind(model))(this._adapter.id, fields);
});

/**
 * Apply changes
 *
 * @param   {Object}      changes     Form data
 * @param   {Function}    cb          CallBack function
 */
GridToFormUpdate.prototype.submit = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(changes) {
    var record, model, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            record = _utils2.default.clone(changes);
            model = this._adapter.model;
            _context.next = 4;
            return (0, _toPromise2.default)(model.update.bind(model))([[this._adapter.id, record]]);

          case 4:
            result = _context.sent;

            result = result[0][1];

            if (!(result instanceof _ValidationErrors2.default)) {
              _context.next = 8;
              break;
            }

            throw result;

          case 8:
            return _context.abrupt('return', result);

          case 9:
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

/**
 * Record validity check
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 */
GridToFormUpdate.prototype.isValidRecord = (0, _callbackify2.default)(function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(record) {
    var model;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            model = this._adapter.model;
            _context2.next = 3;
            return (0, _toPromise2.default)(model.isValidRecord.bind(model))(record);

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = GridToFormUpdate;
module.exports = exports['default'];