import ValidationErrors from '../../validation/ValidationErrors';
export interface IFormModel<TRecord extends Record<string, unknown>> {
    getData(): Promise<Partial<TRecord>>;
    getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    getData<TField extends keyof TRecord & string>(fields?: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
    submit(changes: Partial<TRecord>): Promise<Partial<TRecord>>;
}
