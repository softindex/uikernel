/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import GridCollectionModel from '../GridCollectionModel';

class GridModelMock extends GridCollectionModel {
  constructor(...args) {
    super(...args);
    this.read = jest.fn(this.read);
    this.getRecord = jest.fn(this.getRecord);
    this.update = jest.fn(this.update);
    this.create = jest.fn(this.create);
  }
}

export default GridModelMock;
