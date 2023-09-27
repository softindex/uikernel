export interface SetValidation {
    (variants: unknown[], error?: string): (values: unknown | null | undefined) => string | undefined;
    notNull: (variants: unknown[], error?: string) => (values: unknown | null | undefined) => string | undefined;
}
declare const validator: SetValidation;
export default validator;
