import type { IObservable } from '../common/types';
import type { IValidator } from '../validation/types/IValidator';
import type ValidationErrors from '../validation/ValidationErrors';
import AbstractFormModel from './AbstractFormModel';
import type { FormModelListenerArgsByEventName } from './types/FormModelListenerArgsByEventName';
import type { IFormModel } from './types/IFormModel';
declare class FormModel<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord> extends AbstractFormModel<TEditableRecord, TRecord, FormModelListenerArgsByEventName<TRecord>> implements IFormModel<TEditableRecord, TRecord>, IObservable<FormModelListenerArgsByEventName<TRecord>> {
    private validator;
    private data;
    static create<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord>(defaultValues?: Partial<TRecord>, validator?: IValidator<TRecord, keyof TEditableRecord & string>): FormModel<TEditableRecord, TRecord>;
    constructor(validator: IValidator<TRecord, keyof TEditableRecord & string>, data: Partial<TRecord>);
    getData(): Promise<Partial<TRecord>>;
    getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    submit(changes: Partial<TRecord>): Promise<Partial<TRecord>>;
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TEditableRecord & string>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
}
export default FormModel;
