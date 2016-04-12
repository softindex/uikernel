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

var EVENT_ID_KEY = '__uikernelEventKey';

/**
 * Events control model
 * @constructor
 */
function EventsModel() {
  this._subscribers = {};
}

/**
 * Subscribe to inner model event
 *
 * @param {string}      event   Event ID
 * @param {Function}    cb      CallBack function
 */
EventsModel.prototype.on = function (event, cb) {
  if (typeof this._subscribers[event] !== 'object') {
    this._subscribers[event] = [];
  }
  cb[EVENT_ID_KEY] = this._subscribers[event].push(cb) - 1;
};

/**
 * Unsubscribe from inner model event
 *
 * @param {number}      event   Event ID
 * @param {Function}    cb      CallBack function
 */
EventsModel.prototype.off = function (event, cb) {
  if (!cb.hasOwnProperty(EVENT_ID_KEY)) {
    return;
  }

  if (this._subscribers[event] && this._subscribers[event][cb[EVENT_ID_KEY]]) {
    delete this._subscribers[event][cb[EVENT_ID_KEY]];
  }
};

/**
 * Trigger inner model event
 *
 * @param {number} event Event ID
 */
EventsModel.prototype.trigger = function (event) {
  var i;

  if (!this._subscribers[event] || !this._subscribers[event].length) {
    return;
  }
  for (i = 0; i < this._subscribers[event].length; i++) {
    if (this._subscribers[event][i]) {
      this._subscribers[event][i].apply(null, [].slice.call(arguments, 1));
    }
  }
};

module.exports = EventsModel;
