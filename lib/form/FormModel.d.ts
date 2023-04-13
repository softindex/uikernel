import { IObservable } from '../common/types';
import ValidationErrors from '../validation/ValidationErrors';
import Validator from '../validation/Validator';
import AbstractFormModel from './AbstractFormModel';
import { FormModelListenerArgsByEventName } from './types/FormModelListenerArgsByEventName';
import { IFormModel } from './types/IFormModel';
declare class FormModel<TRecord extends Record<string, unknown>> extends AbstractFormModel<TRecord, FormModelListenerArgsByEventName<TRecord>> implements IFormModel<TRecord>, IObservable<FormModelListenerArgsByEventName<TRecord>> {
    private validator;
    private data;
    static create<TRecord extends Record<string, unknown>>(defaultValues?: Partial<TRecord>, validator?: Validator<TRecord>): FormModel<TRecord>;
    constructor(validator: Validator<TRecord>, data: Partial<TRecord>);
    getData(): Promise<Partial<TRecord>>;
    getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    submit(changes: Partial<TRecord>): Promise<Partial<TRecord>>;
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
}
export default FormModel;
