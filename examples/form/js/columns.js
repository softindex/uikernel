/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const columns = {
  id: {
    name : 'ID',
    width: '40',
    sortCycle: ['asc', 'desc'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['id', record => record.id]
  },
  name: {
    name: 'Name', // columns title
    sortCycle: ['asc', 'desc', 'default'], // sort cycle
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['name', record => record.name]
  },
  age: {
    name: 'Age',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <UIKernel.Editors.Number {...this.props}/>;
    },
    render: ['age', record => record.age]
  }
};