/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {EventListener, IObservable} from '../../common/types';
import ValidationErrors from '../../validation/ValidationErrors';
import Validator from '../../validation/Validator';
import {FormModelListenerArgsByEventName} from './FormModelListenerArgsByEventName';
import {IFormModel} from './IFormModel';

type ToEmptyRecord<TRecord extends Record<string, unknown>> = {
  [K in keyof TRecord]?: undefined;
};

export type FormServiceEmptyState<
  TRecord extends Record<string, unknown>,
  TAvailableField extends keyof TRecord & string
> = {
  changes: ToEmptyRecord<TRecord>;
  data: ToEmptyRecord<TRecord>;
  errors: ValidationErrors<keyof TRecord & string>;
  fields: FormServiceStateFields<ToEmptyRecord<TRecord>, TAvailableField>;
  isLoaded: false;
  isSubmitting: false;
  originalData: ToEmptyRecord<TRecord>;
  warnings: ValidationErrors<keyof TRecord & string>;
};

export type FormServiceStateFields<
  TRecord extends Record<string, unknown>,
  TAvailableField extends keyof TRecord & string
> = Readonly<{
  [FIELD in TAvailableField]: Readonly<{
    errors: ReturnType<ValidationErrors<keyof TRecord & string>['getFieldErrors']>;
    isChanged: boolean;
    value: TRecord[FIELD] | undefined;
    warnings: ReturnType<ValidationErrors<keyof TRecord & string>['getFieldErrors']>;
  }>;
}>;

export type FormServiceState<
  TRecord extends Record<string, unknown>,
  TAvailableField extends keyof TRecord & string
> = {
  changes: Partial<TRecord>;
  data: Partial<TRecord>;
  errors: ValidationErrors<keyof TRecord & string>;
  fields: FormServiceStateFields<TRecord, TAvailableField>;
  isLoaded: true;
  isSubmitting: boolean;
  originalData: Partial<TRecord>;
  warnings: ValidationErrors<keyof TRecord & string>;
};

export type FormServiceParams<
  TRecord extends Record<string, unknown>,
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
  model: IFormModel<TRecord> & IObservable<TListenerArgsByEventName>;
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
  warningsValidator?: Validator<TRecord>;
};

export type FormServiceListenerArgsByEventName<
  TRecord extends Record<string, unknown>,
  TAvailableField extends keyof TRecord & string
> = {
  update: [FormServiceEmptyState<TRecord, TAvailableField> | FormServiceState<TRecord, TAvailableField>];
};

interface IFormService<
  TRecord extends Record<string, unknown>,
  TAvailableField extends keyof TRecord & string
> {
  submitting: boolean;
  validating: boolean;

  addChangeListener: (
    func: EventListener<FormServiceListenerArgsByEventName<TRecord, TAvailableField>['update']>
  ) => void;

  clearChanges: () => void;

  /**
   * @deprecated
   */
  clearError: (field: keyof TRecord & string) => void;

  clearFieldChanges: (field: keyof TRecord & string) => void;

  clearValidation: (fields: (keyof TRecord & string)[] | (keyof TRecord & string)) => void;

  getAll: () => FormServiceEmptyState<TRecord, TAvailableField> | FormServiceState<TRecord, TAvailableField>;

  getPartialErrorChecking: () => boolean;

  /**
   * Initialize form
   */
  init: ({
    fields,
    model,
    data,
    changes = {},
    warningsValidator = new Validator(),
    partialErrorChecking = false,
    submitAll = false
  }: FormServiceParams<TRecord, TAvailableField, FormModelListenerArgsByEventName<TRecord>>) => Promise<void>;

  removeAllListeners: () => void;

  removeChangeListener: (
    func: (state: ReturnType<IFormService<TRecord, TAvailableField>['getAll']>) => void
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
        errors: ValidationErrors<keyof TRecord & string> | null;
        warnings: ValidationErrors<keyof TRecord & string> | null;
      }
    | undefined
  >;
}

export default IFormService;
