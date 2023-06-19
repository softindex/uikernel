import ValidationErrors from '../ValidationErrors';

export interface IValidator<TRecord> {
  getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];
  isValidRecord: (record: Partial<TRecord>) => Promise<ValidationErrors<keyof TRecord & string>>;
}
