import UIKernel from 'uikernel';
import React from 'react';

const columns = {
  name: {
    name: 'First Name', // column title
    sortCycle: ['asc', 'desc', 'default'], // add sorting
    render: ['name', record => record.name], // method for rendering of table cells
    editor: function () {
      return <input type="text" {...this.props}/>; // text editor
    }
  },
  surname: {
    name: 'Last Name',
    render: ['surname', record => record.surname],
    editor: function () {
      return <input type="text" {...this.props}/>;
    }
  },
  phone: {
    name: 'Phone',
    render: ['phone', record => record.phone],
    editor: function () {
      return <input type="text" {...this.props}/>;
    }
  },
  age: {
    name: 'Age',
    render: ['age', record => record.age],
    editor: function () {
      return <UIKernel.Editors.Number {...this.props}/>; // number editor
    }
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
    editor: function () {
      return <UIKernel.Editors.Select // select editor
        {...this.props}
        options={[
          [1, 'Male'],
          [2, 'Female']
        ]}
      />;
    }
  },
  tools: {
    width: 50,
    render: [() => '<a href="javascript:void(0)" ref="del">[X]</a>'],
    onClickRefs: {
      del: (event, recordId, record, grid) => { // ref="del" click handler
        grid.getModel()
          .delete(recordId)
          .then(() => {
            grid.updateTable();
          });
      }
    }
  }
};
export default columns