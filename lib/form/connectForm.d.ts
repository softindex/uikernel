import React from 'react';
import FormService from './FormService';
type ConnectFormProps<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TRequestedField extends string & keyof TRecord> = {
    formData: ReturnType<FormService<TEditableRecord, TRecord, TRequestedField>['getAll']>;
    formService: FormService<TEditableRecord, TRecord, TRequestedField>;
};
export type WithoutConnectFormProps<TProps extends Record<string, unknown>> = Omit<TProps, keyof ConnectFormProps<Record<string, unknown>, Record<string, unknown>, never>>;
declare function connectForm<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TRequestedField extends string & keyof TRecord>(fields?: TRequestedField[]): <TProps extends ConnectFormProps<TEditableRecord, TRecord, TRequestedField>>(Component: React.ComponentType<TProps>) => React.ComponentType<WithoutConnectFormProps<TProps>>;
export default connectForm;
