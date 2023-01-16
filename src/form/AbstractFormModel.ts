/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventsModel from '../common/Events';
import {IObservable, EventListener} from '../common/types';
import ValidationErrors from '../validation/ValidationErrors';
import {IFormModel} from './types/IFormModel';

abstract class AbstractFormModel<
  TRecord extends {},
  TListenerArgsByEventName extends Record<string, unknown[]>
> implements IFormModel<TRecord>, IObservable<TListenerArgsByEventName>
{
  protected eventsModel = new EventsModel<TListenerArgsByEventName>();

  /**
   * Get data
   */
  getData(): Promise<Partial<TRecord>>;
  getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
  getData<TField extends keyof TRecord & string>(
    _fields?: TField[]
  ): Promise<Partial<Pick<TRecord, TField>>> {
    return Promise.resolve({});
  }

  /**
   * Process form data
   */
  submit(_record: Partial<TRecord>): Promise<Partial<TRecord>> {
    return Promise.resolve({});
  }

  /**
   * Record validity check
   */
  isValidRecord(_record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>> {
    return Promise.resolve(new ValidationErrors());
  }

  /**
   * Get all dependent fields, that are required for validation
   */
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
    event: TEventName,
    ...args: TListenerArgsByEventName[TEventName]
  ): void {
    return this.eventsModel.trigger(event, ...args);
  }
}

export default AbstractFormModel;
