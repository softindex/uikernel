declare module 'uikernel' {
  export interface TValidator<TField, TRecord> {
    field: (field: TField, cb: (value: any) => string | undefined) => TValidator<TField, TRecord>;
    asyncField: (
      field: TField,
      cb: (value: any) => Promise<string | undefined>
    ) => TValidator<TField, TRecord>;
    fields: (
      fields: TField[],
      cb: (record: Partial<TRecord>, errors: any) => any
    ) => TValidator<TField, TRecord>;
    asyncFields: (
      fields: TField[],
      cb: (record: Partial<TRecord>, errors: any) => Promise<any>
    ) => TValidator<TField, TRecord>;
    asyncDependence: (fields: TField[]) => TValidator<TField, TRecord>;
    getValidationDependency: (fields: TField[]) => TField[];
    isValidRecord: (record: Partial<TRecord>) => Promise<any>;
  }

  export interface TValidatorConstructor {
    new <TField, TRecord>(): TValidator<TField, TRecord>;
    create<TField, TRecord>(): TValidator<TField, TRecord>;
  }

  interface TUIKernel {
    Validator: TValidatorConstructor;
    createValidator: <TField, TRecord>() => TValidator<TField, TRecord>;
    [key: string]: any;
  }

  const x: TUIKernel;
  export default x;
}

declare module 'uikernel/lib/common/utils' {
  export function decorate(model: any, decor: object): any;
}
