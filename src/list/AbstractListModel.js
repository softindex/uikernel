/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Abstract List model
 */
class AbstractListModel {
  /**
   * Get data
   *
   * @param {string}    search  Search query
   * @abstract
   */
  read(/*search*/) {
    return Promise.resolve([]);
  }

  /**
   * Get option name using ID
   *
   * @param {*}         id  Option ID
   * @abstract
   */
  getLabel(/*id*/) {
    return Promise.resolve('');
  }
}

export default AbstractListModel;
