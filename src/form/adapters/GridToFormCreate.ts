/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pick from 'lodash/pick';
import type {IObservable} from '../../common/types';
import type {IGridModel} from '../../grid/models/types/IGridModel';
import type ValidationErrors from '../../validation/ValidationErrors';
import type {IFormModel} from '../types/IFormModel';

/**
 * Adapter allows to use Grid model as a model for new form record creation
 */
class GridToFormCreate<
  TKey,
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TFilters
> implements IFormModel<TEditableRecord, TRecord>, IObservable<Record<string, unknown[]>>
{
  constructor(
    private gridModel: IGridModel<TKey, TEditableRecord, TRecord, TFilters>,
    private initialData: Partial<TRecord> = {},
    private onSubmit?: (recordId: TKey) => void
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
    const id = await this.gridModel.create(changes);
    this.onSubmit?.(id);

    return changes;
  }

  async isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TEditableRecord & string>> {
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
