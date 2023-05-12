export interface ValidationJSONError {
    [extra: string]: unknown;
    message: string;
}
export type ValidationErrorsToJsonResult<TField extends string> = Record<TField, ValidationJSONError[]>;
declare class ValidationErrors<TField extends string> {
    static createFromJSON<TField extends string>(jsonObject: Partial<Record<TField, (ValidationJSONError | string)[]>>): ValidationErrors<TField>;
    static createWithError<TField extends string>(field: TField, error: ValidationJSONError | string): ValidationErrors<TField>;
    static merge<TField1 extends string, TField2 extends string>(validationErrors1: ValidationErrors<TField1>, validationErrors2: ValidationErrors<TField2>): ValidationErrors<TField1 | TField2>;
    private fields;
    add(field: TField, error: ValidationJSONError | string): this;
    hasError(field: TField): boolean;
    getFieldErrors(field: TField): ValidationJSONError[];
    getFieldErrorMessages(field: TField): string[];
    getFailedFields(): TField[];
    isEmpty(): boolean;
    clearField(field: TField): this;
    clear(): this;
    toJSON(): ValidationErrorsToJsonResult<TField>;
    clone(): ValidationErrors<TField>;
    merge<T extends TField>(validationErrors: ValidationErrors<T>): this;
    getErrors(): Map<TField, ValidationJSONError[]>;
    private formErrorValue;
}
export default ValidationErrors;
