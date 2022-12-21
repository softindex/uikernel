/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

type EventListener<TParams extends unknown[]> = (...args: TParams) => void;
type Subscribers<TListeners> = {
  [K in keyof TListeners & string]?: TListeners[K][];
};

/**
 * Events control model
 */
class EventsModel<TListeners extends Record<string, EventListener<unknown[]>>> {
  private subscribers: Subscribers<TListeners> = {};

  on<TEventName extends keyof TListeners & string>(event: TEventName, cb: TListeners[TEventName]): void {
    const listeners = this.subscribers[event] || [];
    this.subscribers[event] = listeners;

    listeners.push(cb);
  }

  off<TEventName extends keyof TListeners & string>(event: TEventName, cb: TListeners[TEventName]): void {
    const listeners = this.subscribers[event] || [];
    this.subscribers[event] = listeners.filter((listener) => listener !== cb);
  }

  trigger<TEventName extends keyof TListeners & string>(
    event: TEventName,
    ...params: Parameters<TListeners[TEventName]>
  ): void {
    for (const subscriber of this.subscribers[event] || []) {
      subscriber(...params);
    }
  }

  listenerCount(event: keyof TListeners & string): number {
    return this.subscribers[event]?.length || 0;
  }

  removeAllListeners(event: keyof TListeners & string): void {
    this.subscribers[event] = [];
  }
}

export default EventsModel;
