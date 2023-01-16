/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {ArrayWithAtLeastOneElement} from '../common/types';
import FormService from './FormService';

type ConnectFormProps<TRecord extends {}, TAvailableField extends string & keyof TRecord> = {
  formData: ReturnType<FormService<TRecord, TAvailableField>['getAll']>;
  formService: FormService<TRecord, TAvailableField>;
};

export type WithoutConnectFormProps<TProps extends {}> = Omit<TProps, keyof ConnectFormProps<{}, never>>;

export type WithConnectFormProps<
  TRecord extends {},
  TAvailableField extends string & keyof TRecord,
  TProps extends {}
> = ConnectFormProps<TRecord, TAvailableField> & WithoutConnectFormProps<TProps>;

function connectForm<TRecord extends {}, TAvailableField extends string & keyof TRecord>(
  fields: ArrayWithAtLeastOneElement<TAvailableField> | null = null
) {
  return <TProps extends {}>(
    Component: React.ComponentType<WithConnectFormProps<TRecord, TAvailableField, TProps>>
  ): React.ComponentType<WithoutConnectFormProps<TProps>> => {
    class ComponentWithFormService extends React.Component<
      WithoutConnectFormProps<TProps>,
      ReturnType<FormService<TRecord, TAvailableField>['getAll']>
    > {
      private form = new FormService<TRecord, TAvailableField>(fields || []);

      constructor(props: WithoutConnectFormProps<TProps>) {
        super(props);

        this.state = this.form.getAll();
        this.onFormChange = this.onFormChange.bind(this);
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

      onFormChange(newFormState: ReturnType<FormService<TRecord, TAvailableField>['getAll']>): void {
        this.setState(newFormState);
      }

      render(): JSX.Element {
        return <Component {...this.props} formData={this.state} formService={this.form} />;
      }
    }

    return ComponentWithFormService;
  };
}

export default connectForm;
