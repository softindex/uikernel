import type { OptionalRecord } from '../../common/types';
import type ValidationErrors from '../ValidationErrors';
export interface IValidator<TRecord, TEditableField extends keyof TRecord & string> {
    getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];
    isValidRecord: (record: OptionalRecord<TRecord>) => Promise<ValidationErrors<TEditableField>>;
}
