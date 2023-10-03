/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {assertNonNullish} from '../../common/assert';
import type {EventListener, IObservable} from '../../common/types';
import {isEqual} from '../../common/utils';
import type {GridModelListenerArgsByEventName} from '../../grid/models/types/GridModelListenerArgsByEventName';
import type {IGridModel} from '../../grid/models/types/IGridModel';
import ValidationErrors from '../../validation/ValidationErrors';
import type {FormModelListenerArgsByEventName} from '../types/FormModelListenerArgsByEventName';
import type {IFormModel} from '../types/IFormModel';

/**
 * Adapter that allows us to use Grid model record as a form model
 */
class GridToFormUpdate<
  TKey,
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TFilters
> implements IFormModel<TEditableRecord, TRecord>, IObservable<FormModelListenerArgsByEventName<TRecord>>
{
  private onUpdateHandlers: {
    originalCallback: EventListener<FormModelListenerArgsByEventName<TRecord>['update']>;
    wrappedCallback: EventListener<GridModelListenerArgsByEventName<TKey, TRecord>['update']>;
  }[] = [];

  constructor(
    private gridModel: IGridModel<TKey, TEditableRecord, TRecord, TFilters> &
      IObservable<GridModelListenerArgsByEventName<TKey, TRecord>>,
    private id: TKey
  ) {}

  getData(): Promise<Partial<TRecord>>;
  getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
  async getData<TField extends keyof TRecord & string>(
    fields?: TField[]
  ): Promise<Partial<Pick<TRecord, TField>>> {
    const data = await this.gridModel.getRecord(this.id, fields ?? []);
    if (!data) {
      throw new Error('Invalid recordId');
    }

    return data;
  }

  async submit(changes: Partial<TEditableRecord>): Promise<Partial<TRecord>> {
    const record = {...changes};

    const [[, result] = []] = await this.gridModel.update([[this.id, record]]);
    assertNonNullish<object | undefined>(result, 'received unexpected result type from gridModel.update');
    if (result instanceof Error || result instanceof ValidationErrors) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw result;
    }

    return result;
  }

  async isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TEditableRecord & string>> {
    return await this.gridModel.isValidRecord(record, this.id);
  }

  getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[] {
    return this.gridModel.getValidationDependency(fields);
  }

  on<TEventName extends keyof FormModelListenerArgsByEventName<TRecord>>(
    eventName: TEventName,
    cb: EventListener<FormModelListenerArgsByEventName<TRecord>[TEventName]>
  ): this {
    // onChange filters out table events, that do not regard to our record
    const onChange: EventListener<GridModelListenerArgsByEventName<TKey, TRecord>['update']> = (changes) => {
      for (const [key, record] of changes) {
        if (isEqual(key, this.id)) {
          cb(record);
        }
      }
    };

    this.onUpdateHandlers.push({
      originalCallback: cb,
      wrappedCallback: onChange
    });

    this.gridModel.on(eventName, onChange);

    return this;
  }

  off<TEventName extends keyof FormModelListenerArgsByEventName<TRecord>>(
    eventName: TEventName,
    cb: EventListener<FormModelListenerArgsByEventName<TRecord>[TEventName]>
  ): this {
    this.onUpdateHandlers = this.onUpdateHandlers.filter((handler) => {
      if (handler.originalCallback === cb) {
        this.gridModel.off(eventName, handler.wrappedCallback);
        return false;
      }

      return true;
    });

    return this;
  }
}

export default GridToFormUpdate;
