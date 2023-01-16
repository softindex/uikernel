/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type ArrayWithAtLeastOneElement<T> = [T, ...T[]];

export type AllAsOptionalWithRequired<T extends {}, U extends string & keyof T> = {
  [K in Exclude<string & keyof T, U>]?: T[K];
} & {
  [K in U]-?: T[K];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction<TResult = any> = (...args: any[]) => TResult;

export type EventListener<TParams extends unknown[]> = (...args: TParams) => void;

export interface IObservable<TListenerArgsByEventName extends Record<string, unknown[]>> {
  off: <TEventName extends string & keyof TListenerArgsByEventName>(
    eventName: TEventName,
    cb: EventListener<TListenerArgsByEventName[TEventName]>
  ) => this;

  on: <TEventName extends string & keyof TListenerArgsByEventName>(
    eventName: TEventName,
    cb: EventListener<TListenerArgsByEventName[TEventName]>
  ) => this;
}
