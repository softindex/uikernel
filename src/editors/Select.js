/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

import toPromise from '../common/toPromise';
import React from 'react';
import utils from '../common/utils';

export const SelectEditor = React.createClass({
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
  getDefaultProps: () => ({
    options: []
  }),
  getInitialState: function () {
    return {
      options: this.props.options,
      loading: Boolean(this.props.model)
    };
  },
  componentDidMount: function () {
    if (this.props.model) {
      toPromise(this.props.model.read.bind(this.props.model))('')
        .then(data => {
          data.unshift([null, '']);

          this.setState({
            options: data,
            loading: false
          });
        })
        .catch(err => {
          throw err;
        });
    }
  },

  getOptions: function () {
    return this.props.model ? this.state.options : this.props.options;
  },

  handleChange: function (e) {
    let option = this.getOptions()[e.target.value];
    if (!(option instanceof Array)) {
      option = [option, option];
    }
    this.props.onChange(option[0]);
    if (this.props.onLabelChange) {
      this.props.onLabelChange(option[1]);
    }
  },

  render: function () {
    const options = this.getOptions();
    const valueIndex = utils.findIndex(options, option => {
      return utils.isEqual(option instanceof Array ? option[0] : option, this.props.value);
    });

    return (
      <select
        {...utils.omit(this.props, 'value')}
        value={valueIndex}
        onChange={this.handleChange}
        disabled={this.props.disabled || this.state.loading}
      >
        {options.map((item, index) => (
          <option key={index} value={index}>
            {item instanceof Array ? item[1] : item}
          </option>
        ), this)}
      </select>
    );
  }
});

module.exports = SelectEditor;
