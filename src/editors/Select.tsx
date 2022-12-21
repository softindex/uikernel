/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {findIndex, isEqual, omit} from '../common/utils';

type Props = {
  disabled: boolean; // shape: [[value, label, props], ...] or [label1, label2, ...]
  //                           `props` will be passed to each corresponding <option />
  model: {
    read: (...args: any[]) => any;
  };
  options: any[];
  value: any;
  onChange: (...args: any[]) => any;
  onLabelChange: (...args: any[]) => any;
};

class SelectEditor extends React.Component {
  static defaultProps = {
    options: []
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      options: props.options,
      loading: Boolean(props.model)
    };
  }

  componentDidMount() {
    if (this.props.model) {
      this.props.model
        .read('')
        .then((data) => {
          data.unshift([null, '']);

          this.setState({
            options: data,
            loading: false
          });
        })
        .catch((err) => {
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
    const valueIndex = findIndex(options, (option) => {
      return isEqual(option instanceof Array ? option[0] : option, this.props.value);
    });

    return (
      <select
        {...omit(this.props, ['value', 'options'])}
        value={valueIndex}
        onChange={this.handleChange.bind(this)}
        disabled={this.props.disabled || this.state.loading}
      >
        {options.map((item, index) => {
          const optionProps = item instanceof Array && item[2] instanceof Object ? item[2] : {};
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
