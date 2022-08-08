declare module 'uikernel' {
  interface ValidationJSONError {
    message: string;
    [extra: string]: any;
  }

  export class ValidationErrors<TField extends string> {
    static createFromJSON: (
      jsonObject: Record<TField, (ValidationJSONError | string)[]>
    ) => ValidationErrors<TField>;
    static createWithError: (field: TField, error: ValidationJSONError | string) => ValidationErrors<TField>;

    add: (field: TField, error: ValidationJSONError | string) => ValidationErrors<TField>;
    hasError: (field: TField) => boolean;
    getFieldErrors: (field: TField) => ValidationJSONError[];
    getFieldErrorMessages: (field: TField) => string[];
    getFailedFields: () => TField[];
    isEmpty: () => boolean;
    clearField: (field: TField) => ValidationErrors<TField>;
    clear: () => ValidationErrors<TField>;
    toJSON: () => Record<TField, ValidationJSONError[]>;
    clone: () => ValidationErrors<TField>;
    merge<T extends string>(validationErrors: ValidationErrors<T>): ValidationErrors<TField | T>;
    getErrors: () => readonly Map<TField, ValidationErrorInstance[]>;
  }

  export class Validator<TRecord> {
    static create<TRecord>(): Validator<TRecord>;
    field: (field: keyof TRecord, cb: (value: any) => string | undefined) => Validator<TRecord>;
    asyncField: (field: keyof TRecord, cb: (value: any) => Promise<string | undefined>) => Validator<TRecord>;
    fields: (
      fields: (keyof TRecord)[],
      cb: (record: Partial<TRecord>, errors: ValidationErrors<keyof TRecord>) => any
    ) => Validator<TRecord>;
    asyncFields: (
      fields: (keyof TRecord)[],
      cb: (record: Partial<TRecord>, errors: ValidationErrors<keyof TRecord>) => Promise<any>
    ) => Validator<TRecord>;
    asyncDependence: (fields: (keyof TRecord)[]) => Validator<TRecord>;
    getValidationDependency: (fields: (keyof TRecord)[]) => (keyof TRecord)[];
    isValidRecord: (record: Partial<TRecord>) => Promise<ValidationErrors<keyof TRecord>>;
  }

  export interface FormStateEmpty {
    isLoaded: false;
    isSubmitting: false;
    data: {};
    originalData: {};
    changes: {};
    fields: {};
    errors: ValidationErrors<never>;
    warnings: ValidationErrors<never>;
  }

  export interface FormState<TRecord, TField extends keyof TRecord> {
    isLoaded: boolean;
    isSubmitting: boolean;
    data: Partial<TRecord>;
    originalData: Partial<TRecord>;
    changes: Partial<TRecord>;
    fields: {
      [Field in TField]: {
        value: TRecord[Field] | undefined;
        isChanged: boolean;
        errors: ReturnType<ValidationErrors<TField>['getFieldErrors']>;
        warnings: ReturnType<ValidationErrors<TField>['getFieldErrors']>;
      };
    };
    errors: ValidationErrors<keyof TRecord>;
    warnings: ValidationErrors<keyof TRecord>;
  }

  export interface FormSettings<TRecord, TField extends keyof TRecord> {
    fields: readonly TField[];
    model: any;
    data?: readonly Partial<TRecord>;
    changes?: readonly Partial<TRecord>;
    submitAll?: boolean;
    partialErrorChecking?: boolean;
    showDependentFields?: boolean;
    warningsValidator?: Validator<TRecord>;
  }

  export class FormService<TRecord, TField extends keyof TRecord> {
    init: (settings: FormSettings<TRecord, TField>) => Promise<void>;
    updateField: (field: TField, value: any) => Promise<void>;
    validateField: (field: TField, value: any) => Promise<void>;
    validateForm: () => Promise<{
      errors: ValidationErrors<keyof TRecord> | null;
      warnings: ValidationErrors<keyof TRecord> | null;
    }>;
    submit: () => Promise<Partial<TRecord>>;
    submitData: (data: Partial<TRecord>) => Promise<Partial<TRecord>>;
    set: (data: Partial<TRecord>, validate: boolean) => Promise<void>;

    getAll: () => FormStateEmpty | FormState<TRecord, TField>;
    setPartialErrorChecking: (value: boolean) => void;
    getPartialErrorChecking: () => boolean;
    clearValidation: (fields: TField | TField[]) => void;
    clearFieldChanges: (field: TField) => void;
    clearChanges: () => void;
    addChangeListener: (func: (state: ReturnType<FormService<TRecord, TField>['getAll']>) => void) => void;
    removeChangeListener: (func: (state: ReturnType<FormService<TRecord, TField>['getAll']>) => void) => void;
    removeAllListeners: () => void;
  }

  interface UIKernel {
    Validator: typeof Validator;
    createValidator: <TRecord>() => Validator<TRecord>;
    ValidationErrors: typeof ValidationErrors;
    Form: typeof FormService;
    useForm: <TRecord, TField extends keyof TRecord>(
      setting: FormSettings<TRecord, TField>,
      onError: (error: Error) => void
    ) => [ReturnType<FormService<TRecord, TField>['getAll']>, FormService<TRecord, TField>];
    [key: string]: any;
  }

  const x: UIKernel;
  export default x;
}

declare module 'uikernel/lib/common/utils' {
  export function decorate(model: any, decor: object): any;
}
