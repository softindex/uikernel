/* eslint-disable @typescript-eslint/method-signature-style */
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../../validation/ValidationErrors';

export interface IFormModel<TRecord extends {}> {
  /**
   * Get data
   */
  getData(): Promise<Partial<TRecord>>;
  getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
  getData<TField extends keyof TRecord & string>(fields?: TField[]): Promise<Partial<Pick<TRecord, TField>>>;

  /**
   * Get all dependent fields, that are required for validation
   */
  getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];

  /**
   * Validation check
   */
  isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;

  /**
   * Process form data
   */
  submit(changes: Partial<TRecord>): Promise<Partial<TRecord>>;
}
