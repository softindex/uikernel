/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {EventListener, IObservable} from '../../common/types';
import type {IValidator} from '../../validation/types/IValidator';
import type ValidationErrors from '../../validation/ValidationErrors';
import ValidatorBuilder from '../../validation/ValidatorBuilder';
import type {FormModelListenerArgsByEventName} from './FormModelListenerArgsByEventName';
import type {IFormModel} from './IFormModel';

type ToEmptyRecord<TRecord extends Record<string, unknown>> = {
  [K in keyof TRecord]?: undefined;
};

export type FormServiceEmptyState<
  TRecord extends Record<string, unknown>,
  TAvailableField extends keyof TRecord & string,
  TEditableField extends keyof TRecord & string
> = {
  changes: ToEmptyRecord<TRecord>;
  data: ToEmptyRecord<TRecord>;
  errors: ValidationErrors<TEditableField>;
  fields: FormServiceStateFields<ToEmptyRecord<TRecord>, TAvailableField, TEditableField>;
  isLoaded: false;
  isSubmitting: false;
  originalData: ToEmptyRecord<TRecord>;
  warnings: ValidationErrors<TEditableField>;
};

export type FormServiceStateFields<
  TRecord extends Record<string, unknown>,
  TAvailableField extends keyof TRecord & string,
  TEditableField extends keyof TRecord & string
> = Readonly<{
  [FIELD in TAvailableField]: Readonly<{
    errors: ReturnType<ValidationErrors<TEditableField>['getFieldErrors']>;
    isChanged: boolean;
    value: TRecord[FIELD] | undefined;
    warnings: ReturnType<ValidationErrors<TEditableField>['getFieldErrors']>;
  }>;
}>;

export type FormServiceState<
  TRecord extends Record<string, unknown>,
  TAvailableField extends keyof TRecord & string,
  TEditableField extends keyof TRecord & string
> = {
  changes: Partial<TRecord>;
  data: Partial<TRecord>;
  errors: ValidationErrors<TEditableField>;
  fields: FormServiceStateFields<TRecord, TAvailableField, TEditableField>;
  isLoaded: true;
  isSubmitting: boolean;
  originalData: Partial<TRecord>;
  warnings: ValidationErrors<TEditableField>;
};

export type FormServiceParams<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TAvailableField extends keyof TRecord & string,
  TListenerArgsByEventName extends Record<string, unknown[]>
> = {
  /**
   * @description Preset changes
   */
  changes?: Partial<TRecord>;
  /**
   * @description Preset data
   */
  data?: Partial<TRecord>;
  /**
   * @description Fields list, that are required to display
   */
  fields?: readonly TAvailableField[];
  /**
   * @description Model of form
   */
  model: IFormModel<TEditableRecord, TRecord> & IObservable<TListenerArgsByEventName>;
  /**
   * @description Activate partial gradual form validation - default `false`
   */
  partialErrorChecking?: boolean;
  /**
   * @description Send all form for validity check - default `false`
   */
  submitAll?: boolean;
  /**
   * @description Warnings validator for fields
   */
  warningsValidator?: IValidator<TRecord, keyof TEditableRecord & string>;
};

export type FormServiceListenerArgsByEventName<
  TRecord extends Record<string, unknown>,
  TAvailableField extends keyof TRecord & string,
  TEditableField extends keyof TRecord & string
> = {
  update: [
    | FormServiceEmptyState<TRecord, TAvailableField, TEditableField>
    | FormServiceState<TRecord, TAvailableField, TEditableField>
  ];
};

interface IFormService<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TAvailableField extends keyof TRecord & string
> {
  submitting: boolean;
  validating: boolean;

  addChangeListener: (
    func: EventListener<
      FormServiceListenerArgsByEventName<TRecord, TAvailableField, keyof TEditableRecord & string>['update']
    >
  ) => void;

  clearChanges: () => void;

  /**
   * @deprecated
   */
  clearError: (field: keyof TEditableRecord & TAvailableField) => void;

  clearFieldChanges: (field: keyof TEditableRecord & TAvailableField) => void;

  clearValidation: (
    fields: (keyof TEditableRecord & TAvailableField)[] | (keyof TEditableRecord & TAvailableField)
  ) => void;

  getAll: () =>
    | FormServiceEmptyState<TRecord, TAvailableField, keyof TEditableRecord & string>
    | FormServiceState<TRecord, TAvailableField, keyof TEditableRecord & string>;

  getPartialErrorChecking: () => boolean;

  /**
   * Initialize form
   */
  init: ({
    fields,
    model,
    data,
    changes = {},
    warningsValidator = ValidatorBuilder.createEmptyValidator(),
    partialErrorChecking = false,
    submitAll = false
  }: FormServiceParams<
    TEditableRecord,
    TRecord,
    TAvailableField,
    FormModelListenerArgsByEventName<TRecord>
  >) => Promise<void>;

  removeAllListeners: () => void;

  removeChangeListener: (
    func: (state: ReturnType<IFormService<TEditableRecord, TRecord, TAvailableField>['getAll']>) => void
  ) => void;

  /**
   * Set data in the form
   */
  set: (data: Partial<TRecord>, validate?: boolean) => Promise<void>;

  setPartialErrorChecking: (value: boolean) => void;

  /**
   * Send form data to the model
   */
  submit: () => Promise<Partial<TRecord> | undefined>;

  submitData: (data: Partial<TRecord>) => Promise<Partial<TRecord> | undefined>;

  /**
   * Update form value. Is used as the Editors onChange handler
   */
  updateField: <TField extends TAvailableField>(
    field: TField,
    value: Element | TRecord[TField]
  ) => Promise<void>;

  validateField: <TField extends TAvailableField>(
    field: TField,
    value: Element | TRecord[TField]
  ) => Promise<void>;

  validateForm: () => Promise<
    | {
        errors: ValidationErrors<keyof TEditableRecord & string> | null;
        warnings: ValidationErrors<keyof TEditableRecord & string> | null;
      }
    | undefined
  >;
}

export default IFormService;
