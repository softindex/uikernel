/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const columns = {
  name: {
    name: 'First Name',
    render: ['name', record => record.name]
  },
  surname: {
    name: 'Last Name',
    render: ['surname', record => record.surname]
  },
  age: {
    name: 'Age',
    render: ['age', record => record.age]
  }
};
