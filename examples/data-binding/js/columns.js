/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

var columns = {
  name: {
    name: 'First Name', // columns title
    editor: function () {
      return <input type="text" {...this.props} />; // text editor
    },
    render: ['name', function (record) { // method to render a cell
      return _.escape(record.name);
    }]
  },
  surname: {
    name: 'Last Name',
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['surname', function (record) {
      return _.escape(record.surname);
    }]
  },
  phone: {
    name: 'Phone',
    editor: function () {
      return <input type="text" {...this.props}/>; // text editor
    },
    render: ['phone', function (record) {
      return _.escape(record.phone);
    }]
  },
  age: {
    name: 'Age',
    editor: function () {
      return <input type="number" {...this.props}/>; // number editor
    },
    render: ['age', function (record) {
      return record.age;
    }]
  },
  gender: {
    name: 'Gender',
    editor: function () {
      return <UIKernel.Editors.Select // select editor
        {...this.props}
        options={[
          [1, 'Male'],
          [2, 'Female']
        ]}
        />;
    },
    render: ['gender', function (record) {
      switch (record.gender) {
        case 1: return 'Male';
        case 2: return 'Female';
        default: return 'Undefined';
      }
    }]
  }
};
