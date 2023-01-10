declare module 'uikernel' {
  interface ValidationJSONError {
    message: string;
    [extra: string]: any;
  }

  export type Order<TFields extends string = string> = [TFields, 'ASC' | 'DESC'][];

  export type ReadResult<TKey, TRecord, TField extends keyof TRecord> = {
    count: number;
    extraRecords?: [TKey, Pick<TRecord, TField>][];
    records: [TKey, Pick<TRecord, TField>][];
    totals?: Partial<Pick<TRecord, TField>>;
  };

  export type ReadOptions<TKey, TRecord, TField extends keyof TRecord, TFilter> = {
    extra?: TKey[];
    fields: readonly TField[];
    filters?: TFilter;
    limit?: number;
    offset?: number;
    sort?: Order<keyof TRecord & string>;
  };

  interface GridModel<TKey, TRecord, TFilter> {
    create(record: Partial<TRecord>): Promise<TKey>;
    getRecord<TField extends keyof TRecord>(
      id: TKey,
      fields: readonly TField[]
    ): Promise<Pick<TRecord, TField> | null>;
    getValidationDependency(fields: readonly (keyof TRecord & string)[]): (keyof TRecord & string)[];
    isValidRecord(record: Partial<TRecord>, recordId?: TKey): Promise<ValidationErrors<keyof TRecord & string>>;
    read<TField extends keyof TRecord & string>(
      props: ReadOptions<TKey, TRecord, TField, TFilter>
    ): Promise<ReadResult<TKey, TRecord, TField>>;
    update(
      changes: [TKey, Partial<TRecord>][]
    ): Promise<[TKey, Partial<TRecord> | Error | ValidationErrors<keyof TRecord & string>][]>;
  }

  export class ValidationErrors<TField extends string> {
    static createFromJSON: <TField extends string>(
      jsonObject: Record<TField, (ValidationJSONError | string)[]>
    ) => ValidationErrors<TField>;
    static createWithError: <TField extends string>(
      field: TField,
      error: ValidationJSONError | string
    ) => ValidationErrors<TField>;

    add: (field: TField, error: ValidationJSONError | string) => ValidationErrors<TField>;
    hasError: (field: TField) => boolean;
    getFieldErrors: (field: TField) => ValidationJSONError[];
    getFieldErrorMessages: (field: TField) => string[];
    getFailedFields: () => TField[];
    isEmpty: () => boolean;
    clearField: (field: TField) => ValidationErrors<TField>;
    clear: () => ValidationErrors<TField>;
    toJSON: () => Record<string, ValidationJSONError[]>;
    clone: () => ValidationErrors<TField>;
    merge<T extends string>(validationErrors: ValidationErrors<T>): ValidationErrors<TField | T>;
    getErrors: () => Map<TField, ValidationJSONError[]>;
  }

  export interface IValidator<TRecord> {
    getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];
    isValidRecord: (record: Partial<TRecord>) => Promise<ValidationErrors<keyof TRecord & string>>;
  }

  export class Validator<TRecord> implements IValidator<TRecord> {
    static create<TRecord>(): Validator<TRecord>;
    field: (field: keyof TRecord & string, cb: (value: any) => string | undefined) => Validator<TRecord>;
    asyncField: (field: keyof TRecord & string, cb: (value: any) => Promise<string | undefined>) => Validator<TRecord>;
    fields: (
      fields: (keyof TRecord & string)[],
      cb: (record: Partial<TRecord>, errors: ValidationErrors<keyof TRecord & string>) => any
    ) => Validator<TRecord>;
    asyncFields: (
      fields: (keyof TRecord & string)[],
      cb: (record: Partial<TRecord>, errors: ValidationErrors<keyof TRecord & string>) => Promise<any>
    ) => Validator<TRecord>;
    asyncDependence: (fields: (keyof TRecord & string)[]) => Validator<TRecord>;
    getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];
    isValidRecord: (record: Partial<TRecord>) => Promise<ValidationErrors<keyof TRecord & string>>;
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
    errors: ValidationErrors<TField>;
    warnings: ValidationErrors<TField>;
  }

  export interface FormSettings<TRecord, TField extends keyof TRecord> {
    fields: readonly TField[];
    model: any;
    data?: Partial<TRecord>;
    changes?: Partial<TRecord>;
    submitAll?: boolean;
    partialErrorChecking?: boolean;
    showDependentFields?: boolean;
    warningsValidator?: Validator<TRecord>;
  }

  export class FormService<TRecord, TField extends keyof TRecord & string> {
    init: (settings: FormSettings<TRecord, TField>) => Promise<void>;
    updateField: (field: TField, value: any) => Promise<void>;
    validateField: (field: TField, value: any) => Promise<void>;
    validateForm: () => Promise<{
      errors: ValidationErrors<TField> | null;
      warnings: ValidationErrors<TField> | null;
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
    useForm: <TRecord, TField extends keyof TRecord & string>(
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
