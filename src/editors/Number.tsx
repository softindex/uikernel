/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import floatValidator from '../common/validation/rules/float';
import {isEqual, omit, unwrap} from '../common/utils';
import { findDOMNode } from 'react-dom';
import React, {ChangeEventHandler, SyntheticEvent} from 'react';

const isInvalidFloat = floatValidator(null, null);
type NumberEditorProps = {
  onChange: (...args: any[]) => any,
  value?: number | string
};
type NumberEditorState = {
  value: any
};
class NumberEditor extends React.Component<
  NumberEditorProps,
  NumberEditorState
> {
  public input: React.RefObject<HTMLInputElement>;
  constructor(props: NumberEditorProps) {
    super(props);
    this.state = {
      value: props.value
    };
    this.input = React.createRef();
  }
  componentWillReceiveProps(nextProps: NumberEditorProps) {
    if (!isEqual(this.state.value, nextProps.value)) {
      this.setState({value: nextProps.value});
      if (typeof nextProps.value === 'string') {
        ((findDOMNode(this.input.current) as HTMLInputElement)).value = nextProps.value;
      } else if (typeof nextProps.value === 'number') {
        ((findDOMNode(this.input.current) as HTMLInputElement)).value = String(nextProps.value);
      } else {
        ((findDOMNode(this.input.current) as HTMLInputElement)).value = '';
      }
    }
  }
  _onChangeHandler(e: SyntheticEvent<>) {
    const target = e.target;
    const valueAsNumber = parseFloat(target.value); // Edge doesn't support "target.valueAsNumber"
    if (target.value === '' && target.validity.valid) {
      this.setState({value: null});
    } else if (isInvalidFloat(valueAsNumber)) {
      this.setState({value: ''});
    } else {
      this.setState({value: valueAsNumber});
    }
    this.props.onChange(this.state.value);
  }
  render() {
    return (
      <input
        step="any"
        {...omit(this.props, 'value')}
        type="number"
        ref={this.input}
        onChange={this._onChangeHandler.bind(this)}
        defaultValue={this.props.value}
      />
    );
  }
}
export default NumberEditor;
