import { DefaultXhr } from '../../common/defaultXhr';
import { IObservable } from '../../common/types';
import ValidationErrors from '../../validation/ValidationErrors';
import Validator from '../../validation/Validator';
import AbstractGridModel from './AbstractGridModel';
import { GridModelListenerArgsByEventName } from './types/GridModelListenerArgsByEventName';
import { GridModelReadParams, IGridModel, GridModelReadResult, GridModelUpdateResult } from './types/IGridModel';
type GridXhrModelParams<TRecord extends Record<string, unknown>> = {
    api: string;
    multipartFormData?: boolean;
    validateOnClient?: boolean;
    validator?: Validator<TRecord>;
    xhr?: DefaultXhr;
};
declare class GridXhrModel<TKey, TRecord extends Record<string, unknown>, TFilters> extends AbstractGridModel<TKey, TRecord, TFilters, GridModelListenerArgsByEventName<TKey, TRecord>> implements IGridModel<TKey, TRecord, TFilters>, IObservable<GridModelListenerArgsByEventName<TKey, TRecord>> {
    private xhr;
    private validator;
    private apiUrl;
    private validateOnClient;
    private multipartFormDataEncoded;
    constructor({ api, validator, xhr, validateOnClient, multipartFormData }: GridXhrModelParams<TRecord>);
    create(record: Partial<TRecord>): Promise<TKey>;
    read<TField extends keyof TRecord & string>(settings: GridModelReadParams<TKey, TRecord, TField, TFilters>): Promise<GridModelReadResult<TKey, TRecord, TField>>;
    getRecord<TField extends keyof TRecord & string>(id: TKey, fields: TField[]): Promise<Pick<TRecord, TField> | null>;
    update(changes: [TKey, Partial<TRecord>][]): Promise<GridModelUpdateResult<TKey, TRecord>>;
    isValidRecord(record: Partial<TRecord>, recordId?: TKey | null): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    private getQueryUrl;
    private readPostRequest;
}
export default GridXhrModel;
