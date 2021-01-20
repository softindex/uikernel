/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import UIKernel from 'uikernel';

function getColumns(onEditClick, onDeleteClick, toggleSelected, toggleAll, toggleAllStatus) {
  return {
    bulk: {
      name() {
        return (
          <input
            type="checkbox"
            ref="toggleSelectedAll"
            checked={toggleAllStatus === 'checked'}
            onChange={toggleAll}
          />
        );
      },
      width: '40px',
      className: 'text-center',
      render: [(record, selected) => {
        const isSelected = selected ? ' checked' : '';
        return `
          <label class="${isSelected}">
            <input type="checkbox" ref="toggleSelected" ${isSelected}/>
          </label>
        `;
      }],
      onClickRefs: {
        toggleSelected(e, recordId) {
          toggleSelected(recordId);
        }
      }
    },
    tools: {
      name: 'Actions',
      width: 70,
      className: 'text-center',
      render: [function () {
        return `
          <div>
            <a href="javascript:void(0)" ref="edit" class="text-info action"><span class="glyphicon glyphicon-pencil"></span></a>
            <a href="javascript:void(0)" ref="remove" class="text-danger action"><span class="glyphicon glyphicon-remove"></span></a>
          </div>
        `;
      }],
      onClickRefs: {
        edit(event, recordId) { // ref="edit" click handler
          onEditClick(recordId);
        },
        remove(event, recordId) { // ref="remove" click handler
          onDeleteClick(recordId);
        }
      }
    },
    name: {
      name: 'First Name',
      sortCycle: ['asc', 'desc'],
      editor() {
        return <input type="text" {...this.props}/>;
      },
      render: ['name', function ({name}) {
        return name;
      }]
    },
    surname: {
      name: 'Last Name',
      sortCycle: ['asc', 'desc'],
      editor: function () {
        return <input type="text" {...this.props}/>;
      },
      render: ['surname', function ({surname}) {
        return surname;
      }]
    },
    phone: {
      name: 'Phone',
      sortCycle: ['asc', 'desc'],
      editor() {
        return <input type="text" {...this.props}/>;
      },
      render: ['phone', function ({phone}) {
        return phone;
      }]
    },
    age: {
      name: 'Age',
      sortCycle: ['asc', 'desc'],
      editor() {
        return <UIKernel.Editors.Number {...this.props}/>; // number editor
      },
      render: ['age', function ({age}) {
        return age;
      }]
    },
    gender: {
      name: 'Gender',
      sortCycle: ['asc', 'desc'],
      editor() {
        return (
          <UIKernel.Editors.Select // select editor
            {...this.props}
            options={[
              [1, 'Male'],
              [2, 'Female']
            ]}
          />
        );
      },
      render: ['gender', function ({gender}) {
        switch (gender) {
          case 1:
            return 'Male';
          case 2:
            return 'Female';
          default:
            return 'Undefined';
        }
      }]
    }
  };
}

export default getColumns;
