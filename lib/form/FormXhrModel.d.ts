import type { DefaultXhr } from '../common/defaultXhr';
import EventsModel from '../common/EventsModel';
import type { EventListener, IObservable } from '../common/types';
import type { IValidator } from '../validation/types/IValidator';
import ValidationErrors from '../validation/ValidationErrors';
import type { FormModelListenerArgsByEventName } from './types/FormModelListenerArgsByEventName';
import type { IFormModel } from './types/IFormModel';
type FormXhrModelParams<TRecord extends Record<string, unknown>> = {
    api: string;
    eventsModel?: EventsModel<FormModelListenerArgsByEventName<TRecord>>;
    multipartFormData?: boolean;
    validateOnClient?: boolean;
    validator?: IValidator<TRecord, keyof TRecord & string>;
    xhr?: DefaultXhr;
};
declare class FormXhrModel<TRecord extends Record<string, unknown>> implements IFormModel<TRecord>, IObservable<FormModelListenerArgsByEventName<TRecord>> {
    private multipartFormDataEncoded;
    private validator;
    private validateOnClient;
    private xhr;
    private apiURL;
    private eventsModel;
    constructor(settings: FormXhrModelParams<TRecord>);
    getData(): Promise<Partial<TRecord>>;
    getData<TField extends keyof TRecord & string>(fields: TField[] | readonly TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    submit(record: Partial<TRecord>): Promise<Partial<TRecord>>;
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    on<TEventName extends keyof FormModelListenerArgsByEventName<TRecord>>(eventName: TEventName, cb: EventListener<FormModelListenerArgsByEventName<TRecord>[TEventName]>): this;
    off<TEventName extends keyof FormModelListenerArgsByEventName<TRecord>>(eventName: TEventName, cb: EventListener<FormModelListenerArgsByEventName<TRecord>[TEventName]>): this;
    removeAllListeners(eventName: keyof FormModelListenerArgsByEventName<TRecord>): void;
    private getDataPostRequest;
}
export default FormXhrModel;
