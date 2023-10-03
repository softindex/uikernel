/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventsModel from '../../common/EventsModel';
import type {EventListener, IObservable, OptionalRecord} from '../../common/types';
import ValidationErrors from '../../validation/ValidationErrors';
import type {
  GridModelReadParams,
  IGridModel,
  GridModelReadResult,
  GridModelUpdateResult
} from './types/IGridModel';

/**
 * Grid model abstraction
 */
abstract class AbstractGridModel<
  TKey,
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TFilters,
  TListenerArgsByEventName extends Record<string, unknown[]>
> implements IGridModel<TKey, TEditableRecord, TRecord, TFilters>, IObservable<TListenerArgsByEventName>
{
  private eventsModel = new EventsModel<TListenerArgsByEventName>();

  async create(_record: OptionalRecord<TEditableRecord>): Promise<TKey> {
    throw Error('method "create" not implemented yet');
  }

  async read<TField extends keyof TRecord & string>(
    _params: GridModelReadParams<TKey, TRecord, TField, TFilters>
  ): Promise<GridModelReadResult<TKey, TRecord, TField>> {
    return {
      records: []
    };
  }

  async getRecord<TField extends keyof TRecord & string>(
    _id: TKey,
    _fields: TField[]
  ): Promise<Pick<TRecord, TField> | null> {
    throw new Error('method getRecord not implemented yet');
  }

  async update(
    _changes: [TKey, Partial<TEditableRecord>][]
  ): Promise<GridModelUpdateResult<TKey, TEditableRecord, TRecord>> {
    return [];
  }

  async isValidRecord(
    _record: OptionalRecord<TRecord>,
    _recordId?: TKey | null
  ): Promise<ValidationErrors<keyof TEditableRecord & string>> {
    return new ValidationErrors();
  }

  getValidationDependency(_fields: (keyof TRecord & string)[]): (keyof TRecord & string)[] {
    return [];
  }

  on<TEventName extends keyof TListenerArgsByEventName & string>(
    eventName: TEventName,
    cb: EventListener<TListenerArgsByEventName[TEventName]>
  ): this {
    this.eventsModel.on(eventName, cb);
    return this;
  }

  off<TEventName extends keyof TListenerArgsByEventName & string>(
    eventName: TEventName,
    cb: EventListener<TListenerArgsByEventName[TEventName]>
  ): this {
    this.eventsModel.off(eventName, cb);
    return this;
  }

  protected trigger<TEventName extends keyof TListenerArgsByEventName & string>(
    eventName: TEventName,
    ...args: TListenerArgsByEventName[TEventName]
  ): void {
    this.eventsModel.trigger(eventName, ...args);
  }
}

export default AbstractGridModel;
