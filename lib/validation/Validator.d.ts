import type { OptionalRecord } from '../common/types';
import type { IValidator } from './types/IValidator';
import type { ValidatorSettings } from './types/ValidatorSettings';
import ValidationErrors from './ValidationErrors';
declare class Validator<TRecord extends Record<string, unknown>, TEditable extends keyof TRecord & string, TAsyncGroupValidators extends (keyof TRecord & string)[] = [], TGroupValidators extends (keyof TRecord & string)[] = []> implements IValidator<TRecord, TEditable> {
    private settings;
    constructor(settings: ValidatorSettings<TRecord, TEditable, TAsyncGroupValidators, TGroupValidators>);
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    isValidRecord(record: OptionalRecord<TRecord>, additionalValues?: Partial<TRecord>): Promise<ValidationErrors<TEditable>>;
}
export default Validator;
