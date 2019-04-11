/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const columns = {
  tools: {
    width: '40px',
    render: [() => '<button ref="edit" class="btn btn-outline btn-success btn-xs"><i class="fa fa-pencil"></i></button>'],
    onClickRefs: {
      edit(e, recordId, record, grid) {
        const editPopup = popup.open(Form, {
          model: new UIKernel.Adapters.Grid.ToFormUpdate(grid.getModel(), recordId),
          changes: grid.getRecordChanges(recordId),
          onSubmit: () => {
            editPopup.close();
            grid.clearRecordChanges(recordId);
          }
        });
      }
    }
  },
  name: {
    name: 'First name',
    sortCycle: ['desc', 'asc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['name', record => _.escape(record.name)]
  },
  country: {
    name: 'Country',
    editor: function () {
      return (
        <UIKernel.Editors.SuggestBox
          {...this.props}
          onLabelChange={this.updateField.bind(null, 'countryName')}
          model={countries}
          select={true}
        />
      );
    },
    render: ['country', 'countryName', record => record.countryName]
  }
};
