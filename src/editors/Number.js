/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import floatValidator from '../common/validation/validators/float';
import utils from '../common/utils';
import {findDOMNode} from 'react-dom';
import React from 'react';

const invalidFloat = floatValidator(null, null, true);

class NumberEditor extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.any
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
    if (target.validity.valid || !invalidFloat(target.valueAsNumber)) {
      if (isNaN(target.valueAsNumber)) { // Empty input
        this.state.value = null;
      } else {
        this.state.value = target.valueAsNumber;
      }
    } else {
      this.state.value = NaN;
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
