'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _toPromise = require('../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../common/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var SelectEditor = function (_React$Component) {
  (0, _inherits3.default)(SelectEditor, _React$Component);

  function SelectEditor(props) {
    (0, _classCallCheck3.default)(this, SelectEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectEditor.__proto__ || (0, _getPrototypeOf2.default)(SelectEditor)).call(this, props));

    _this.state = {
      options: props.options,
      loading: Boolean(props.model)
    };
    return _this;
  }

  (0, _createClass3.default)(SelectEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.model) {
        (0, _toPromise2.default)(this.props.model.read.bind(this.props.model))('').then(function (data) {
          data.unshift([null, '']);

          _this2.setState({
            options: data,
            loading: false
          });
        }).catch(function (err) {
          throw err;
        });
      }
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.props.model ? this.state.options : this.props.options;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var option = this.getOptions()[e.target.value];
      if (!(option instanceof Array)) {
        option = [option, option];
      }
      this.props.onChange(option[0]);
      if (this.props.onLabelChange) {
        this.props.onLabelChange(option[1]);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var options = this.getOptions();
      var valueIndex = _utils2.default.findIndex(options, function (option) {
        return _utils2.default.isEqual(option instanceof Array ? option[0] : option, _this3.props.value);
      });

      return _react2.default.createElement(
        'select',
        (0, _extends3.default)({}, _utils2.default.omit(this.props, ['value', 'options']), {
          value: valueIndex,
          onChange: this.handleChange.bind(this),
          disabled: this.props.disabled || this.state.loading
        }),
        options.map(function (item, index) {
          return _react2.default.createElement(
            'option',
            { key: index, value: index },
            item instanceof Array ? item[1] : item
          );
        }, this)
      );
    }
  }]);
  return SelectEditor;
}(_react2.default.Component);

SelectEditor.propTypes = {
  options: _propTypes2.default.array,
  model: _propTypes2.default.shape({
    read: _propTypes2.default.func
  }),
  disabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired,
  onLabelChange: _propTypes2.default.func,
  value: _propTypes2.default.any
};
SelectEditor.defaultProps = {
  options: []
};
exports.default = SelectEditor;
module.exports = exports['default'];