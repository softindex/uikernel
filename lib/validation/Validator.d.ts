import type { IValidator } from './types/IValidator';
import type { ValidatorSettings } from './types/ValidatorSettings';
import ValidationErrors from './ValidationErrors';
declare class Validator<TRecord extends Record<string, unknown>> implements IValidator<TRecord> {
    private settings;
    constructor(settings: ValidatorSettings<TRecord, keyof TRecord & string>);
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    isValidRecord(record: Partial<TRecord>, additionalValues?: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
}
export default Validator;
