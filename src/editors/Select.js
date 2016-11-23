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
var toPromise = require('../common/toPromise');

var SelectEditor = React.createClass({
  propTypes: {
    options: React.PropTypes.array,
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
      toPromise(this.props.model.read.bind(this.props.model))('')
      .then(function(data){
        data.unshift([null, '']);

        this.setState({
          options: data,
          loading: false
        });
      }.bind(this))
      .catch(function(err){
        throw err;
      });
    }
  },

  getOptions: function () {
    return this.props.model ? this.state.options : this.props.options;
  },

  handleChange: function (e) {
    var option = this.getOptions()[e.target.value];
    if (!(option instanceof Array)){
      option = [option, option];
    }
    this.props.onChange(option[0]);
    if (this.props.onLabelChange) {
      this.props.onLabelChange(option[1]);
    }
  },

  render: function () {
    var options = this.getOptions();
    var valueIndex = utils.findIndex(options, function (option) {
      return utils.isEqual(option instanceof Array ? option[0] : option, this.props.value);
    }.bind(this));

    return (
      <select
        {...utils.omit(this.props, 'value')}
        value={valueIndex}
        onChange={this.handleChange}
        disabled={this.props.disabled || this.state.loading}
      >
      {options.map(function (item, index) {
        return (
          <option key={index} value={index}>
            {item instanceof Array ? item[1] : item}
          </option>
        );
      }, this)}
      </select>
    );
  }
});

module.exports = SelectEditor;
