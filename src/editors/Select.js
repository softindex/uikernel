/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import utils from '../common/utils';

class SelectEditor extends React.Component {
  static propTypes = {
    options: PropTypes.array, // shape: [[value, label, props], ...] or [label1, label2, ...]
    //                           `props` will be passed to each corresponding <option />
    model: PropTypes.shape({
      read: PropTypes.func
    }),
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onLabelChange: PropTypes.func,
    value: PropTypes.any
  };

  static defaultProps = {
    options: []
  };

  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      loading: Boolean(props.model)
    };
  }

  componentDidMount() {
    if (this.props.model) {
      this.props.model.read('')
        .then(data => {
          data.unshift([null, '']);

          this.setState({
            options: data,
            loading: false
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  getOptions() {
    return this.props.model ? this.state.options : this.props.options;
  }

  handleChange(e) {
    let option = this.getOptions()[e.target.value];
    if (!(option instanceof Array)) {
      option = [option, option];
    }
    this.props.onChange(option[0]);
    if (this.props.onLabelChange) {
      this.props.onLabelChange(option[1]);
    }
  }

  render() {
    const options = this.getOptions();
    const valueIndex = utils.findIndex(options, option => {
      return utils.isEqual(option instanceof Array ? option[0] : option, this.props.value);
    });

    return (
      <select
        {...utils.omit(this.props, ['value', 'options'])}
        value={valueIndex}
        onChange={this::this.handleChange}
        disabled={this.props.disabled || this.state.loading}
      >
        {options.map((item, index) => {
          const optionProps = ((item instanceof Array) && (item[2] instanceof Object)) ? item[2] : {};
          return (
            <option key={index} value={index} {...optionProps}>
              {item instanceof Array ? item[1] : item}
            </option>
          );
        })}
      </select>
    );
  }
}

export default SelectEditor;
