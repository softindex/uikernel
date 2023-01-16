/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {EventListener, IObservable} from './types';

type Subscribers<TListenerArgsByEventName extends Record<string, unknown[]>> = {
  [K in keyof TListenerArgsByEventName & string]?: EventListener<TListenerArgsByEventName[K]>[];
};

// TODO Vlad rename file to EventsModel
/**
 * Events control model
 */
class EventsModel<TListenerArgsByEventName extends Record<string, unknown[]>>
  implements IObservable<TListenerArgsByEventName>
{
  private subscribers: Subscribers<TListenerArgsByEventName> = {};

  on<TEventName extends keyof TListenerArgsByEventName & string>(
    eventName: TEventName,
    cb: EventListener<TListenerArgsByEventName[TEventName]>
  ): this {
    const listeners = this.subscribers[eventName] || [];
    this.subscribers[eventName] = listeners;

    listeners.push(cb);
    return this;
  }

  off<TEventName extends keyof TListenerArgsByEventName & string>(
    eventName: TEventName,
    cb: EventListener<TListenerArgsByEventName[TEventName]>
  ): this {
    const listeners = this.subscribers[eventName] || [];
    this.subscribers[eventName] = listeners.filter((listener) => listener !== cb);

    return this;
  }

  trigger<TEventName extends keyof TListenerArgsByEventName & string>(
    event: TEventName,
    ...params: TListenerArgsByEventName[TEventName]
  ): void {
    for (const subscriber of this.subscribers[event] || []) {
      subscriber(...params);
    }
  }

  listenerCount(event: keyof TListenerArgsByEventName & string): number {
    return this.subscribers[event]?.length || 0;
  }

  removeAllListeners(event: keyof TListenerArgsByEventName & string): void {
    this.subscribers[event] = [];
  }
}

export default EventsModel;
