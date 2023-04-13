export interface RegExpValidation {
    (regExp: RegExp, error?: string): (value: unknown) => string | undefined;
    notNull: (regExp: RegExp, error?: string) => (value: unknown) => string | undefined;
}
declare const validator: RegExpValidation;
export default validator;
