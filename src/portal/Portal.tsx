/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import omit from 'lodash/omit';
import React from 'react';
import ReactDOM from 'react-dom';

const PORTAL_CLASS_NAME = '__portal';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  onDocumentMouseDown?: (event: MouseEvent, isDocumentEventOwner: boolean) => void;
  onDocumentMouseScroll?: (event: Event, isDocumentEventOwner: boolean) => void;
};

class Portal extends React.Component<Props> {
  private portal: HTMLDivElement | null = null;

  componentDidMount(): void {
    document.addEventListener('mousedown', this.onDocumentMouseDown, false);
    document.addEventListener('scroll', this.onDocumentMouseScroll, true);

    const portal = document.createElement('div');
    document.body.appendChild(portal);
    portal.className = PORTAL_CLASS_NAME;
    this.portal = portal;
    this.renderPortal();
  }

  componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.onDocumentMouseDown, false);
    document.removeEventListener('scroll', this.onDocumentMouseScroll, true);

    if (this.portal) {
      ReactDOM.unmountComponentAtNode(this.portal);
      document.body.removeChild(this.portal);
    }
  }

  componentDidUpdate(): void {
    this.renderPortal();
  }

  renderPortal(): void {
    ReactDOM.render(
      <div {...omit(this.props, ['onDocumentMouseDown', 'onDocumentMouseScroll'])}>
        {this.props.children}
      </div>,
      this.portal
    );
  }

  render(): null {
    return null;
  }

  private isDocumentEventOwner(target: EventTarget | null): boolean {
    return Boolean(this.portal && (target === this.portal || this.portal.contains(target as Node)));
  }

  private onDocumentMouseDown = (event: MouseEvent): void => {
    if (this.props.onDocumentMouseDown) {
      this.props.onDocumentMouseDown(event, this.isDocumentEventOwner(event.target));
    }
  };

  private onDocumentMouseScroll = (event: Event): void => {
    if (this.props.onDocumentMouseScroll) {
      this.props.onDocumentMouseScroll(event, this.isDocumentEventOwner(event.target));
    }
  };
}

export default Portal;
