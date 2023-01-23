/* eslint-disable react/no-direct-mutation-state */
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {StrictOmit} from 'ts-essentials';
import {assert, isEqual} from '../common/utils';
import floatValidator from '../validation/rules/float';

const isInvalidFloat = (value: unknown): boolean => Boolean(floatValidator(null, null)(value));

type Value = number | string | null;

type Props = StrictOmit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'onChange' | 'type' | 'value'
> & {
  // String should be allowed, because when we start typing negative number,
  // there is appearing a warning in console after '-' symbol
  value: Value;
  onChange: (value: Value) => void;
};

type State = {
  value: Value;
};

// eslint-disable-next-line react/no-unsafe
class NumberEditor extends React.Component<Props, State> {
  private input: HTMLInputElement | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (!isEqual(this.state.value, nextProps.value)) {
      assert(this.input, '"input" unknown');
      // @ts-expect-error: TS2540 Cannot assign to 'value' because it is a read-only property
      this.state.value = nextProps.value;
      this.input.value = this.state.value?.toString() || '';
    }
  }

  render(): JSX.Element {
    const {value, ...props} = this.props;

    return (
      <input
        step="any"
        {...props}
        type="number"
        ref={(input) => {
          this.input = input;
        }}
        onChange={this.onChangeHandler}
        defaultValue={value?.toString() || ''}
      />
    );
  }

  private onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
    const valueAsNumber = parseFloat(target.value); // Edge doesn't support "target.valueAsNumber"
    if (target.value === '' && target.validity.valid) {
      // Invalid number set empty string and valid=false to event
      // @ts-expect-error: TS2540 Cannot assign to 'value' because it is a read-only property
      this.state.value = null;
    } else if (isInvalidFloat(valueAsNumber)) {
      // @ts-expect-error: TS2540 Cannot assign to 'value' because it is a read-only property
      this.state.value = '';
    } else {
      // @ts-expect-error: TS2540 Cannot assign to 'value' because it is a read-only property
      this.state.value = valueAsNumber;
    }

    this.props.onChange(this.state.value);
  };
}

export default NumberEditor;
