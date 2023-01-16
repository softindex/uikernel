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

export interface IFormServiceEmptyState<TRecord extends {}> {
  changes: {};
  data: {};
  errors: ValidationErrors<keyof TRecord & string>;
  fields: {};
  isLoaded: false;
  isSubmitting: false;
  originalData: {};
  warnings: ValidationErrors<keyof TRecord & string>;
}

export type IFormServiceStateFields<
  TRecord extends {},
  TAvailableField extends keyof TRecord & string
> = Readonly<{
  [FIELD in TAvailableField]: Readonly<{
    errors: ReturnType<ValidationErrors<keyof TRecord & string>['getFieldErrors']>;
    isChanged: boolean;
    value: TRecord[FIELD] | undefined;
    warnings: ReturnType<ValidationErrors<keyof TRecord & string>['getFieldErrors']>;
  }>;
}>;

export interface IFormServiceState<TRecord extends {}, TAvailableField extends keyof TRecord & string> {
  changes: Partial<TRecord>;
  data: Partial<TRecord>;
  errors: ValidationErrors<keyof TRecord & string>;
  fields: IFormServiceStateFields<TRecord, TAvailableField>;
  isLoaded: boolean;
  isSubmitting: boolean;
  originalData: Partial<TRecord>;
  warnings: ValidationErrors<keyof TRecord & string>;
}

export interface IFormServiceParams<
  TRecord extends {},
  TAvailableField extends keyof TRecord & string,
  TListenerArgsByEventName extends {}
> {
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
}

export type IFormServiceListenerArgsByEventName<
  TRecord extends {},
  TAvailableField extends keyof TRecord & string
> = {
  update: [IFormServiceEmptyState<TRecord> | IFormServiceState<TRecord, TAvailableField>];
};

interface IFormService<TRecord extends {}, TAvailableField extends keyof TRecord & string> {
  submitting: boolean;
  validating: boolean;

  addChangeListener: (
    func: EventListener<IFormServiceListenerArgsByEventName<TRecord, TAvailableField>['update']>
  ) => void;

  clearChanges: () => void;

  /**
   * @deprecated
   */
  clearError: (field: keyof TRecord & string) => void;

  clearFieldChanges: (field: keyof TRecord & string) => void;

  clearValidation: (fields: (keyof TRecord & string)[] | (keyof TRecord & string)) => void;

  getAll: () => IFormServiceEmptyState<TRecord> | IFormServiceState<TRecord, TAvailableField>;

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
  }: IFormServiceParams<
    TRecord,
    TAvailableField,
    FormModelListenerArgsByEventName<TRecord>
  >) => Promise<void>;

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
