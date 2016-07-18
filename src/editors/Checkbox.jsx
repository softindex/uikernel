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

var Checkbox = React.createClass({
  propTypes: {
    indeterminate: React.PropTypes.bool
  },

  componentDidMount: function () {
    this._setIndeterminate(this.props.indeterminate);
  },
  componentWillReceiveProps: function (props) {
    this._setIndeterminate(props.indeterminate);
  },
  _setIndeterminate: function (value) {
    findDOMNode(this.refs.checkbox).indeterminate = value;
  },
  render: function () {
    return (
      <input
        {...this.props}
        type='checkbox'
        ref='checkbox'
      />
    );
  }
});

module.exports = Checkbox;
