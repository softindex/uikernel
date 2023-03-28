/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {assertNonNullish} from '../../common/assert';
import EventsModel from '../../common/EventsModel';
import {EventListener, IObservable} from '../../common/types';
import {isEqual} from '../../common/utils';
import {GridModelListenerArgsByEventName} from '../../grid/models/types/GridModelListenerArgsByEventName';
import {IGridModel} from '../../grid/models/types/IGridModel';
import ValidationErrors from '../../validation/ValidationErrors';
import {IFormModel} from '../types/IFormModel';

type RequiredGridModelListenerArgsByEventName<TKey, TRecord extends Record<string, unknown>> = Pick<
  GridModelListenerArgsByEventName<TKey, TRecord>,
  'update'
>;

/**
 * Adapter that allows us to use Grid model record as a form model
 */
class GridToFormUpdate<
  TKey,
  TRecord extends Record<string, unknown>,
  TListenerArgsByEventName extends {
    [x: string]: unknown[];
    update: [Partial<TRecord>];
  },
  TFilters
> implements IFormModel<TRecord>, IObservable<TListenerArgsByEventName>
{
  private eventsModel = new EventsModel<TListenerArgsByEventName>();
  private onUpdateHandlers: {
    originalCallback: EventListener<TListenerArgsByEventName['update']>;
    wrappedCallback: EventListener<RequiredGridModelListenerArgsByEventName<TKey, TRecord>['update']>;
  }[] = [];

  constructor(
    private gridModel: IGridModel<TKey, TRecord, TFilters> &
      IObservable<RequiredGridModelListenerArgsByEventName<TKey, TRecord>>,
    private id: TKey
  ) {}

  getData(): Promise<Partial<TRecord>>;
  getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
  async getData<TField extends keyof TRecord & string>(
    fields?: TField[]
  ): Promise<Partial<Pick<TRecord, TField>>> {
    return await this.gridModel.getRecord(this.id, fields ?? []);
  }

  async submit(changes: Partial<TRecord>): Promise<Partial<TRecord>> {
    const record = {...changes};

    const [[, result] = []] = await this.gridModel.update([[this.id, record]]);
    assertNonNullish<object | undefined>(result, 'received unexpected result type from gridModel.update');
    if (result instanceof Error || result instanceof ValidationErrors) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw result;
    }

    return result;
  }

  async isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>> {
    return await this.gridModel.isValidRecord(record, this.id);
  }

  getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[] {
    return this.gridModel.getValidationDependency(fields);
  }

  on<TEventName extends keyof TListenerArgsByEventName & string>(
    eventName: TEventName,
    cb: EventListener<TListenerArgsByEventName[TEventName]>
  ): this {
    if (eventName !== 'update') {
      this.eventsModel.on(eventName, cb);
      return this;
    }

    const callback = cb as EventListener<TListenerArgsByEventName['update']>;

    // onChange filters out table events, that do not regard to our record
    const onChange: EventListener<RequiredGridModelListenerArgsByEventName<TKey, TRecord>['update']> = (
      changes
    ) => {
      for (const [key, record] of changes) {
        if (isEqual(key, this.id)) {
          callback(record);
        }
      }
    };

    this.onUpdateHandlers.push({
      originalCallback: callback,
      wrappedCallback: onChange
    });

    this.gridModel.on('update', onChange);

    return this;
  }

  off<TEventName extends keyof TListenerArgsByEventName & string>(
    eventName: TEventName,
    cb: EventListener<TListenerArgsByEventName[TEventName]>
  ): this {
    if (eventName !== 'update') {
      this.eventsModel.off(eventName, cb);
      return this;
    }

    this.onUpdateHandlers = this.onUpdateHandlers.filter((handler) => {
      if (handler.originalCallback === cb) {
        this.gridModel.off('update', handler.wrappedCallback);
        return false;
      }

      return true;
    });

    return this;
  }
}

export default GridToFormUpdate;
