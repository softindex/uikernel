import type { XOR } from 'ts-essentials';
import type { ValidationErrorsToJsonResult, ValidationJSONError } from '../../../validation/ValidationErrors';
import type { GridModelReadResult } from './IGridModel';
export type JsonGridApiResult<TKey, TRecord extends Record<string, unknown>, TEditableField extends keyof TRecord & string, TField extends keyof TRecord & string = keyof TRecord & string> = {
    create: XOR<{
        data: TKey;
        error: null;
    }, {
        data: null;
        error: ValidationErrorsToJsonResult<TEditableField>;
    }>;
    getRecord: Pick<TRecord, TField> | null;
    read: GridModelReadResult<TKey, TRecord, TField>;
    update: {
        changes: [TKey, Partial<TRecord>][];
        errors: [TKey, ValidationJSONError][];
        validation: [TKey, ValidationErrorsToJsonResult<TEditableField>][];
    };
    validate: ValidationErrorsToJsonResult<TEditableField>;
};
