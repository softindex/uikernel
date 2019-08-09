/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { findIndex, isEqual, omit } from '../common/utils';
type SelectEditorProps = {
  options?: any[],
  model?: {
    read?: (...args: any[]) => any
  },
  disabled?: boolean,
  onChange: (...args: any[]) => any,
  onLabelChange?: (...args: any[]) => any,
  value?: any
};
type SelectEditorState = { options: any, loading: boolean } & ((
  err: any
) => void) & { options: any, loading: boolean };
class SelectEditor extends React.Component<
  SelectEditorProps,
  SelectEditorState
> {
  static defaultProps = {
    options: []
  };
  constructor(props: SelectEditorProps) {
    super(props);
    this.state = {
      options: props.options,
      loading: Boolean(props.model)
    };
  }
  componentDidMount() {
    if (this.props.model && this.props.model.read) {
      this.props.model
        .read('')
        .then((data: { unshift: (arg0: (string | null)[]) => void; }) => {
          data.unshift([null, '']);
          this.setState({
            options: data,
            loading: false
          });
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  }
  getOptions() {
    return this.props.model ? this.state.options : this.props.options;
  }
  handleChange(e: { target: { value: string | number; }; }) {
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
    const valueIndex = findIndex(options, option => {
      return isEqual(
        option instanceof Array ? option[0] : option,
        this.props.value
      );
    });
    return (
      <select
        {...omit(this.props, ['value', 'options'])}
        value={valueIndex}
        onChange={this.handleChange.bind(this)}
        disabled={this.props.disabled || this.state.loading}
      >
        {options.map((item: any, index: string | number) => {
          const optionProps =
            item instanceof Array && item[2] instanceof Object ? item[2] : {};
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
