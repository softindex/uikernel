import type { IObservable } from '../common/types';
import type { IValidator } from '../validation/types/IValidator';
import type ValidationErrors from '../validation/ValidationErrors';
import AbstractFormModel from './AbstractFormModel';
import type { FormModelListenerArgsByEventName } from './types/FormModelListenerArgsByEventName';
import type { IFormModel } from './types/IFormModel';
declare class FormModel<TRecord extends Record<string, unknown>> extends AbstractFormModel<TRecord, FormModelListenerArgsByEventName<TRecord>> implements IFormModel<TRecord>, IObservable<FormModelListenerArgsByEventName<TRecord>> {
    private validator;
    private data;
    static create<TRecord extends Record<string, unknown>>(defaultValues?: Partial<TRecord>, validator?: IValidator<TRecord, keyof TRecord & string>): FormModel<TRecord>;
    constructor(validator: IValidator<TRecord, keyof TRecord & string>, data: Partial<TRecord>);
    getData(): Promise<Partial<TRecord>>;
    getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    submit(changes: Partial<TRecord>): Promise<Partial<TRecord>>;
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
}
export default FormModel;
