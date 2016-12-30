/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {findDOMNode} from 'react-dom';
import React from 'react';

class Checkbox extends React.Component {
  static propTypes = {
    indeterminate: React.PropTypes.bool
  };

  componentDidMount() {
    this._setIndeterminate(this.props.indeterminate);
  }
  componentWillReceiveProps(props) {
    this._setIndeterminate(props.indeterminate);
  }
  _setIndeterminate(value) {
    findDOMNode(this.refs.checkbox).indeterminate = value;
  }
  render() {
    return (
      <input
        {...this.props}
        type='checkbox'
        ref='checkbox'
      />
    );
  }
}

export default Checkbox;
