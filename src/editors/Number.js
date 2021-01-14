/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import floatValidator from '../common/validation/rules/float';
import {isEqual, omit} from '../common/utils';
import {findDOMNode} from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';

const isInvalidFloat = floatValidator(null, null, true);

class NumberEditor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      // String should be allowed, because when we start typing negative number,
      // there is appearing a warning in console after '-' symbol
      PropTypes.string
    ])
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(this.state.value, nextProps.value)) {
      findDOMNode(this.input).value = this.state.value = nextProps.value;
    }
  }

  _onChangeHandler(e) {
    const target = e.target;
    const valueAsNumber = parseFloat(target.value); // Edge doesn't support "target.valueAsNumber"
    if (target.value === '' && target.validity.valid) { // Invalid number set empty string and valid=false to event
      this.state.value = null;
    } else if (isInvalidFloat(valueAsNumber)) {
      this.state.value = '';
    } else {
      this.state.value = valueAsNumber;
    }

    this.props.onChange(this.state.value);
  }

  render() {
    return (
      <input
        step="any"
        {...omit(this.props, 'value')}
        type="number"
        ref={(input) => this.input = input}
        onChange={::this._onChangeHandler}
        defaultValue={this.props.value}
      />
    );
  }
}

export default NumberEditor;
