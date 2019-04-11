/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const columns = {
  name: {
    name: 'First Name', // column title
    render: ['name', record => record.name], // method for rendering of table cells
    sortCycle: ['asc', 'desc', 'default']
  },
  surname: {
    name: 'Last Name',
    render: ['surname', record => record.surname],
    sortCycle: ['asc', 'desc', 'default']
  },
  phone: {
    name: 'Phone',
    render: ['phone', record => record.phone],
    sortCycle: ['asc', 'desc', 'default']
  },
  age: {
    name: 'Age',
    render: ['age', record => record.age],
    sortCycle: ['asc', 'desc', 'default']
  },
  gender: {
    name: 'Gender',
    render: ['gender', (record) => {
      switch (record.gender) {
        case 1:
          return 'Male';
        case 2:
          return 'Female';
        default:
          return 'Undefined';
      }
    }],
    sortCycle: ['asc', 'desc', 'default']
  }
};

export default columns
