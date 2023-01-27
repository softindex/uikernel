/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventsModel from '../../common/EventsModel';
import {EventListener, IObservable} from '../../common/types';
import ValidationErrors from '../../validation/ValidationErrors';
import {
  IGridModelReadParams,
  IGridModel,
  IGridModelReadResult,
  IGridModelUpdateResult
} from './types/IGridModel';

/**
 * Grid model abstraction
 */
abstract class AbstractGridModel<
  TKey,
  TRecord extends Record<string, unknown>,
  TFilters,
  TListenerArgsByEventName extends Record<string, unknown[]>
> implements IGridModel<TKey, TRecord, TFilters>, IObservable<TListenerArgsByEventName>
{
  private eventsModel = new EventsModel<TListenerArgsByEventName>();

  async create(_record: Partial<TRecord>): Promise<TKey> {
    throw Error('method "create" not implemented yet');
  }

  async read<TField extends keyof TRecord & string>(
    _params: IGridModelReadParams<TKey, TRecord, TField, TFilters>
  ): Promise<IGridModelReadResult<TKey, TRecord, TField>> {
    return {
      records: []
    };
  }

  async getRecord<TField extends keyof TRecord & string>(
    _id: TKey,
    _fields: TField[]
  ): Promise<Pick<TRecord, TField>> {
    throw new Error('method getRecord not implemented yet');
  }

  async update(_changes: [TKey, Partial<TRecord>][]): Promise<IGridModelUpdateResult<TKey, TRecord>> {
    return [];
  }

  async isValidRecord(
    _record: Partial<TRecord>,
    _recordId?: TKey | null
  ): Promise<ValidationErrors<keyof TRecord & string>> {
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
