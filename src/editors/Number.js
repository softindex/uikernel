/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../common/utils';
import {findDOMNode} from 'react-dom';
import React from 'react';

class NumberEditor extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!utils.isEqual(this.state.value, nextProps.value)) {
      findDOMNode(this.refs.input).value = this.state.value = nextProps.value;
    }
  }

  _onChangeHandler(e) {
    const target = e.target;
    const valueAsNumber = parseFloat(target.value);

    if (!target.validity.valid) {
      this.state.value = target.value;
    } else if (target.value === '') {
      this.state.value = null;
    } else {
      this.state.value = valueAsNumber;
    }

    this.props.onChange(this.state.value);
  }

  render() {
    return (
      <input
        step="any"
        {...utils.omit(this.props, 'value')}
        type="number"
        ref="input"
        onChange={this::this._onChangeHandler}
        defaultValue={this.props.value}
      />
    );
  }
}

export default NumberEditor;
