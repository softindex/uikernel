"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _FormService = _interopRequireDefault(require("./FormService"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function connectForm() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return function (Component) {
    return (
      /*#__PURE__*/
      function (_React$Component) {
        (0, _inherits2.default)(ComponentWithFormService, _React$Component);

        function ComponentWithFormService() {
          var _this;

          (0, _classCallCheck2.default)(this, ComponentWithFormService);
          _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ComponentWithFormService).call(this));
          _this.form = new _FormService.default(fields);
          _this.state = _this.form.getAll();
          _this.onFormChange = _this.onFormChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
          return _this;
        }

        (0, _createClass2.default)(ComponentWithFormService, [{
          key: "componentDidMount",
          value: function () {
            var _componentDidMount = (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee() {
              var state;
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      state = this.form.getAll();

                      if (state.isLoaded) {
                        this.setState(state);
                      }

                      this.form.addChangeListener(this.onFormChange);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            return function componentDidMount() {
              return _componentDidMount.apply(this, arguments);
            };
          }()
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            this.form.removeChangeListener(this.onFormChange);
          }
        }, {
          key: "onFormChange",
          value: function onFormChange(newFormState) {
            this.setState(newFormState);
          }
        }, {
          key: "render",
          value: function render() {
            return _react.default.createElement(Component, (0, _extends2.default)({}, this.props, {
              formData: this.state,
              formService: this.form
            }));
          }
        }]);
        return ComponentWithFormService;
      }(_react.default.Component)
    );
  };
}

var _default = connectForm;
exports.default = _default;
module.exports = exports.default;