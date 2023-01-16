/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventsModel from '../../common/Events';
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
  TRecord extends {},
  TFilters,
  TListenerArgsByEventName extends Record<string, unknown[]>
> implements IGridModel<TKey, TRecord, TFilters>, IObservable<TListenerArgsByEventName>
{
  private eventsModel = new EventsModel<TListenerArgsByEventName>();

  async create(_record: Partial<TRecord>): Promise<TKey> {
    throw Error('method "create" not implemented yet');
  }

  async read(
    _params: IGridModelReadParams<TKey, TRecord, TFilters>
  ): Promise<IGridModelReadResult<TKey, TRecord>> {
    return {
      records: []
    };
  }

  async getRecord(_id: TKey, _fields: (keyof TRecord & string)[]): Promise<Partial<TRecord>> {
    return {};
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
