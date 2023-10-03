import type ValidationErrors from '../ValidationErrors';
export interface IValidator<TRecord, TEditable extends keyof TRecord & string> {
    getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];
    isValidRecord: (record: Partial<TRecord>) => Promise<ValidationErrors<TEditable>>;
}
