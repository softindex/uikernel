/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import omit from 'lodash/omit';
import React from 'react';
import {StrictOmit} from 'ts-essentials';
import {isEqual} from '../common/utils';

type AdvencedOptions<TValue> = [
  Exclude<TValue, null>,
  string,
  StrictOmit<React.OptionHTMLAttributes<HTMLOptionElement>, 'value'>?
][];

type AvailevleOptions<TValue> = Exclude<TValue, string | null> extends never
  ? AdvencedOptions<TValue> | string[]
  : AdvencedOptions<TValue>;

type State<TValue, TOptions extends AvailevleOptions<TValue>> = {
  loading: boolean;
  options: TOptions | [[null, ''], ...TOptions];
};

type Props<TValue, TOptions extends AvailevleOptions<TValue>> = {
  disabled: boolean;
  model?: {
    read: (search: string) => Promise<TOptions>;
  };
  /**
   * shape: [[value, label, props], ...] or [label1, label2, ...]
   * `props` will be passed to each corresponding <option />
   */
  options: State<TValue, TOptions>['options'];
  value: TValue | null;
  onChange: (value: TValue | null) => void;
  onLabelChange?: (value: string) => void;
};

const DEFAULT_PROPS = {
  options: []
} as const;

class SelectEditor<TValue, TOptions extends AvailevleOptions<TValue>> extends React.Component<
  Props<TValue, TOptions>,
  State<TValue, TOptions>
> {
  static defaultProps = DEFAULT_PROPS;

  constructor(props: Props<TValue, TOptions>) {
    super(props);
    this.state = {
      options: props.options,
      loading: Boolean(props.model)
    };
  }

  componentDidMount(): void {
    if (!this.props.model) {
      return;
    }

    this.props.model
      .read('')
      .then((data) => {
        this.setState({
          options: [[null, ''], ...data],
          loading: false
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getOptions(): State<TValue, TOptions>['options'] {
    return this.props.model ? this.state.options : this.props.options;
  }

  handleChange: React.ChangeEventHandler<HTMLSelectElement> = ({target}) => {
    const currentOption = this.getOptions()[Number(target.value)];
    const [value, label] =
      currentOption instanceof Array
        ? currentOption
        : ([currentOption, currentOption] as [TValue | null, string]);

    this.props.onChange(value);
    if (this.props.onLabelChange) {
      this.props.onLabelChange(label);
    }
  };

  render(): JSX.Element {
    const options = this.getOptions();
    const valueIndex = options.findIndex((option) => {
      return isEqual(option instanceof Array ? option[0] : option, this.props.value);
    });

    return (
      <select
        {...omit(this.props, ['value', 'options'])}
        value={valueIndex}
        onChange={this.handleChange}
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
