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
var findDOMNode = require('react-dom').findDOMNode;
var utils = require('../common/utils');
var floatValidator = require('../common/validation/validators/float');

var invalidFloat = floatValidator(null, null, true);

var NumberEditor = React.createClass({displayName: "NumberEditor",
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
      findDOMNode(this.refs.input).value = this.state.value = nextProps.value;
    }
  },
  _onChangeHandler: function (e) {
    var target = e.target;
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
  },
  render: function () {
    return (
      React.createElement("input", React.__spread({
        step: "any"}, 
        utils.omit(this.props, 'value'), 
        {type: "number", 
        ref: "input", 
        onChange: this._onChangeHandler, 
        defaultValue: this.props.value})
      )
    );
  }
});

module.exports = NumberEditor;
