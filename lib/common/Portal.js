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

var ChildrenWrapper = function (_React$Component) {
  (0, _inherits3.default)(ChildrenWrapper, _React$Component);

  function ChildrenWrapper(props) {
    (0, _classCallCheck3.default)(this, ChildrenWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChildrenWrapper.__proto__ || (0, _getPrototypeOf2.default)(ChildrenWrapper)).call(this, props));

    _this.state = {
      children: props.children
    };
    return _this;
  }

  (0, _createClass3.default)(ChildrenWrapper, [{
    key: 'setChildren',
    value: function setChildren(children) {
      this.setState({ children: children });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        this.props,
        this.state.children
      );
    }
  }]);
  return ChildrenWrapper;
}(_react2.default.Component);

var portalClass = '__portal';

var Portal = function (_React$Component2) {
  (0, _inherits3.default)(Portal, _React$Component2);

  function Portal(props) {
    (0, _classCallCheck3.default)(this, Portal);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Portal.__proto__ || (0, _getPrototypeOf2.default)(Portal)).call(this, props));

    _this2._onDocumentMouseDown = _this2._onDocumentMouseDown.bind(_this2);
    _this2._onDocumentMouseScroll = _this2._onDocumentMouseScroll.bind(_this2);
    return _this2;
  }

  (0, _createClass3.default)(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      document.addEventListener('mousedown', this._onDocumentMouseDown, false);
      document.addEventListener('scroll', this._onDocumentMouseScroll, true);

      var portal = document.createElement('div');
      document.body.appendChild(portal);
      portal.className = portalClass;
      this.portal = portal;
      _reactDom2.default.render(_react2.default.createElement(
        ChildrenWrapper,
        (0, _extends3.default)({}, (0, _utils.omit)(this.props, ['onDocumentMouseDown', 'onDocumentMouseScroll', 'styles']), {
          style: this.props.styles,
          ref: function ref(wrapper) {
            _this3.wrapper = wrapper;
          }
        }),
        this.props.children
      ), this.portal);
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
      this.wrapper.setChildren(this.props.children);
    }
  }, {
    key: '_isDocumentEventOwner',
    value: function _isDocumentEventOwner(target) {
      return $(target).parents('.' + portalClass).get(0) === this.portal;
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
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Portal;
}(_react2.default.Component);

ChildrenWrapper.propTypes = {
  children: _propTypes2.default.node
};

Portal.propTypes = {
  children: _propTypes2.default.node,
  id: _propTypes2.default.string,
  styles: _propTypes2.default.object,
  onDocumentMouseDown: _propTypes2.default.func,
  onDocumentMouseScroll: _propTypes2.default.func
};

exports.default = Portal;
module.exports = exports['default'];