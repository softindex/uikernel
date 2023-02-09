"use strict";

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (typeof window !== 'undefined' && typeof window.setImmediate !== 'function') {
  window.setImmediate = function () {
    var head = {};
    var tail = head;
    var ID = Math.random();

    function onMessage(e) {
      if (e.data !== ID) {
        return;
      }

      head = head.next;
      var func = head.func;
      delete head.func;
      func();
    }

    if (window.addEventListener) {
      window.addEventListener('message', onMessage, false);
    } else {
      window.attachEvent('onmessage', onMessage);
    }

    return window.postMessage ? function (func) {
      tail = tail.next = {
        func: func
      };
      window.postMessage(ID, '*');
    } : function (func) {
      setTimeout(func, 0);
    };
  }();
}