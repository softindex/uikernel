/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import columns from '../columns';
import React from 'react';

class FormCheckbox extends React.Component {
  onChangeHandler() {
    this.props.onChange(!this.props.value); // Change state of our value
  }

  render() {
    const id = `col-${this.props.id}`;
    return (
      <div className="form-check">
        <input
          id={id}
          type="checkbox"
          checked={this.props.value}
          onChange={this.onChangeHandler.bind(this)}
        />
        {' '}
        <label htmlFor={id}>{this.props.label}</label>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  onChangeCheckbox(key, value) {
    // Change checkbox value
    this.props.onChange({
      ...this.props.cols,
      [key]: value
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        {Object.keys(columns).map((key) => {
          return (
            <FormCheckbox
              id={key}
              key={key}
              value={this.props.cols[key]}
              label={columns[key].name}
              onChange={value => this.onChangeCheckbox(key, value)}
            />
          );
        })}
      </form>
    );
  }
}

export default Form;
