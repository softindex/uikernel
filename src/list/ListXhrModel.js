/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import callbackify from '../common/callbackify';
import toPromise from '../common/toPromise';
import defaultXhr from '../common/defaultXhr';
import url from 'url';

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

}

/**
 * Get model data
 *
 * @param {string}    search  List search query
 */
ListXMLHttpRequestModel.prototype.read = callbackify(async function (search) {
  const parsedUrl = url.parse(this._apiUrl, true);
  delete parsedUrl.search;
  if (search) {
    parsedUrl.query.v = search;
  }

  const body = await toPromise(this._xhr.bind(this))({
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
    uri: url.format(parsedUrl)
  });

  return JSON.parse(body);
});

/**
 * Get option name using ID
 *
 * @param {*}         id  Option ID
 */
ListXMLHttpRequestModel.prototype.getLabel = callbackify(async function (id) {
  const parsedUrl = url.parse(this._apiUrl, true);
  parsedUrl.pathname = url.resolve(parsedUrl.pathname, `label/${JSON.stringify(id)}`);

  let body = await toPromise(this._xhr.bind(this))({
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
    uri: url.format(parsedUrl)
  });

  body = JSON.parse(body);

  return body;
});

export default ListXMLHttpRequestModel;
