import type { XOR } from 'ts-essentials';
import type { ValidationErrorsToJsonResult } from '../../validation/ValidationErrors';
export type JsonFormApiResult<TRecord> = {
    getData: Partial<Pick<TRecord, keyof TRecord & string>>;
    getValidationDependency: (keyof TRecord & string)[];
    submit: XOR<{
        data: Partial<TRecord>;
        error: null;
    }, {
        data: null;
        error: ValidationErrorsToJsonResult<keyof TRecord & string>;
    }>;
    validate: ValidationErrorsToJsonResult<keyof TRecord & string>;
};
