type Limit = number | null | undefined;
export interface FloatValidation {
    (min: Limit, max: Limit, error?: string): (value: unknown) => string | undefined;
    notNull: (min: Limit, max: Limit, error?: string) => (value: unknown) => string | undefined;
}
declare const validator: FloatValidation;
export default validator;
