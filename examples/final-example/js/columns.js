/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var columns = {
  tools: {
    width: 100,
    render: [function () {
      return '<center>\
        <a href="javascript:void(0)" ref="create" class="text-success action"><span class="glyphicon glyphicon-file"></span></a>\
        <a href="javascript:void(0)" ref="edit" class="text-info action"><span class="glyphicon glyphicon-pencil"></span></a>\
        <a href="javascript:void(0)" ref="remove" class="text-danger action"><span class="glyphicon glyphicon-remove"></span></a>\
      </center>';
    }],
    onClickRefs: {
      create: function(event, recordId, record, grid) { // ref="create" click handler
        var createPopup = Popup.open(RecordForm, {
          model: new UIKernel.Adapters.Grid.ToFormCreate(grid.getModel(), {
            name: '',
            surname: '',
            phone: '',
            age: '',
            gender: 1
          }),
          mode: 'create',
          onSubmit(recordId) {
            createPopup.close();
            grid.addRecordStatus(recordId, 'new');
          }
        });
      },
      edit: function(event, recordId, record, grid) { // ref="edit" click handler
        var editPopup = Popup.open(RecordForm, {
          model: new UIKernel.Adapters.Grid.ToFormUpdate(grid.getModel(), recordId),
          mode: 'edit',
          changes: grid.getRecordChanges(recordId),
          onSubmit() {
            editPopup.close();
            grid.clearRecordChanges(recordId);
          }
        });
      },
      remove: function (event, recordId, record, grid) { // ref="remove" click handler
        grid.getModel().delete(recordId, function (err) {
          if (!err) {
            grid.updateTable();
          }
        });
      }
    }
  },
  name: {
    name: 'First Name', // columns title
    sortCycle: ['asc', 'desc', 'default'], // sort cycle
    editor: function () {
      return <input type="text" {...this.props}/>; // text editor
    },
    render: ['name', function (record) { // method to render a cell
      return _.escape(record.name);
    }]
  },
  surname: {
    name: 'Last Name',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['surname', function (record) {
      return _.escape(record.surname);
    }]
  },
  phone: {
    name: 'Phone',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['phone', function (record) {
      return _.escape(record.phone);
    }]
  },
  age: {
    name: 'Age',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="number" {...this.props}/>; // number editor
    },
    render: ['age', function (record) {
      return record.age;
    }]
  },
  gender: {
    name: 'Gender',
    sortCycle: ['asc', 'desc', 'default'],
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
