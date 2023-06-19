import type { ArrayWithAtLeastOneElement } from '../common/types';
import type { IValidator } from './types/IValidator';
import type { GroupValidationFunction, ValidationFunction } from './types/ValidatorSettings';
declare class ValidatorBuilder<TRecord extends Record<string, unknown>, TEditableField extends keyof TRecord & string = keyof TRecord & string> {
    static createEmptyValidator<TRecord extends Record<string, unknown>>(): IValidator<TRecord>;
    private settings;
    field<TField extends TEditableField>(field: TField, ...validationFunctions: ArrayWithAtLeastOneElement<ValidationFunction<TRecord[TField], 'sync'>>): this;
    fields(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>, groupValidationFunction: GroupValidationFunction<TRecord, TEditableField, 'sync'>): this;
    asyncDependence(fields: ArrayWithAtLeastOneElement<TEditableField>): this;
    asyncField<TField extends TEditableField>(field: TField, validationFunction: ValidationFunction<TRecord[TField], 'async'>): this;
    asyncFields(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>, groupValidationFunction: GroupValidationFunction<TRecord, TEditableField, 'async'>): this;
    build(): IValidator<TRecord>;
}
export default ValidatorBuilder;
