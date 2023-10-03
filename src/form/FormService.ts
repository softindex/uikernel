/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ThrottleError from '../common/error/ThrottleError';
import EventEmitter from '../common/EventsModel';
import throttle from '../common/throttle';
import type {EventListener, IObservable} from '../common/types';
import {getRecordChanges, keys, parseValueFromEvent, isEmpty, isEqual, warn} from '../common/utils';
import type {IValidator} from '../validation/types/IValidator';
import ValidationErrors from '../validation/ValidationErrors';
import ValidatorBuilder from '../validation/ValidatorBuilder';
import type {FormModelListenerArgsByEventName} from './types/FormModelListenerArgsByEventName';
import type {IFormModel} from './types/IFormModel';
import type {
  FormServiceEmptyState,
  FormServiceParams,
  FormServiceState,
  FormServiceStateFields,
  FormServiceListenerArgsByEventName
} from './types/IFormService';
import type IFormService from './types/IFormService';

type InitializedState<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord> =
  | {
      data: Partial<TRecord>;
      initialized: true;
      model: IFormModel<TEditableRecord, TRecord> & IObservable<FormModelListenerArgsByEventName<TRecord>>;
      warningsValidator: IValidator<TRecord, keyof TEditableRecord & string>;
    }
  | {
      data: undefined;
      initialized: false;
      model: null;
      warningsValidator: null;
    };

