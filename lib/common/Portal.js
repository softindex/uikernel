'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var portalClass = '__portal';

var Portal = function (_React$Component) {
  (0, _inherits3.default)(Portal, _React$Component);

  function Portal(props) {
    (0, _classCallCheck3.default)(this, Portal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Portal.__proto__ || (0, _getPrototypeOf2.default)(Portal)).call(this, props));

    _this._onDocumentMouseDown = _this._onDocumentMouseDown.bind(_this);
    _this._onDocumentMouseScroll = _this._onDocumentMouseScroll.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('mousedown', this._onDocumentMouseDown, false);
      document.addEventListener('scroll', this._onDocumentMouseScroll, true);

      var portal = document.createElement('div');
      document.body.appendChild(portal);
      portal.className = portalClass;
      this.portal = portal;
      this.renderPortal();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this._onDocumentMouseDown, false);
      document.removeEventListener('scroll', this._onDocumentMouseScroll, true);

      _reactDom2.default.unmountComponentAtNode(this.portal);
      document.body.removeChild(this.portal);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderPortal();
    }
  }, {
    key: '_isDocumentEventOwner',
    value: function _isDocumentEventOwner(target) {
      return target === this.portal || this.portal.contains(target);
    }
  }, {
    key: '_onDocumentMouseDown',
    value: function _onDocumentMouseDown(e) {
      if (this.props.onDocumentMouseDown) {
        this.props.onDocumentMouseDown(e, this._isDocumentEventOwner(e.target));
      }
    }
  }, {
    key: '_onDocumentMouseScroll',
    value: function _onDocumentMouseScroll(e) {
      if (this.props.onDocumentMouseScroll) {
        this.props.onDocumentMouseScroll(e, this._isDocumentEventOwner(e.target));
      }
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal() {
      _reactDom2.default.render(_react2.default.createElement(
        'div',
        (0, _utils.omit)(this.props, ['onDocumentMouseDown', 'onDocumentMouseScroll']),
        this.props.children
      ), this.portal);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Portal;
}(_react2.default.Component);

Portal.propTypes = {
  children: _propTypes2.default.node,
  onDocumentMouseDown: _propTypes2.default.func,
  onDocumentMouseScroll: _propTypes2.default.func
};

exports.default = Portal;
module.exports = exports['default'];