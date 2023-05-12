import React from 'react';
import FormService from './FormService';
type ConnectFormProps<TRecord extends Record<string, unknown>, TRequestedField extends string & keyof TRecord> = {
    formData: ReturnType<FormService<TRecord, TRequestedField>['getAll']>;
    formService: FormService<TRecord, TRequestedField>;
};
export type WithoutConnectFormProps<TProps extends Record<string, unknown>> = Omit<TProps, keyof ConnectFormProps<Record<string, unknown>, never>>;
export type WithConnectFormProps<TRecord extends Record<string, unknown>, TRequestedField extends string & keyof TRecord, TProps extends Record<string, unknown>> = ConnectFormProps<TRecord, TRequestedField> & WithoutConnectFormProps<TProps>;
declare function connectForm<TRecord extends Record<string, unknown>, TRequestedField extends string & keyof TRecord>(fields?: TRequestedField[]): <TProps extends ConnectFormProps<TRecord, TRequestedField>>(Component: React.ComponentType<TProps>) => React.ComponentType<WithoutConnectFormProps<TProps>>;
export default connectForm;