class FormService<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TAvailableField extends keyof TRecord & string
> implements IFormService<TEditableRecord, TRecord, TAvailableField>
{
  validating = false;
  submitting = false;
  private eventEmitter = new EventEmitter<
    FormServiceListenerArgsByEventName<TRecord, TAvailableField, keyof TEditableRecord & string>
  >();

  private errors = new ValidationErrors<keyof TEditableRecord & string>();
  private warnings = new ValidationErrors<keyof TEditableRecord & string>();
  private hiddenValidationFields: (keyof TRecord & string)[] = [];

  // next props will be redefined via the "init"
  private changes: Partial<TRecord> = {};
  private fields: readonly (keyof TRecord & string)[];
  private partialErrorChecking = false;
  private partialErrorCheckingDefault = false;
  private submitAll = false;
  private initializedState: InitializedState<TEditableRecord, TRecord> = {
    initialized: false,
    data: undefined,
    model: null,
    warningsValidator: null
  };

  constructor(fields: TAvailableField[] | undefined = []) {
    this.fields = fields;
    this.throttledValidateForm = throttle(this.throttledValidateForm);
  }

  /**
   * Initialize form
   */
  async init({
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
  >): Promise<void> {
    this.changes = changes;
    this.hiddenValidationFields = [];
    this.partialErrorCheckingDefault = this.partialErrorChecking = partialErrorChecking;
    this.submitAll = submitAll;
    this.validating = false;
    this.submitting = false;

    this.initializedState.data = data;
    this.initializedState.model = model;
    this.initializedState.warningsValidator = warningsValidator;
    this.initializedState.initialized = true;

    if (fields) {
      this.fields = fields;
    }

    if (!this.initializedState.data) {
      this.initializedState.data = (await this.initializedState.model.getData([
        ...this.fields
      ])) as Partial<TRecord>;
    }

    this.initializedState.model.on('update', this.onModelChange);
    this.setState();

    if (!this.partialErrorChecking) {
      await this.validateForm();
    }
  }

  getAll():
    | FormServiceEmptyState<TRecord, TAvailableField, keyof TEditableRecord & string>
    | FormServiceState<TRecord, TAvailableField, keyof TEditableRecord & string> {
    if (!this.isLoaded()) {
      return this.getEmptyState();
    }

    const data = this.getData();
    const changes = this.getChangesFields();
    const errors = this.getDisplayedErrors(this.errors);
    const warnings = this.getDisplayedErrors(this.warnings);

    return {
      isLoaded: true,
      data,
      originalData: this.initializedState.data ?? {},
      changes,
      errors,
      warnings,
      // Note that we return errors and warnings both in bunch as a property and for each field separately
      // - it is redundantly, but handy :)
      fields: this.getFields(data, changes, errors, warnings),
      isSubmitting: this.submitting
    };
  }

  /**
   * Update form value. Is used as the Editors onChange handler
   */
  updateField = async <TField extends keyof TRecord & string>(
    field: TField,
    value: Element | TRecord[TField],
    validate = false
  ): Promise<void> => {
    const changes: Partial<TRecord> = {};
    changes[field] = parseValueFromEvent(value) as TRecord[TField] | undefined;

    await this.set(changes, validate);
  };

  addChangeListener(
    func: EventListener<
      FormServiceListenerArgsByEventName<TRecord, TAvailableField, keyof TEditableRecord & string>['update']
    >
  ): void {
    this.eventEmitter.on('update', func);
  }

  removeChangeListener(
    func: (state: ReturnType<IFormService<TEditableRecord, TRecord, TAvailableField>['getAll']>) => void
  ): void {
    this.eventEmitter.off('update', func);
    if (this.eventEmitter.listenerCount('update') === 0 && this.initializedState.initialized) {
      this.initializedState.model.off('update', this.onModelChange);
    }
  }

  removeAllListeners(): void {
    this.eventEmitter.removeAllListeners('update');
    this.initializedState.model?.off('update', this.onModelChange);
  }

  clearValidation = (fields: (keyof TRecord & string)[] | (keyof TRecord & string)): void => {
    if (!this.initializedState.initialized) {
      return;
    }

    // We keep info about _hiddenValidationFields for cases when clearValidation was called while validateForm was
    // called and haven't finished, so then old validation result shouldn't show errors for _hiddenValidationFields
    // fields, but the next called validations will clear _hiddenValidationFields so the fields will get errors again.
    // Use case: a user changed field 'name', a validation started, the user focused field 'age' so we called
    // clearValidation('age'), the validation finished and returned errors for fields 'name' and 'age', but we
    // shouldn't show error for field 'age' because the user has just focused it. Then user blured field 'age', a new
    // validation stated and it should show errors for field 'age'.
    if (Array.isArray(fields)) {
      this.hiddenValidationFields.push(...fields);
    } else {
      this.hiddenValidationFields.push(fields);
    }

    this.setState();
  };

  /**
   * @deprecated
   */
  clearError = (field: keyof TRecord & string): void => {
    warn('Deprecated: FormService method "clearError" renamed to "clearValidation"');
    this.clearValidation(field);
  };

  validateField = async <TField extends keyof TRecord & string>(
    field: TField,
    value: Element | TRecord[TField]
  ): Promise<void> => {
    console.warn(
      'Deprecated: Use "updateField" method with "validate" param instead of "validateField" method'
    );
    await this.updateField(field, value, true);
  };

  /**
   * Set data in the form
   */
  async set(data: Partial<TRecord>, validate = false): Promise<void> {
    if (!this.isLoaded() || !this.initializedState.initialized) {
      return;
    }

    this.changes = getRecordChanges(
      this.initializedState.model.getValidationDependency.bind(this.initializedState.model),
      this.initializedState.data,
      this.changes,
      data
    );

    const changedFields = keys(data);
    const validationDependencies = this.initializedState.model.getValidationDependency(changedFields);
    this.clearValidation(changedFields.concat(validationDependencies));

    if (validate) {
      try {
        await this.validateForm();
      } catch (error) {
        if (!(error instanceof ThrottleError)) {
          throw error;
        }
      }
    }
  }

  async submitData(data: Partial<TRecord>): Promise<Partial<TRecord> | undefined> {
    if (!this.initializedState.initialized) {
      return;
    }

    await this.set(data);
    return await this.submit();
  }

  /**
   * Send form data to the model
   */
  async submit(): Promise<Partial<TRecord> | undefined> {
    if (!this.initializedState.initialized || this.submitting) {
      return;
    }

    const changes = this.getChanges();

    this.submitting = true;
    this.partialErrorChecking = false;
    const countOfHiddenValidationFieldsToRemove = this.hiddenValidationFields.length;

    this.setState();

    // Send changes to model
    let data;
    let validationErrors;
    try {
      data = await this.initializedState.model.submit(changes);
    } catch (error) {
      if (!(error instanceof ValidationErrors)) {
        this.submitting = false;
        this.setState();
        throw error;
      }

      validationErrors = error;
    }

    this.submitting = false;

    const newChanges = this.getChanges();
    const actualChanges = isEqual(changes, newChanges);

    if (actualChanges) {
      if (validationErrors) {
        this.errors = validationErrors;
      } else {
        this.errors = new ValidationErrors();
        this.changes = {};
      }
    }

    this.hiddenValidationFields.splice(0, countOfHiddenValidationFieldsToRemove);

    this.setState();

    if (validationErrors) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw validationErrors;
    }

    return data;
  }

  clearFieldChanges(field: keyof TEditableRecord & TAvailableField): void {
    if (!this.initializedState.initialized) {
      return;
    }

    this.errors.clearField(field);
    this.warnings.clearField(field);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.changes[field];
    this.setState();
  }

  clearChanges = (): void => {
    if (!this.initializedState.initialized) {
      return;
    }

    this.errors.clear();
    this.warnings.clear();
    this.changes = {};
    this.partialErrorChecking = this.partialErrorCheckingDefault;
    this.setState();
  };

  setPartialErrorChecking(value: boolean): void {
    this.partialErrorChecking = value;
    this.setState();
  }

  getPartialErrorChecking(): boolean {
    return this.partialErrorChecking;
  }

  validateForm = async (): Promise<
    | {
        errors: ValidationErrors<keyof TEditableRecord & string> | null;
        warnings: ValidationErrors<keyof TEditableRecord & string> | null;
      }
    | undefined
  > => {
    try {
      return await this.throttledValidateForm();
    } catch (error) {
      if (!(error instanceof ThrottleError)) {
        throw error;
      }
    }

    return undefined;
  };

  private throttledValidateForm = async (): Promise<
    | {
        errors: ValidationErrors<keyof TEditableRecord & string> | null;
        warnings: ValidationErrors<keyof TEditableRecord & string> | null;
      }
    | undefined
  > => {
    if (!this.initializedState.initialized) {
      return;
    }

    // We should remove only those hiddenValidationFields that were present before validation started and keep those
    // that were added after validation started (so it is possible and ok that field 'name' may be present 2 times:
    // 1 for old validation call and 1 for the new).
    // Take into account that _validateForm is throttled, so next calls will be skipped or scheduled after current call
    // finishes. It means we don't need to care about parallel calls because they are impossible.
    const countOfHiddenValidationFieldsToRemove = this.hiddenValidationFields.length;
    this.validating = true;

    let result;
    try {
      result = await Promise.all([
        this.runValidator(this.initializedState.model, this.getChanges, 'errors'),
        this.runValidator(this.initializedState.warningsValidator, this.getData, 'warnings')
      ]);
    } finally {
      if (!result || (result[0] && result[1])) {
        this.validating = false;
        this.hiddenValidationFields.splice(0, countOfHiddenValidationFieldsToRemove);
        this.setState();
      }
    }

    const displayedErrors = this.getDisplayedErrors(this.errors);
    const displayedWarning = this.getDisplayedErrors(this.warnings);

    return {
      errors: !displayedErrors.isEmpty() ? displayedErrors : null,
      warnings: !displayedWarning.isEmpty() ? displayedWarning : null
    };
  };

  private getFields<TField extends TAvailableField>(
    data: Partial<TRecord>,
    changes: Partial<TRecord>,
    errors: ValidationErrors<keyof TEditableRecord & string>,
    warnings: ValidationErrors<keyof TEditableRecord & string>
  ): FormServiceStateFields<TRecord, TAvailableField, keyof TEditableRecord & string> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proxy: any = new Proxy(
      {},
      {
        get(
          _target,
          fieldName: TField
        ): FormServiceStateFields<TRecord, TAvailableField, keyof TEditableRecord & string>[TField] {
          return {
            value: data[fieldName],
            isChanged: changes.hasOwnProperty(fieldName),
            errors: errors.getFieldErrors(fieldName as unknown as keyof TEditableRecord & string),
            warnings: warnings.getFieldErrors(fieldName as unknown as keyof TEditableRecord & string)
          };
        }
      }
    );

    // Explicit declaration of fields in an object - original object displayed in console, no proxy
    for (const field of this.fields) {
      // eslint-disable-next-line no-self-assign
      proxy[field] = proxy[field];
    }

    return proxy as FormServiceStateFields<TRecord, TAvailableField, keyof TEditableRecord & string>;
  }

  /**
   * Check is data loaded
   */
  private isLoaded(): boolean {
    return this.initializedState.data !== undefined;
  }

  /**
   * Get form changes
   */
  private getChangesFields(): Partial<TRecord> {
    // TODO _getChanges
    const changes: Partial<TRecord> = {};
    for (const field in this.changes) {
      if (!this.isDependentField(field)) {
        changes[field] = this.changes[field];
      }
    }

    return changes;
  }

  /**
   * Filter errors depending on the partialErrorChecking mode and clearValidation method
   */
  private getDisplayedErrors(
    validationErrors: ValidationErrors<keyof TEditableRecord & string>
  ): ValidationErrors<keyof TEditableRecord & string> {
    const filteredErrors = validationErrors.clone();
    const data: Partial<TRecord> = this.initializedState.data ?? {};

    for (const field of validationErrors.getErrors().keys()) {
      const isFieldPristine =
        !this.changes.hasOwnProperty(field) || isEqual(this.changes[field], data[field]);
      if (this.hiddenValidationFields.includes(field) || (this.partialErrorChecking && isFieldPristine)) {
        filteredErrors.clearField(field);
      }
    }

    return filteredErrors;
  }

  private setState(): void {
    this.eventEmitter.trigger('update', this.getAll());
  }

  /**
   * Model records changes handler
   */
  private onModelChange = (changes: Partial<TRecord>): void => {
    this.initializedState.data = {...this.initializedState.data, ...changes};
    this.setState();
  };

  private getData = (): Partial<TRecord> => {
    return {...this.initializedState.data, ...this.changes};
  };

  private getChanges = (): Partial<TRecord> => {
    // Send all data or just changed fields in addiction of form configuration
    if (this.submitAll) {
      return this.getData();
    }

    return this.changes;
  };

  private isDependentField(field: keyof TRecord & string): boolean {
    return (
      this.changes.hasOwnProperty(field) && isEqual(this.changes[field], this.initializedState.data?.[field])
    );
  }

  private async runValidator(
    validator: {
      isValidRecord: (record: Partial<TRecord>) => Promise<ValidationErrors<keyof TEditableRecord & string>>;
    },
    getData: () => Partial<TRecord>,
    output: 'errors' | 'warnings'
  ): Promise<boolean> {
    const data = getData();
    if (isEmpty(data)) {
      this[output].clear();
      return true;
    }

    let validErrors;
    try {
      validErrors = await validator.isValidRecord(data);
    } catch (error) {
      this[output].clear();
      throw error;
    }

    if (!isEqual(data, getData())) {
      return false;
    }

    this[output] = validErrors;
    return true;
  }

  private getEmptyState(): FormServiceEmptyState<TRecord, TAvailableField, keyof TEditableRecord & string> {
    const data: FormServiceEmptyState<TRecord, TAvailableField, keyof TEditableRecord & string>['data'] = {};
    const changes: FormServiceEmptyState<
      TRecord,
      TAvailableField,
      keyof TEditableRecord & string
    >['changes'] = {};
    const errors: FormServiceEmptyState<TRecord, TAvailableField, keyof TEditableRecord & string>['errors'] =
      new ValidationErrors();
    const warnings: FormServiceEmptyState<
      TRecord,
      TAvailableField,
      keyof TEditableRecord & string
    >['warnings'] = new ValidationErrors();
    const fields = this.getFields(data, changes, errors, warnings) as FormServiceEmptyState<
      TRecord,
      TAvailableField,
      keyof TEditableRecord & string
    >['fields'];

    return {
      fields,
      isLoaded: false,
      isSubmitting: false,
      originalData: {},
      data,
      changes,
      errors,
      warnings
    };
  }
}

export default FormService;
