type Limit = Date | number | string | null | undefined;
export interface DateValidation {
    (min: Limit, max: Limit, error?: string): (value: unknown) => string | undefined;
    notNull: (min: Limit, max: Limit, error?: string) => (value: unknown) => string | undefined;
}
declare const validator: DateValidation;
export default validator;
