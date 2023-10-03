import type { EventListener, IObservable } from '../../common/types';
import type { IValidator } from '../../validation/types/IValidator';
import type ValidationErrors from '../../validation/ValidationErrors';
import type { FormModelListenerArgsByEventName } from './FormModelListenerArgsByEventName';
import type { IFormModel } from './IFormModel';
type ToEmptyRecord<TRecord extends Record<string, unknown>> = {
    [K in keyof TRecord]?: undefined;
};
export type FormServiceEmptyState<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string> = {
    changes: ToEmptyRecord<TRecord>;
    data: ToEmptyRecord<TRecord>;
    errors: ValidationErrors<keyof TRecord & string>;
    fields: FormServiceStateFields<ToEmptyRecord<TRecord>, TAvailableField>;
    isLoaded: false;
    isSubmitting: false;
    originalData: ToEmptyRecord<TRecord>;
    warnings: ValidationErrors<keyof TRecord & string>;
};
export type FormServiceStateFields<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string> = Readonly<{
    [FIELD in TAvailableField]: Readonly<{
        errors: ReturnType<ValidationErrors<keyof TRecord & string>['getFieldErrors']>;
        isChanged: boolean;
        value: TRecord[FIELD] | undefined;
        warnings: ReturnType<ValidationErrors<keyof TRecord & string>['getFieldErrors']>;
    }>;
}>;
export type FormServiceState<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string> = {
    changes: Partial<TRecord>;
    data: Partial<TRecord>;
    errors: ValidationErrors<keyof TRecord & string>;
    fields: FormServiceStateFields<TRecord, TAvailableField>;
    isLoaded: true;
    isSubmitting: boolean;
    originalData: Partial<TRecord>;
    warnings: ValidationErrors<keyof TRecord & string>;
};
export type FormServiceParams<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string, TListenerArgsByEventName extends Record<string, unknown[]>> = {
    changes?: Partial<TRecord>;
    data?: Partial<TRecord>;
    fields?: readonly TAvailableField[];
    model: IFormModel<TRecord> & IObservable<TListenerArgsByEventName>;
    partialErrorChecking?: boolean;
    submitAll?: boolean;
    warningsValidator?: IValidator<TRecord, keyof TRecord & string>;
};
export type FormServiceListenerArgsByEventName<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string> = {
    update: [FormServiceEmptyState<TRecord, TAvailableField> | FormServiceState<TRecord, TAvailableField>];
};
interface IFormService<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string> {
    submitting: boolean;
    validating: boolean;
    addChangeListener: (func: EventListener<FormServiceListenerArgsByEventName<TRecord, TAvailableField>['update']>) => void;
    clearChanges: () => void;
    clearError: (field: keyof TRecord & string) => void;
    clearFieldChanges: (field: keyof TRecord & string) => void;
    clearValidation: (fields: (keyof TRecord & string)[] | (keyof TRecord & string)) => void;
    getAll: () => FormServiceEmptyState<TRecord, TAvailableField> | FormServiceState<TRecord, TAvailableField>;
    getPartialErrorChecking: () => boolean;
    init: ({ fields, model, data, changes, warningsValidator, partialErrorChecking, submitAll }: FormServiceParams<TRecord, TAvailableField, FormModelListenerArgsByEventName<TRecord>>) => Promise<void>;
    removeAllListeners: () => void;
    removeChangeListener: (func: (state: ReturnType<IFormService<TRecord, TAvailableField>['getAll']>) => void) => void;
    set: (data: Partial<TRecord>, validate?: boolean) => Promise<void>;
    setPartialErrorChecking: (value: boolean) => void;
    submit: () => Promise<Partial<TRecord> | undefined>;
    submitData: (data: Partial<TRecord>) => Promise<Partial<TRecord> | undefined>;
    updateField: <TField extends TAvailableField>(field: TField, value: Element | TRecord[TField]) => Promise<void>;
    validateField: <TField extends TAvailableField>(field: TField, value: Element | TRecord[TField]) => Promise<void>;
    validateForm: () => Promise<{
        errors: ValidationErrors<keyof TRecord & string> | null;
        warnings: ValidationErrors<keyof TRecord & string> | null;
    } | undefined>;
}
export default IFormService;
