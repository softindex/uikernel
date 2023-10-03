import type { IValidator } from './types/IValidator';
import type { ValidatorSettings } from './types/ValidatorSettings';
import ValidationErrors from './ValidationErrors';
declare class Validator<TRecord extends Record<string, unknown>, TEditable extends keyof TRecord & string> implements IValidator<TRecord, TEditable> {
    private settings;
    constructor(settings: ValidatorSettings<TRecord, TEditable, (keyof TRecord & string)[], (keyof TRecord & string)[]>);
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    isValidRecord(record: Partial<TRecord>, additionalValues?: Partial<TRecord>): Promise<ValidationErrors<TEditable>>;
}
export default Validator;
