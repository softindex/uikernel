export interface BooleanValidation {
    (error?: string): (value: unknown) => string | undefined;
    notNull: (error?: string) => (value: unknown) => string | undefined;
}
declare const validator: BooleanValidation;
export default validator;
