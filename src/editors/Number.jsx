/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

var React = require('react');
var utils = require('../common/utils');
var floatValidator = require('../common/validation/validators/float');

var invalidFloat = floatValidator(null, null, true);

var NumberEditor = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.any
  },

  getInitialState: function () {
    return {
      value: this.props.value
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (!utils.isEqual(this.state.value, nextProps.value)) {
      this.state.value = nextProps.value;
      this._setValue(this.state.value);
    }
  },

  _setValue: function(value){
    this.refs.input.getDOMNode().value = value;
  },

  _onChangeHandler: function (e) {
    let target = e.target;
    /**
     * Firefox <v46.0.1 not supported dotted float value in number input
     * https://www.w3.org/TR/html-markup/input.number.html
     */
    if (target.validity.valid || !invalidFloat(target.valueAsNumber)) {
      this.state.value = Number.isNaN(target.valueAsNumber) /* Empty input */ ? null : target.valueAsNumber;
      this.props.onChange(this.state.value);
    }

    this._setValue(this.state.value);
  },

  render: function () {
    return (
      <input
        step="any"
        {...utils.omit(this.props, 'value')}
        type="number"
        ref="input"
        onChange={this._onChangeHandler}
        defaultValue={this.state.value}
      />
    );
  }
});

module.exports = NumberEditor;
