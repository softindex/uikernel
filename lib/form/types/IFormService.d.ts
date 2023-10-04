import type { EventListener, IObservable } from '../../common/types';
import type { IValidator } from '../../validation/types/IValidator';
import type ValidationErrors from '../../validation/ValidationErrors';
import type { FormModelListenerArgsByEventName } from './FormModelListenerArgsByEventName';
import type { IFormModel } from './IFormModel';
type ToEmptyRecord<TRecord extends Record<string, unknown>> = {
    [K in keyof TRecord]?: undefined;
};
export type FormServiceEmptyState<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string, TEditableField extends keyof TRecord & string> = {
    changes: ToEmptyRecord<TRecord>;
    data: ToEmptyRecord<TRecord>;
    errors: ValidationErrors<TEditableField>;
    fields: FormServiceStateFields<ToEmptyRecord<TRecord>, TAvailableField, TEditableField>;
    isLoaded: false;
    isSubmitting: false;
    originalData: ToEmptyRecord<TRecord>;
    warnings: ValidationErrors<TEditableField>;
};
export type FormServiceStateFields<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string, TEditableField extends keyof TRecord & string> = Readonly<{
    [FIELD in TAvailableField]: Readonly<{
        errors: ReturnType<ValidationErrors<TEditableField>['getFieldErrors']>;
        isChanged: boolean;
        value: TRecord[FIELD] | undefined;
        warnings: ReturnType<ValidationErrors<TEditableField>['getFieldErrors']>;
    }>;
}>;
export type FormServiceState<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string, TEditableField extends keyof TRecord & string> = {
    changes: Partial<TRecord>;
    data: Partial<TRecord>;
    errors: ValidationErrors<TEditableField>;
    fields: FormServiceStateFields<TRecord, TAvailableField, TEditableField>;
    isLoaded: true;
    isSubmitting: boolean;
    originalData: Partial<TRecord>;
    warnings: ValidationErrors<TEditableField>;
};
export type FormServiceParams<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TAvailableField extends keyof TRecord & string, TListenerArgsByEventName extends Record<string, unknown[]>> = {
    changes?: Partial<TRecord>;
    data?: Partial<TRecord>;
    fields?: readonly TAvailableField[];
    model: IFormModel<TEditableRecord, TRecord> & IObservable<TListenerArgsByEventName>;
    partialErrorChecking?: boolean;
    submitAll?: boolean;
    warningsValidator?: IValidator<TRecord, keyof TEditableRecord & string>;
};
export type FormServiceListenerArgsByEventName<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string, TEditableField extends keyof TRecord & string> = {
    update: [
        FormServiceEmptyState<TRecord, TAvailableField, TEditableField> | FormServiceState<TRecord, TAvailableField, TEditableField>
    ];
};
interface IFormService<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TAvailableField extends keyof TRecord & string> {
    submitting: boolean;
    validating: boolean;
    addChangeListener: (func: EventListener<FormServiceListenerArgsByEventName<TRecord, TAvailableField, keyof TEditableRecord & string>['update']>) => void;
    clearChanges: () => void;
    clearError: (field: keyof TEditableRecord & TAvailableField) => void;
    clearFieldChanges: (field: keyof TEditableRecord & TAvailableField) => void;
    clearValidation: (fields: (keyof TEditableRecord & TAvailableField)[] | (keyof TEditableRecord & TAvailableField)) => void;
    getAll: () => FormServiceEmptyState<TRecord, TAvailableField, keyof TEditableRecord & string> | FormServiceState<TRecord, TAvailableField, keyof TEditableRecord & string>;
    getPartialErrorChecking: () => boolean;
    init: ({ fields, model, data, changes, warningsValidator, partialErrorChecking, submitAll }: FormServiceParams<TEditableRecord, TRecord, TAvailableField, FormModelListenerArgsByEventName<TRecord>>) => Promise<void>;
    removeAllListeners: () => void;
    removeChangeListener: (func: (state: ReturnType<IFormService<TEditableRecord, TRecord, TAvailableField>['getAll']>) => void) => void;
    set: (data: Partial<TRecord>, validate?: boolean) => Promise<void>;
    setPartialErrorChecking: (value: boolean) => void;
    submit: () => Promise<Partial<TRecord> | undefined>;
    submitData: (data: Partial<TRecord>) => Promise<Partial<TRecord> | undefined>;
    updateField: <TField extends TAvailableField>(field: TField, value: Element | TRecord[TField]) => Promise<void>;
    validateField: <TField extends TAvailableField>(field: TField, value: Element | TRecord[TField]) => Promise<void>;
    validateForm: () => Promise<{
        errors: ValidationErrors<keyof TEditableRecord & string> | null;
        warnings: ValidationErrors<keyof TEditableRecord & string> | null;
    } | undefined>;
}
export default IFormService;
