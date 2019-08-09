/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { omit } from './utils';
const portalClass = '__portal';
type PortalProps = {
  onDocumentMouseDown?: (...args: any[]) => any,
  onDocumentMouseScroll?: (...args: any[]) => any
};
class Portal extends React.Component<PortalProps, {}> {
  private portal: any;
  constructor(props: Readonly<PortalProps>) {
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
    this.renderPortal();
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    document.removeEventListener('scroll', this._onDocumentMouseScroll, true);
    ReactDOM.unmountComponentAtNode(this.portal);
    document.body.removeChild(this.portal);
  }
  componentDidUpdate() {
    this.renderPortal();
  }
  _isDocumentEventOwner(target: EventTarget | null) {
    return target === this.portal || this.portal.contains(target);
  }
  _onDocumentMouseDown(e: Event) {
    if (this.props.onDocumentMouseDown) {
      this.props.onDocumentMouseDown(e, this._isDocumentEventOwner(e.target));
    }
  }
  _onDocumentMouseScroll(e: Event) {
    if (this.props.onDocumentMouseScroll) {
      this.props.onDocumentMouseScroll(e, this._isDocumentEventOwner(e.target));
    }
  }
  renderPortal() {
    ReactDOM.render(
      <div
        {...omit(this.props, ['onDocumentMouseDown', 'onDocumentMouseScroll'])}
      >
        {this.props.children}
      </div>,
      this.portal
    );
  }
  render() {
    return null;
  }
}
export default Portal;
