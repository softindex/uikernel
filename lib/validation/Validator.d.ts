import { ArrayWithAtLeastOneElement } from '../common/types';
import ValidationErrors from './ValidationErrors';
type ValidationResult<T, TAsync extends 'async' | 'sync'> = TAsync extends 'sync' ? T : Promise<T>;
type ValidationFunction<TValue, TAsync extends 'async' | 'sync'> = (value: TValue | undefined) => ValidationResult<string | undefined, TAsync>;
type GroupValidationFunction<TRecord extends Record<string, unknown>, TAsync extends 'async' | 'sync'> = (record: Partial<TRecord>, errors: ValidationErrors<keyof TRecord & string>) => ValidationResult<void, TAsync>;
export interface IValidator<TRecord> {
    getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];
    isValidRecord: (record: Partial<TRecord>) => Promise<ValidationErrors<keyof TRecord & string>>;
}
declare class Validator<TRecord extends Record<string, unknown>> implements IValidator<TRecord> {
    static create<TRecord extends Record<string, unknown>>(): Validator<TRecord>;
    private settings;
    field<TField extends keyof TRecord & string>(field: TField, ...validationFunctions: ArrayWithAtLeastOneElement<ValidationFunction<TRecord[TField], 'sync'>>): this;
    fields(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>, groupValidationFunction: GroupValidationFunction<TRecord, 'sync'>): this;
    asyncDependence(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>): this;
    asyncField<TField extends keyof TRecord & string>(field: TField, validationFunction: ValidationFunction<TRecord[TField], 'async'>): this;
    asyncFields(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>, groupValidationFunction: GroupValidationFunction<TRecord, 'async'>): this;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    isValidRecord(record: Partial<TRecord>, additionalValues?: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
}
export default Validator;
