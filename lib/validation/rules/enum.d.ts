export interface EnumValidation {
    (variants: unknown[], error?: string): (value: unknown) => string | undefined;
    notNull: (variants: unknown[], error?: string) => (value: unknown) => string | undefined;
}
declare const validator: EnumValidation;
export default validator;
