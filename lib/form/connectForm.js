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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormService = require('./FormService');

var _FormService2 = _interopRequireDefault(_FormService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function connectForm(fields) {
  return function (Component) {
    return function (_React$Component) {
      (0, _inherits3.default)(ComponentWithFormService, _React$Component);

      function ComponentWithFormService() {
        (0, _classCallCheck3.default)(this, ComponentWithFormService);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ComponentWithFormService.__proto__ || (0, _getPrototypeOf2.default)(ComponentWithFormService)).call(this));

        _this.form = new _FormService2.default(fields);
        _this.state = _this.form.getAll();
        return _this;
      }

      (0, _createClass3.default)(ComponentWithFormService, [{
        key: 'componentDidMount',
        value: function () {
          var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this.form.addChangeListener(this.onFormChange);

                  case 1:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function componentDidMount() {
            return _ref.apply(this, arguments);
          }

          return componentDidMount;
        }()
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.form.removeChangeListener(this.onFormChange);
        }
      }, {
        key: 'onFormChange',
        value: function onFormChange(newFormState) {
          this.setState(newFormState);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(Component, (0, _extends3.default)({}, this.props, { formData: this.state, formService: this.form }));
        }
      }]);
      return ComponentWithFormService;
    }(_react2.default.Component);
  };
}

exports.default = connectForm;
module.exports = exports['default'];