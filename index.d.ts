declare module 'uikernel' {
  interface ValidationJSONError {
    message: string;
    [extra: string]: any;
  }

  export class ValidationErrors<TField extends string> {
    static createFromJSON<TField extends string>(
      jsonObject: Record<
        TField,
        readonly (Readonly<ValidationJSONError> | string)[] | (ValidationJSONError | string)[]
      >
    ): ValidationErrors<TField>;
    static createWithError<TField extends string>(
      field: TField,
      error: Readonly<ValidationJSONError> | ValidationJSONError | string
    ): ValidationErrors<TField>;

    add(
      field: TField,
      error: Readonly<ValidationJSONError> | ValidationJSONError | string
    ): ValidationErrors<TField>;
    hasError(field: TField): boolean;
    getFieldErrors(field: TField): Readonly<ValidationJSONError>[];
    getFieldErrorMessages(field: TField): string[];
    getFailedFields(): TField[];
    isEmpty(): boolean;
    clearField(field: TField): ValidationErrors<TField>;
    clear(): ValidationErrors<TField>;
    toJSON(): Record<TField, readonly Readonly<ValidationJSONError>[]>;
    clone(): ValidationErrors<TField>;
    merge<T extends string>(validationErrors: ValidationErrors<T>): ValidationErrors<TField | T>;
    getErrors(): ReadonlyMap<TField, readonly Readonly<ValidationJSONError>[]>;
  }

  export class Validator<TRecord extends Record<string, unknown>> {
    static create<TRecord extends Record<string, unknown>>(): Validator<TRecord>;
    field(field: keyof TRecord & string, cb: (value: any) => string | undefined): Validator<TRecord>;
    asyncField(
      field: keyof TRecord & string,
      cb: (value: any) => Promise<string | undefined>
    ): Validator<TRecord>;
    fields(
      fields: readonly (keyof TRecord & string)[],
      cb: (record: Partial<TRecord>, errors: ValidationErrors<keyof TRecord & string>) => void
    ): Validator<TRecord>;
    asyncFields(
      fields: readonly (keyof TRecord & string)[],
      cb: (record: Partial<TRecord>, errors: ValidationErrors<keyof TRecord & string>) => Promise<void>
    ): Validator<TRecord>;
    asyncDependence(fields: readonly (keyof TRecord & string)[]): Validator<TRecord>;
    getValidationDependency(fields: readonly (keyof TRecord & string)[]): (keyof TRecord & string)[];
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
  }

  class AbstractFormModel<TRecord extends Record<string, unknown>> {
    protected trigger(event: string, ...params: any[]): void;

    getData<TField extends keyof TRecord & string>(
      fields: readonly TField[] | TField[]
    ): Promise<Pick<TRecord, TField>>;
    submit(record: Partial<TRecord>): Promise<Partial<TRecord>>;
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(
      fields: readonly (keyof TRecord & string)[] | (keyof TRecord & string)[]
    ): (keyof TRecord & string)[];
    on(event: string, cb: (...args: any[]) => void): void;
    off(event: string, cb: (...args: any[]) => void): void;
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

  export interface FormState<TRecord, TField extends keyof TRecord & string> {
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
    errors: ValidationErrors<keyof TRecord & string>;
    warnings: ValidationErrors<keyof TRecord & string>;
  }

  export interface FormSettings<
    TRecord extends Record<string, unknown>,
    TField extends keyof TRecord & string
  > {
    fields: readonly TField[];
    model: typeof AbstractFormModel;
    data?: Readonly<Partial<TRecord>>;
    changes?: Readonly<Partial<TRecord>>;
    submitAll?: boolean;
    partialErrorChecking?: boolean;
    showDependentFields?: boolean;
    warningsValidator?: Validator<TRecord>;
  }

  export class FormService<TRecord extends Record<string, unknown>, TField extends keyof TRecord & string> {
    init(settings: FormSettings<TRecord, TField>): Promise<void>;
    updateField(field: TField, value: any): Promise<void>;
    validateField(field: TField, value: any): Promise<void>;
    validateForm(): Promise<{
      errors: ValidationErrors<keyof TRecord & string> | null;
      warnings: ValidationErrors<keyof TRecord & string> | null;
    }>;
    submit(): Promise<Partial<TRecord>>;
    submitData(data: Partial<TRecord>): Promise<Partial<TRecord>>;
    set(data: Partial<TRecord>, validate: boolean): Promise<void>;

    getAll(): FormStateEmpty | FormState<TRecord, TField>;
    setPartialErrorChecking(value: boolean): void;
    getPartialErrorChecking(): boolean;
    clearValidation(fields: readonly TField[] | TField[] | TField): void;
    clearFieldChanges(field: TField): void;
    clearChanges(): void;
    addChangeListener(func: (state: ReturnType<FormService<TRecord, TField>['getAll']>) => void): void;
    removeChangeListener(func: (state: ReturnType<FormService<TRecord, TField>['getAll']>) => void): void;
    removeAllListeners(): void;
  }

  interface UIKernel {
    Validator: typeof Validator;
    createValidator: <TRecord extends Record<string, unknown>>() => Validator<TRecord>;
    ValidationErrors: typeof ValidationErrors;
    Form: typeof FormService;
    useForm: <TRecord extends Record<string, unknown>, TField extends keyof TRecord & string>(
      setting: FormSettings<TRecord, TField>,
      onError: (error: Error) => void
    ) => [ReturnType<FormService<TRecord, TField>['getAll']>, FormService<TRecord, TField>];
    AbstractModels: {
      Form: typeof AbstractFormModel;
      [key: string]: any;
    };
    [key: string]: any;
  }

  const x: UIKernel;
  export default x;
}

declare module 'uikernel/lib/common/utils' {
  export function decorate(model: any, decor: object): any;
}
