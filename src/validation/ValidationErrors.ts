/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface ValidationJSONError {
  [extra: string]: unknown;
  message: string;
}

export type ValidationErrorsToJsonResult<TField extends string> = Record<TField, ValidationJSONError[]>;

class ValidationErrors<TField extends string> {
  /**
   * Convert JSON to ValidationErrors object
   */
  static createFromJSON<TField extends string>(
    jsonObject: Partial<Record<TField, (ValidationJSONError | string)[]>>
  ): ValidationErrors<TField> {
    const validationErrors = new ValidationErrors<TField>();
    for (const key in jsonObject) {
      if (!Object.prototype.hasOwnProperty.call(jsonObject, key)) {
        continue;
      }

      const value = jsonObject[key];
      if (value) {
        value.forEach((errMessage) => validationErrors.add(key, errMessage));
      }
    }

    return validationErrors;
  }

  /**
   * Create ValidationErrors object with one error
   */
  static createWithError<TField extends string>(
    field: TField,
    error: ValidationJSONError | string
  ): ValidationErrors<TField> {
    const validationErrors = new ValidationErrors<TField>();
    validationErrors.add(field, error);
    return validationErrors;
  }

  static merge<TField1 extends string, TField2 extends string>(
    validationErrors1: ValidationErrors<TField1>,
    validationErrors2: ValidationErrors<TField2>
  ): ValidationErrors<TField1 | TField2> {
    // TODO Need deep merge
    return ValidationErrors.createFromJSON({...validationErrors1.toJSON(), ...validationErrors2.toJSON()});
  }

  private fields = new Map<TField, ValidationJSONError[]>();

  /**
   * Add an error
   */
  add(field: TField, error: ValidationJSONError | string): this {
    const transformedError = this.formErrorValue(error);
    const fieldErrors = this.fields.get(field) ?? [];
    if (!fieldErrors.includes(transformedError)) {
      fieldErrors.push(transformedError);
    }

    this.fields.set(field, fieldErrors);
    return this;
  }

  /**
   * Field has error flag
   */
  hasError(field: TField): boolean {
    return this.fields.has(field);
  }

  /**
   * Get field errors
   */
  getFieldErrors(field: TField): ValidationJSONError[] {
    return this.fields.get(field) ?? [];
  }

  /**
   * Get field errors message
   */
  getFieldErrorMessages(field: TField): string[] {
    const fieldErrors = this.fields.get(field);
    if (fieldErrors) {
      return fieldErrors.map((error) => error.message);
    }

    return [];
  }

  /**
   * Get field names array, that contain errors
   */
  getFailedFields(): TField[] {
    return [...this.fields.keys()];
  }

  /**
   * Errors absence check
   */
  isEmpty(): boolean {
    return this.fields.size === 0;
  }

  /**
   * Clear specific field errors
   */
  clearField(field: TField): this {
    this.fields.delete(field);
    return this;
  }

  /**
   * Clear errors list
   */
  clear(): this {
    this.fields = new Map();
    return this;
  }

  /**
   * Convert errors to JSON
   *
   * @return {{[string]: Array<string>}}
   */
  toJSON(): ValidationErrorsToJsonResult<TField> {
    const json = {} as unknown as ValidationErrorsToJsonResult<TField>;
    for (const [key, value] of this.fields) {
      json[key] = value;
    }

    return json;
  }

  /**
   * Clone object
   */
  clone(): ValidationErrors<TField> {
    return ValidationErrors.createFromJSON(this.toJSON());
  }

  merge<T extends TField>(validationErrors: ValidationErrors<T>): this {
    for (const [field, newErrors] of validationErrors.getErrors()) {
      const errors = this.fields.get(field) ?? [];
      errors.push(...newErrors);

      this.fields.set(field, errors);
    }

    return this;
  }

  /**
   * Get errors iterator
   */
  getErrors(): Map<TField, ValidationJSONError[]> {
    return this.fields;
  }

  private formErrorValue(error: string | {message: string}): {message: string} {
    if (typeof error === 'string') {
      return {
        message: error
      };
    }

    if (!error.message) {
      throw new Error('Invalid error value. Error must be string or object with "message" property.');
    }

    return error;
  }
}

export default ValidationErrors;
