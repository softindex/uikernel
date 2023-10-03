import type { ArrayWithAtLeastOneElement } from '../common/types';
import type { IValidator } from './types/IValidator';
import type { GroupValidationFunction, ValidationFunction } from './types/ValidatorSettings';
import ValidationErrors from './ValidationErrors';
declare class DeprecatedValidator<TRecord extends Record<string, unknown>, TAsyncGroupValidators extends (keyof TRecord & string)[] = [], TGroupValidators extends (keyof TRecord & string)[] = []> implements IValidator<TRecord, keyof TRecord & string> {
    static create<TRecord extends Record<string, unknown>>(): DeprecatedValidator<TRecord>;
    private settings;
    field<TField extends keyof TRecord & string>(field: TField, ...validationFunctions: ArrayWithAtLeastOneElement<ValidationFunction<TRecord[TField], 'sync'>>): this;
    fields<TField extends keyof TRecord & string>(fields: ArrayWithAtLeastOneElement<TField>, groupValidationFunction: GroupValidationFunction<Pick<TRecord, TField>, TField, 'sync'>): DeprecatedValidator<TRecord, TAsyncGroupValidators, [...TGroupValidators, TField]>;
    asyncDependence(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>): this;
    asyncField<TField extends keyof TRecord & string>(field: TField, validationFunction: ValidationFunction<TRecord[TField], 'async'>): this;
    asyncFields<TField extends keyof TRecord & string>(fields: ArrayWithAtLeastOneElement<TField>, groupValidationFunction: GroupValidationFunction<Pick<TRecord, TField>, TField & keyof TRecord & string, 'async'>): DeprecatedValidator<TRecord, [...TAsyncGroupValidators, TField], TGroupValidators>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    isValidRecord(record: Partial<TRecord>, additionalValues?: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
}
export default DeprecatedValidator;
