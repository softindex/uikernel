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
exports.Portal = exports.ChildrenWrapper = undefined;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ChildrenWrapper = exports.ChildrenWrapper = _react2.default.createClass({
  displayName: 'ChildrenWrapper',

  propTypes: {
    children: _react2.default.PropTypes.node
  },

  getInitialState: function getInitialState() {
    return {
      children: this.props.children
    };
  },

  setChildren: function setChildren(children) {
    this.setState({ children: children });
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      this.props,
      this.state.children
    );
  }
});

var portalClass = '__portal';

var Portal = exports.Portal = _react2.default.createClass({
  displayName: 'Portal',

  propTypes: {
    children: _react2.default.PropTypes.node,
    id: _react2.default.PropTypes.string,
    onDocumentMouseDown: _react2.default.PropTypes.func,
    onDocumentMouseScroll: _react2.default.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      portal: null
    };
  },

  componentDidMount: function componentDidMount() {
    document.addEventListener('mousedown', this._onDocumentMouseDown, false);
    document.addEventListener('scroll', this._onDocumentMouseScroll, true);

    var portal = document.createElement('div');
    document.body.appendChild(portal);

    portal.className = portalClass;
    this.state.portal = portal;
    this.state.wrapper = _reactDom2.default.render(_react2.default.createElement(
      ChildrenWrapper,
      this.props,
      this.props.children
    ), this.state.portal);
  },

  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    document.removeEventListener('scroll', this._onDocumentMouseScroll, true);

    _reactDom2.default.unmountComponentAtNode(this.state.portal);
    document.body.removeChild(this.state.portal);
  },

  componentDidUpdate: function componentDidUpdate() {
    this.state.wrapper.setChildren(this.props.children);
  },

  _isDocumentEventOwner: function _isDocumentEventOwner(target) {
    return $(target).parents('.' + portalClass).get(0) === this.state.portal;
  },

  _onDocumentMouseDown: function _onDocumentMouseDown(e) {
    if (this.props.onDocumentMouseDown) {
      this.props.onDocumentMouseDown(e, this._isDocumentEventOwner(e.target));
    }
  },

  _onDocumentMouseScroll: function _onDocumentMouseScroll(e) {
    if (this.props.onDocumentMouseScroll) {
      this.props.onDocumentMouseScroll(e, this._isDocumentEventOwner(e.target));
    }
  },

  render: function render() {
    return null;
  }
});

exports.default = Portal;