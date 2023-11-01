type Limit = number | null | undefined;
export interface IntegerValidation {
    (min: Limit, max: Limit, error?: string): (value: unknown) => string | undefined;
    notNull: (min: Limit, max: Limit, error?: string) => (value: unknown) => string | undefined;
}
declare const validator: IntegerValidation;
export default validator;
