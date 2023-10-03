/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FormService from './FormService';

type ConnectFormProps<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TRequestedField extends string & keyof TRecord
> = {
  formData: ReturnType<FormService<TEditableRecord, TRecord, TRequestedField>['getAll']>;
  formService: FormService<TEditableRecord, TRecord, TRequestedField>;
};

export type WithoutConnectFormProps<TProps extends Record<string, unknown>> = Omit<
  TProps,
  keyof ConnectFormProps<Record<string, unknown>, Record<string, unknown>, never>
>;

function connectForm<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TRequestedField extends string & keyof TRecord
>(fields: TRequestedField[] = []) {
  return <TProps extends ConnectFormProps<TEditableRecord, TRecord, TRequestedField>>(
    Component: React.ComponentType<TProps>
  ): React.ComponentType<WithoutConnectFormProps<TProps>> => {
    class ComponentWithFormService extends React.Component<
      WithoutConnectFormProps<TProps>,
      ReturnType<FormService<TEditableRecord, TRecord, TRequestedField>['getAll']>
    > {
      private form = new FormService<TEditableRecord, TRecord, TRequestedField>(fields);

      constructor(props: WithoutConnectFormProps<TProps>) {
        super(props);

        this.state = this.form.getAll();
      }

      async componentDidMount(): Promise<void> {
        const state = this.form.getAll();
        if (state.isLoaded) {
          this.setState(state);
        }

        this.form.addChangeListener(this.onFormChange);
      }

      componentWillUnmount(): void {
        this.form.removeChangeListener(this.onFormChange);
      }

      onFormChange = (
        newFormState: ReturnType<FormService<TEditableRecord, TRecord, TRequestedField>['getAll']>
      ): void => {
        this.setState(newFormState);
      };

      render(): JSX.Element {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Component {...(this.props as any)} formData={this.state} formService={this.form} />;
      }
    }

    return ComponentWithFormService;
  };
}

export default connectForm;
