import FormService from './FormService';
import type { FormModelListenerArgsByEventName } from './types/FormModelListenerArgsByEventName';
import type { FormServiceEmptyState, FormServiceParams, FormServiceState } from './types/IFormService';
export type UseFormResult<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string> = [
    FormServiceEmptyState<TRecord, TAvailableField> | FormServiceState<TRecord, TAvailableField>,
    FormService<TRecord, TAvailableField>
];
declare function useForm<TRecord extends Record<string, unknown>, TAvailableField extends keyof TRecord & string>(settings: FormServiceParams<TRecord, TAvailableField, FormModelListenerArgsByEventName<TRecord>>, onError?: (error: Error) => void): UseFormResult<TRecord, TAvailableField>;
export default useForm;
