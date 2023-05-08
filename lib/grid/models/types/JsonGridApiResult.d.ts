import { XOR } from 'ts-essentials';
import { ValidationErrorsToJsonResult, ValidationJSONError } from '../../../validation/ValidationErrors';
import { GridModelReadResult } from './IGridModel';
export type JsonGridApiResult<TKey, TRecord extends Record<string, unknown>, TField extends keyof TRecord & string = keyof TRecord & string> = {
    create: XOR<{
        data: TKey;
        error: null;
    }, {
        data: null;
        error: ValidationErrorsToJsonResult<keyof TRecord & string>;
    }>;
    getRecord: Pick<TRecord, TField>;
    read: GridModelReadResult<TKey, TRecord, TField>;
    update: {
        changes: [TKey, Partial<TRecord>][];
        errors: [TKey, ValidationJSONError][];
        validation: [TKey, ValidationErrorsToJsonResult<keyof TRecord & string>][];
    };
    validate: ValidationErrorsToJsonResult<keyof TRecord & string>;
};
