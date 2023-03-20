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
  TRecord extends Record<string, unknown>,
  TRequestedField extends string & keyof TRecord
> = {
  formData: ReturnType<FormService<TRecord, TRequestedField>['getAll']>;
  formService: FormService<TRecord, TRequestedField>;
};

export type WithoutConnectFormProps<TProps extends Record<string, unknown>> = Omit<
  TProps,
  keyof ConnectFormProps<Record<string, unknown>, never>
>;

export type WithConnectFormProps<
  TRecord extends Record<string, unknown>,
  TRequestedField extends string & keyof TRecord,
  TProps extends Record<string, unknown>
> = ConnectFormProps<TRecord, TRequestedField> & WithoutConnectFormProps<TProps>;

function connectForm<TRecord extends Record<string, unknown>, TRequestedField extends string & keyof TRecord>(
  fields: TRequestedField[] = []
) {
  return <TProps extends ConnectFormProps<TRecord, TRequestedField>>(
    Component: React.ComponentType<TProps>
  ): React.ComponentType<WithoutConnectFormProps<TProps>> => {
    class ComponentWithFormService extends React.Component<
      WithoutConnectFormProps<TProps>,
      ReturnType<FormService<TRecord, TRequestedField>['getAll']>
    > {
      private form = new FormService<TRecord, TRequestedField>(fields);

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

      onFormChange = (newFormState: ReturnType<FormService<TRecord, TRequestedField>['getAll']>): void => {
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
