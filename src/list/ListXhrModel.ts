/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import url from 'url';
import defaultXhr from '../common/defaultXhr';

class ListXMLHttpRequestModel {
  /**
   * Simple list client model which works via XMLHttpRequest
   *
   * @param {string}    apiURL  API address for list model interaction
   * @param {Function}  [xhr]   XHR wrapper
   * @constructor
   */
  constructor(apiURL, xhr) {
    this._apiURL = apiURL;
    this._xhr = xhr || defaultXhr;
    this._apiUrl = apiURL
      .replace(/([^/])\?/, '$1/?') // Add "/" before "?"
      .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
  }

  /**
   * Get model data
   *
   * @param {string}    search  List search query
   */
  async read(search) {
    const parsedUrl = url.parse(this._apiUrl, true);
    delete parsedUrl.search;
    if (search) {
      parsedUrl.query.v = search;
    }

    const body = await this._xhr({
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      uri: url.format(parsedUrl)
    });

    return JSON.parse(body);
  }

  /**
   * Get option name using ID
   *
   * @param {*}         id  Option ID
   */
  async getLabel(id) {
    const parsedUrl = url.parse(this._apiUrl, true);
    parsedUrl.pathname = url.resolve(parsedUrl.pathname, `label/${JSON.stringify(id)}`);

    let body = await this._xhr({
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      uri: url.format(parsedUrl)
    });

    body = JSON.parse(body);

    return body;
  }
}

export default ListXMLHttpRequestModel;
