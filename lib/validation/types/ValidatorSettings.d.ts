import type { ArrayWithAtLeastOneElement, OptionalRecord } from '../../common/types';
import type ValidationErrors from '../ValidationErrors';
export type ValidationResult<T, TAsync extends 'async' | 'sync'> = TAsync extends 'sync' ? T : Promise<T>;
export type ValidationFunction<TValue, TAsync extends 'async' | 'sync'> = (value: TValue | null | undefined) => ValidationResult<string | undefined, TAsync>;
export type GroupValidationFunction<TRecord extends Record<string, unknown>, TValidatedField extends keyof TRecord & string, TEditableField extends keyof TRecord & string, TAsync extends 'async' | 'sync'> = (record: OptionalRecord<Pick<TRecord, TValidatedField>>, errors: ValidationErrors<TEditableField>) => ValidationResult<void, TAsync>;
export type GroupValidators<TRecord extends Record<string, unknown>, TEditableField extends keyof TRecord & string, TGroupValidators extends (keyof TRecord & string)[], TAsync extends 'async' | 'sync'> = {
    [TIndex in keyof TGroupValidators]: {
        fields: ArrayWithAtLeastOneElement<TGroupValidators[TIndex]>;
        fn: GroupValidationFunction<TRecord, TGroupValidators[TIndex], TEditableField, TAsync>;
    };
};
export type ValidatorSettings<TRecord extends Record<string, unknown>, TEditableField extends keyof TRecord & string, TAsyncGroupValidators extends (keyof TRecord & string)[], TGroupValidators extends (keyof TRecord & string)[]> = {
    asyncDependencies: ArrayWithAtLeastOneElement<keyof TRecord & string>[];
    asyncGroupValidators: GroupValidators<TRecord, TEditableField, TAsyncGroupValidators, 'async'>;
    asyncValidators: {
        [K in TEditableField]?: ValidationFunction<TRecord[K], 'async'>[];
    };
    groupValidators: GroupValidators<TRecord, TEditableField, TGroupValidators, 'sync'>;
    validators: {
        [K in TEditableField]?: ValidationFunction<TRecord[K], 'sync'>[];
    };
};
