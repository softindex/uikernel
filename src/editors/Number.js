/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import floatValidator from '../common/validation/rules/float';
import integerValidator from '../common/validation/rules/number';
import utils from '../common/utils';
import {findDOMNode} from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';

class NumberEditor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.number,
      // String should be allowed, because when we start typing negative number,
      // there is appearing a warning in console after '-' symbol
      PropTypes.string
    ]),
    // if true - inputted value will be parsed as float, else it will be parsed as integer removing fractional part
    enableFractionalPart: PropTypes.bool
  };

  static defaultProps = {
    enableFractionalPart: true
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    // Edge doesn't support "target.valueAsNumber"
    this._numberParser = this.props.enableFractionalPart ? Number.parseFloat : Number.parseInt;
    this._isInvalidNumber = (this.props.enableFractionalPart ? floatValidator : integerValidator)(null, null, true);
  }

  componentWillReceiveProps(nextProps) {
    if (!utils.isEqual(this.state.value, nextProps.value)) {
      findDOMNode(this.input).value = this.state.value = nextProps.value;
    }
  }

  _onBlurHandler = (e) => {
    const input = findDOMNode(this.input);
    if (!utils.isEqual(this.state.value, input.value)) {
      input.value = this.state.value;
    }
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  _onChangeHandler = (e) => {
    const target = e.target;
    const valueAsNumber = this._numberParser(target.value) ;
    if (target.value === '' && target.validity.valid) { // Invalid number set empty string and valid=false to event
      this.state.value = null;
    } else if (this._isInvalidNumber(valueAsNumber)) {
      this.state.value = '';
    } else {
      this.state.value = valueAsNumber;
    }

    this.props.onChange(this.state.value);
  };

  render() {
    return (
      <input
        step="any"
        {...utils.omit(this.props, ['value', 'enableFractionalPart'])}
        type="number"
        ref={(input) => this.input = input}
        onChange={this._onChangeHandler}
        onBlur={this._onBlurHandler}
        defaultValue={this.props.value}
      />
    );
  }
}

export default NumberEditor;
