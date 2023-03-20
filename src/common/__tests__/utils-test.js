/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {isEqual} from '../utils';

const GlobalFileClass = global.File;

class FileMock {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(size, name) {
    this.size = size;
    this.name = name;
    this._metadata = Math.random();
  }
}

describe('Utils.isEqual', () => {
  beforeAll(() => {
    global.File = FileMock;
  });

  it('Should return false if comparands have different types', () => {
    expect(isEqual({}, '')).toBeFalsy();
  });

  it('Should return true if comparands are files and have same size and name', () => {
    expect(isEqual(new FileMock(100, 'file'), new FileMock(100, 'file'))).toBeTruthy();
  });

  it('Shouldn`t return true if comparands are files and have same size and name', () => {
    expect(isEqual(new FileMock(100, 'file'), new FileMock(200, 'file'))).toBeFalsy();
  });

  afterAll(() => {
    global.File = GlobalFileClass;
  });
});
