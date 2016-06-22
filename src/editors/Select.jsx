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

var utils = require('../common/utils');
var React = require('react');

var SelectEditor = React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(
      React.PropTypes.array
    ),
    model: React.PropTypes.shape({
      read: React.PropTypes.func
    }),
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    onLabelChange: React.PropTypes.func,
    value: React.PropTypes.any
  },
  getDefaultProps: function () {
    return {
      options: []
    };
  },
  getInitialState: function () {
    return {
      options: this.props.options,
      loading: Boolean(this.props.model)
    };
  },
  componentDidMount: function () {
    if (this.props.model) {
      this.props.model.read('', function (err, data) {
        if (err) {
          throw err;
        }

        data.unshift([null, '']);

        this.setState({
          options: data,
          loading: false
        });
      }.bind(this));
    }
  },

  handleChange: function (e) {
    var option = this.state.options[e.target.value];
    this.props.onChange(option[0]);
    if (this.props.onLabelChange) {
      this.props.onLabelChange(option[1]);
    }
  },

  render: function () {
    var valueIndex = utils.findIndex(this.state.options, function (option) {
      return utils.isEqual(option[0], this.props.value);
    }.bind(this));

    return (
      <select
        {...utils.omit(this.props, 'value')}
        value={valueIndex}
        onChange={this.handleChange}
        disabled={this.props.disabled || this.state.loading}
      >
      {this.state.options.map(function (item, index) {
        return (
          <option key={index} value={index}>
            {item[1]}
          </option>
        );
      }, this)}
      </select>
    );
  }
});

module.exports = SelectEditor;
