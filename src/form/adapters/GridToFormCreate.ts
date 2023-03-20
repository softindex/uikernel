/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pick from 'lodash/pick';
import {IObservable} from '../../common/types';
import {IGridModel} from '../../grid/models/types/IGridModel';
import ValidationErrors from '../../validation/ValidationErrors';
import {IFormModel} from '../types/IFormModel';

/**
 * Adapter allows to use Grid model as a model for new form record creation
 */
class GridToFormCreate<TKey, TRecord extends Record<string, unknown>, TFilters>
  implements IFormModel<TRecord>, IObservable<Record<string, unknown[]>>
{
  constructor(
    private gridModel: IGridModel<TKey, TRecord, TFilters> & IObservable<Record<string, unknown[]>>,
    private initialData: Partial<TRecord> = {}
  ) {}

  getData(): Promise<Partial<TRecord>>;
  getData<TField extends keyof TRecord & string>(
    fields: TField[] | readonly TField[]
  ): Promise<Partial<Pick<TRecord, TField>>>;
  async getData<TField extends keyof TRecord & string>(
    fields?: TField[] | readonly TField[]
  ): Promise<Partial<Pick<TRecord, TField>>> {
    if (fields?.length) {
      return pick(this.initialData, fields);
    }

    return this.initialData;
  }

  async submit(changes: Partial<TRecord>): Promise<Partial<TRecord>> {
    await this.gridModel.create(changes);
    return changes;
  }

  async isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>> {
    return await this.gridModel.isValidRecord(record);
  }

  getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[] {
    return this.gridModel.getValidationDependency(fields);
  }

  on(): this {
    return this;
  }

  off(): this {
    return this;
  }
}

export default GridToFormCreate;
