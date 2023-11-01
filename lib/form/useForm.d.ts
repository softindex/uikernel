import FormService from './FormService';
import type { FormModelListenerArgsByEventName } from './types/FormModelListenerArgsByEventName';
import type { FormServiceEmptyState, FormServiceParams, FormServiceState } from './types/IFormService';
export type UseFormResult<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TAvailableField extends keyof TRecord & string> = [
    (FormServiceEmptyState<TRecord, TAvailableField, keyof TEditableRecord & string> | FormServiceState<TRecord, TAvailableField, keyof TEditableRecord & string>),
    FormService<TEditableRecord, TRecord, TAvailableField>
];
declare function useForm<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TAvailableField extends keyof TRecord & string>(settings: FormServiceParams<TEditableRecord, TRecord, TAvailableField, FormModelListenerArgsByEventName<TRecord>>, onError?: (error: Error) => void): UseFormResult<TEditableRecord, TRecord, TAvailableField>;
export default useForm;
