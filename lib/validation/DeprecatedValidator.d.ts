import type { ArrayWithAtLeastOneElement } from '../common/types';
import type { IValidator } from './types/IValidator';
import type { GroupValidationFunction, ValidationFunction } from './types/ValidatorSettings';
import ValidationErrors from './ValidationErrors';
declare class DeprecatedValidator<TRecord extends Record<string, unknown>> implements IValidator<TRecord> {
    static create<TRecord extends Record<string, unknown>>(): DeprecatedValidator<TRecord>;
    private settings;
    field<TField extends keyof TRecord & string>(field: TField, ...validationFunctions: ArrayWithAtLeastOneElement<ValidationFunction<TRecord[TField], 'sync'>>): this;
    fields(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>, groupValidationFunction: GroupValidationFunction<TRecord, keyof TRecord & string, 'sync'>): this;
    asyncDependence(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>): this;
    asyncField<TField extends keyof TRecord & string>(field: TField, validationFunction: ValidationFunction<TRecord[TField], 'async'>): this;
    asyncFields(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>, groupValidationFunction: GroupValidationFunction<TRecord, keyof TRecord & string, 'async'>): this;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    isValidRecord(record: Partial<TRecord>, additionalValues?: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
}
export default DeprecatedValidator;
