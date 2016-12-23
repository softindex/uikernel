/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

import utils from './utils';

/**
 * Events control model
 * @constructor
 */
class EventsModel {
  constructor() {
    this._subscribers = {};
  }

  /**
   * Subscribe to inner model event
   *
   * @param {string}      event   Event ID
   * @param {Function}    cb      CallBack function
   */
  on(event, cb) {
    if (typeof this._subscribers[event] !== 'object') {
      this._subscribers[event] = [];
    }
    this._subscribers[event].push(cb);
  }

  /**
   * Unsubscribe from inner model event
   *
   * @param {number}      event   Event ID
   * @param {Function}    cb      CallBack function
   */
  off(event, cb) {
    if (this._subscribers[event]) {
      this._subscribers[event] = utils.without(this._subscribers[event], cb);
    }
  }

  /**
   * Trigger inner model event
   *
   * @param {number} event Event ID
   */
  trigger(event) {
    let i;

    if (!this._subscribers[event] || !this._subscribers[event].length) {
      return;
    }
    for (i = 0; i < this._subscribers[event].length; i++) {
      if (this._subscribers[event][i]) {
        this._subscribers[event][i].apply(null, [].slice.call(arguments, 1));
      }
    }
  }

  /**
   * Returns the number of listeners listening to the event
   *
   * @param {string} event name
   */
  listenerCount(event) {
    return this._subscribers[event].length;
  }

  /**
   * Removes all listeners of the specified event
   *
   * @param {string} event name
   */
  removeAllListeners(event) {
    this._subscribers[event] = [];
  }
}

export default EventsModel;
