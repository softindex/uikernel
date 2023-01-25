/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import url from 'url';
import defaultXhr, {DefaultXhr} from '../common/defaultXhr';
import {IListModel, IListModelReadResult} from './types/IListModel';

class ListXhrModel<TKey, TMetadata extends Record<string, unknown>> implements IListModel<TKey, TMetadata> {
  /**
   * Simple list client model which works via XMLHttpRequest
   */
  constructor(private apiUrl: string, private xhr: DefaultXhr = defaultXhr) {
    this.apiUrl = apiUrl
      .replace(/([^/])\?/, '$1/?') // Add "/" before "?"
      .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
  }

  /**
   * Get model data
   */
  async read(search?: string): Promise<IListModelReadResult<TKey, TMetadata>> {
    const parsedURL = url.parse(this.apiUrl, true);
    parsedURL.search = null;
    if (search) {
      parsedURL.query.v = search;
    }

    return (await this.xhr({
      method: 'GET',
      json: true,
      uri: url.format(parsedURL)
    })) as IListModelReadResult<TKey, TMetadata>;
  }

  /**
   * Get option name using Id
   */
  async getLabel(id: TKey): Promise<string> {
    const parsedURL = url.parse(this.apiUrl, true);
    parsedURL.pathname = url.resolve(parsedURL.pathname ?? '', `label/${JSON.stringify(id)}`);

    return (await this.xhr({
      method: 'GET',
      json: true,
      uri: url.format(parsedURL)
    })) as string;
  }
}

export default ListXhrModel;
