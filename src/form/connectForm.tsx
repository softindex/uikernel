/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import FormService from './FormService';

function connectForm(fields = null) {
  return (Component: new() => React.Component<any, any>) =>
    class ComponentWithFormService extends React.Component {
      public form: FormService;

      constructor() {
        super({});
        this.form = new FormService(fields);
        this.state = this.form.getAll();
        this.onFormChange = this.onFormChange.bind(this);
      }
      componentDidMount() {
        const state = this.form.getAll();
        if (state.isLoaded) {
          this.setState(state);
        }
        this.form.addChangeListener(this.onFormChange);
      }
      componentWillUnmount() {
        this.form.removeChangeListener(this.onFormChange);
      }
      onFormChange(newFormState: any) {
        this.setState(newFormState);
      }
      render() {
        return (
          <Component
            {...this.props}
            formData={this.state}
            formService={this.form}
          />
        );
      }
    };
}
export default connectForm;
