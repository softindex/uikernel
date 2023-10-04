import type { DefaultXhr } from './defaultXhr';
export interface VariableGetter {
    (key: 'xhr'): DefaultXhr;
    (key: string): unknown;
}
export interface VariableSetter {
    (key: 'xhr', value: DefaultXhr): void;
    (key: string, value: unknown): void;
}
declare const variables: Readonly<{
    get: VariableGetter;
    set: VariableSetter;
}>;
export default variables;
