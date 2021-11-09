declare module 'uikernel' {
  export class Validator<TRecord> {
    static create<TRecord>(): Validator<TRecord>;
    field: (field: keyof TRecord, cb: (value: any) => string | undefined) => Validator<TRecord>;
    asyncField: (
      field: keyof TRecord,
      cb: (value: any) => Promise<string | undefined>
    ) => Validator<TRecord>;
    fields: (
      fields: (keyof TRecord)[],
      cb: (record: Partial<TRecord>, errors: any) => any
    ) => Validator<TRecord>;
    asyncFields: (
      fields: (keyof TRecord)[],
      cb: (record: Partial<TRecord>, errors: any) => Promise<any>
    ) => Validator<TRecord>;
    asyncDependence: (fields: (keyof TRecord)[]) => Validator<TRecord>;
    getValidationDependency: (fields: (keyof TRecord)[]) => (keyof TRecord)[];
    isValidRecord: (record: Partial<TRecord>) => Promise<any>;
  }

  interface UIKernel {
    Validator: typeof Validator;
    createValidator: <TRecord>() => Validator<TRecord>;
    [key: string]: any;
  }

  const x: UIKernel;
  export default x;
}

declare module 'uikernel/lib/common/utils' {
  export function decorate(model: any, decor: object): any;
}
