/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { omit } from './utils';

export const ChildrenWrapper = createReactClass({
  getInitialState: function () {
    return {
      children: this.props.children
    };
  },

  setChildren: function (children) {
    this.setState({children: children});
  },

  render: function () {
    return (
      <div {...omit(this.props, ['onDocumentMouseDown', 'onDocumentMouseScroll'])}>{this.state.children}</div>
    );
  }
});

const portalClass = '__portal';

export const Portal = createReactClass({
  getInitialState: () => ({
    portal: null
  }),

  componentDidMount: function () {
    document.addEventListener('mousedown', this._onDocumentMouseDown, false);
    document.addEventListener('scroll', this._onDocumentMouseScroll, true);

    const portal = document.createElement('div');
    document.body.appendChild(portal);

    portal.className = portalClass;
    this.state.portal = portal;
    this.state.wrapper = ReactDOM.render(
      <ChildrenWrapper {...this.props}>{this.props.children}</ChildrenWrapper>
      , this.state.portal);
  },

  componentWillUnmount: function () {
    document.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    document.removeEventListener('scroll', this._onDocumentMouseScroll, true);

    ReactDOM.unmountComponentAtNode(this.state.portal);
    document.body.removeChild(this.state.portal);
  },

  componentDidUpdate: function () {
    this.state.wrapper.setChildren(this.props.children);
  },

  _isDocumentEventOwner: function (target) {
    return $(target).parents(`.${portalClass}`).get(0) === this.state.portal;
  },

  _onDocumentMouseDown: function (e) {
    if (this.props.onDocumentMouseDown) {
      this.props.onDocumentMouseDown(e, this._isDocumentEventOwner(e.target));
    }
  },

  _onDocumentMouseScroll: function (e) {
    if (this.props.onDocumentMouseScroll) {
      this.props.onDocumentMouseScroll(e, this._isDocumentEventOwner(e.target));
    }
  },

  render: () => null
});

ChildrenWrapper.propTypes = {
  children: PropTypes.node,
};

Portal.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  onDocumentMouseDown: PropTypes.func,
  onDocumentMouseScroll: PropTypes.func,
};

export default Portal;
