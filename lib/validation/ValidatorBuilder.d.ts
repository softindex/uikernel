import type { ArrayWithAtLeastOneElement } from '../common/types';
import type { IValidator } from './types/IValidator';
import type { GroupValidationFunction, ValidationFunction } from './types/ValidatorSettings';
declare class ValidatorBuilder<TRecord extends Record<string, unknown>, TEditableField extends keyof TRecord & string, TAsyncGroupValidators extends (keyof TRecord & string)[] = [], TGroupValidators extends (keyof TRecord & string)[] = []> {
    static createEmptyValidator<TRecord extends Record<string, unknown>, TEditableField extends keyof TRecord & string>(): IValidator<TRecord, TEditableField>;
    private settings;
    field<TField extends TEditableField>(field: TField, ...validationFunctions: ArrayWithAtLeastOneElement<ValidationFunction<TRecord[TField], 'sync'>>): this;
    fields<TField extends keyof TRecord & string>(fields: ArrayWithAtLeastOneElement<TField>, groupValidationFunction: GroupValidationFunction<TRecord, TField, TEditableField, 'sync'>): ValidatorBuilder<TRecord, TEditableField, TAsyncGroupValidators, [...TGroupValidators, TField]>;
    asyncDependence(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>): this;
    asyncField<TField extends TEditableField>(field: TField, validationFunction: ValidationFunction<TRecord[TField], 'async'>): this;
    asyncFields<TField extends keyof TRecord & string>(fields: ArrayWithAtLeastOneElement<TField>, groupValidationFunction: GroupValidationFunction<TRecord, TField, TEditableField, 'async'>): ValidatorBuilder<TRecord, TEditableField, [...TAsyncGroupValidators, TField], TGroupValidators>;
    build(): IValidator<TRecord, TEditableField>;
}
export default ValidatorBuilder;
