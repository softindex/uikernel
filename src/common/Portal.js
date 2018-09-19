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
import {omit} from './utils';

class ChildrenWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children
    };
  }

  setChildren(children) {
    this.setState({children: children});
  }

  render() {
    return this.state.children;
  }
}

const portalClass = '__portal';

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this._onDocumentMouseDown = this._onDocumentMouseDown.bind(this);
    this._onDocumentMouseScroll = this._onDocumentMouseScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._onDocumentMouseDown, false);
    document.addEventListener('scroll', this._onDocumentMouseScroll, true);

    const portal = document.createElement('div');
    document.body.appendChild(portal);
    portal.className = portalClass;
    this.portal = portal;
    ReactDOM.render(
      <ChildrenWrapper
        ref={wrapper => this.wrapper = wrapper}
      >
        <div{...this._getChildrenProps(this.props)}>
          {this.props.children}
        </div>
      </ChildrenWrapper>,
      this.portal
    );
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    document.removeEventListener('scroll', this._onDocumentMouseScroll, true);

    ReactDOM.unmountComponentAtNode(this.portal);
    document.body.removeChild(this.portal);
  }

  componentDidUpdate() {
    this.wrapper.setChildren(
      <div{...this._getChildrenProps(this.props)}>
        {this.props.children}
      </div>
    );
  }

  _getChildrenProps(props) {
    return {
      ...omit(props, ['onDocumentMouseDown', 'onDocumentMouseScroll', 'styles']),
      style: props.styles
    };
  }

  _isDocumentEventOwner(target) {
    return (target === this.portal || this.portal.contains(target));
  }

  _onDocumentMouseDown(e) {
    if (this.props.onDocumentMouseDown) {
      this.props.onDocumentMouseDown(e, this._isDocumentEventOwner(e.target));
    }
  }

  _onDocumentMouseScroll(e) {
    if (this.props.onDocumentMouseScroll) {
      this.props.onDocumentMouseScroll(e, this._isDocumentEventOwner(e.target));
    }
  }

  render() {
    return null;
  }
}

ChildrenWrapper.propTypes = {
  children: PropTypes.node,
};

Portal.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  styles: PropTypes.object,
  onDocumentMouseDown: PropTypes.func,
  onDocumentMouseScroll: PropTypes.func,
};

export default Portal;
