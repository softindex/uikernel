import type ValidationErrors from '../../validation/ValidationErrors';
export interface IFormModel<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord> {
    getData(): Promise<Partial<TRecord>>;
    getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    getData<TField extends keyof TRecord & string>(fields?: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TEditableRecord & string>>;
    submit(changes: Partial<TEditableRecord>): Promise<Partial<TRecord>>;
}
