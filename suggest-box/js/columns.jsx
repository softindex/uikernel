/**
 * Copyright 2015, SoftIndex LLC.
 */
var columns = {
  tools: {
    width: '40px',
    render: [function () {
      return '<button ref="edit" class="btn btn-outline btn-success btn-xs"><i class="fa fa-pencil"></i></button>';
    }],
    onClickRefs: {
      edit: (function (e, recordId, record, grid) {
        var editPopup = popup.open(Form, {
          model: UIKernel.Adapters.Grid.toFormUpdate(grid.getModel(), recordId),
          changes: grid.getRecordChanges(recordId),
          onSubmit: function onSubmit() {
            editPopup.close();
            grid.clearRecordChanges(recordId);
          }
        });
      })
    }
  },
  name: {
    name: 'First name',
    sortCycle: ['desc', 'asc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['name', function (record) {
      return _.escape(record.name);
    }]
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
    render: ['country', 'countryName', function (record) {
      return record.countryName;
    }]
  }
};
