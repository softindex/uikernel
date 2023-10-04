import type { DefaultXhr } from '../../common/defaultXhr';
import type { IObservable, OptionalRecord } from '../../common/types';
import type { IValidator } from '../../validation/types/IValidator';
import ValidationErrors from '../../validation/ValidationErrors';
import AbstractGridModel from './AbstractGridModel';
import type { GridModelListenerArgsByEventName } from './types/GridModelListenerArgsByEventName';
import type { GridModelReadParams, IGridModel, GridModelReadResult, GridModelUpdateResult } from './types/IGridModel';
type GridXhrModelParams<TRecord extends Record<string, unknown>, TEditableField extends keyof TRecord & string> = {
    api: string;
    multipartFormData?: boolean;
    validateOnClient?: boolean;
    validator?: IValidator<TRecord, TEditableField>;
    xhr?: DefaultXhr;
};
declare class GridXhrModel<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TFilters> extends AbstractGridModel<TKey, TEditableRecord, TRecord, TFilters, GridModelListenerArgsByEventName<TKey, TRecord>> implements IGridModel<TKey, TEditableRecord, TRecord, TFilters>, IObservable<GridModelListenerArgsByEventName<TKey, TRecord>> {
    private xhr;
    private validator;
    private apiUrl;
    private validateOnClient;
    private multipartFormDataEncoded;
    constructor({ api, validator, xhr, validateOnClient, multipartFormData }: GridXhrModelParams<TRecord, keyof TEditableRecord & string>);
    create(record: OptionalRecord<TEditableRecord>): Promise<TKey>;
    read<TField extends keyof TRecord & string>(settings: GridModelReadParams<TKey, TRecord, TField, TFilters>): Promise<GridModelReadResult<TKey, TRecord, TField>>;
    getRecord<TField extends keyof TRecord & string>(id: TKey, fields: TField[]): Promise<Pick<TRecord, TField> | null>;
    update(changes: [TKey, Partial<TEditableRecord>][]): Promise<GridModelUpdateResult<TKey, TEditableRecord, TRecord>>;
    isValidRecord(record: OptionalRecord<TRecord>, recordId?: TKey | null): Promise<ValidationErrors<keyof TEditableRecord & string>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    private getQueryUrl;
    private readPostRequest;
}
export default GridXhrModel;
