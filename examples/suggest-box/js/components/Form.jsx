/**
 * Copyright 2015, SoftIndex LLC.
 */
var Form = React.createClass({
  mixins: [UIKernel.Mixins.Form],

  componentDidMount: function () {
    this.initForm({
      model: this.props.model, // Get FormModel from props
      fields: ['name', 'country', 'countryName'],
      changes: this.props.changes
    });
  },

  save: function (e) {
    e.preventDefault();
    this.submit(function (err) {
      if (!err) {
        this.props.onSubmit();
      }
    }.bind(this));
  },

  render: function () {
    if (!this.isLoaded()) {
      return <span>Loading...</span>;
    }

    var data = this.getData();

    return (
      <div className="modal-dialog">
        <div className="modal-content animated fadeIn">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">Edit {data.name}</h4>
          </div>
          <div className="modal-body">
            <form>
              <table className="table my-form">
                <tr
                  className={(this.hasChanges('country') ? 'changed' : '') + (this.hasError('country') ? ' error' : '')}
                >
                  <td>Country:</td>
                  <td>
                    <UIKernel.Editors.SuggestBox
                      model={countries}
                      onChange={this.validateField.bind(null, 'country')}
                      onLabelChange={this.updateField.bind(null, 'countryName')}
                      select={true}
                      value={data.country}
                    />
                  </td>
                </tr>
              </table>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-white" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-white" onClick={this.clearChanges}>Discard</button>
            <button type="submit" className="btn btn-primary" onClick={this.save}>Save</button>
          </div>
        </div>
      </div>
    );
  }
});
