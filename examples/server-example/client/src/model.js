/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import UIKernel from 'uikernel';
import validator from './validator';

const model = new UIKernel.Models.Grid.Xhr({
  api: '/api/users',
  validator
})

model.delete = async function (recordId) {
  await this.xhr({
    method: "DELETE",
    uri: `${this.apiUrl}/${recordId}`
  })
}

export default model
