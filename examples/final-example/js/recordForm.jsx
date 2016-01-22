/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

var RecordForm = React.createClass({
  mixins: [UIKernel.Mixins.Form],

  getInitialState: function() {
    return {};
  },

  componentDidMount: function () {
    var formProperties = {
      fields: ["name", "surname", "phone", "age", "gender"],
      model: this.props.model,
      changes: this.props.changes
    };

    if (this.props.mode === "create") {
      formProperties.submitAll = true;
      formProperties.partialErrorChecking = true;
    }

    this.initForm(formProperties);
  },

  save: function (e) {
    e.preventDefault();
    this.submit(function (err, recordId) {
      if (!err) {
        this.props.onSubmit(recordId);
      }
    }.bind(this));
  },

  render: function () {
    if (!this.isLoaded()) {
      return <span>Loading...</span>;
    }

    var data = this.getData();
    var globalError = this.getGlobalError();

    return (
      <div className="modal-dialog modal-lg">
        <div className="modal-content animated fadeIn">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">
              {this.props.mode === "edit" ? "Edit " + data.name + ' ' + data.surname : "Create"}
            </h4>
          </div>
          <div className="modal-body">
            <div className="form-horizontal">
              <div className="form-group">
                <div className="col-sm-9 col-sm-offset-3">
                  <b className="text-danger">{globalError ? globalError.message : ''}</b>
                </div>
              </div>
              <div className={"form-group" + (this.hasChanges('name') ? ' bg-warning' : '') +
                  (this.hasError('name') ? ' bg-danger' : '')}>
                <label className="col-sm-3 control-label">First Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.updateField.bind(null, 'name')}
                    onFocus={this.clearError.bind(null, 'name')}
                    onBlur={this.validateForm}
                    value={data.name}
                  />
                </div>
              </div>
              <div className={"form-group" + (this.hasChanges('surname') ? ' bg-warning' : '') +
                  (this.hasError('surname') ? ' bg-danger' : '')}>
                <label className="col-sm-3 control-label">Last Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.updateField.bind(null, 'surname')}
                    onFocus={this.clearError.bind(null, 'surname')}
                    onBlur={this.validateForm}
                    value={data.surname}
                  />
                </div>
              </div>
              <div className={"form-group" + (this.hasChanges('phone') ? ' bg-warning' : '') +
                  (this.hasError('phone') ? ' bg-danger' : '')}>
                <label className="col-sm-3 control-label">Phone</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.updateField.bind(null, 'phone')}
                    onFocus={this.clearError.bind(null, 'phone')}
                    onBlur={this.validateForm}
                    value={data.phone}
                  />
                </div>
              </div>
              <div className={"form-group" + (this.hasChanges('age') ? ' bg-warning' : '') +
                  (this.hasError('age') ? ' bg-danger' : '')}>
                <label className="col-sm-3 control-label">Age</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    onChange={this.updateField.bind(null, 'age')}
                    onFocus={this.clearError.bind(null, 'age')}
                    onBlur={this.validateForm}
                    value={data.age}
                  />
                </div>
              </div>
              <div className={"form-group" + (this.hasChanges('gender') ? ' bg-warning' : '') +
                  (this.hasError('email') ? ' bg-danger' : '')}>
                <label className="col-sm-3 control-label">Gender</label>
                <div className="col-sm-9">
                  <UIKernel.Editors.Select
                    className="form-control"
                    onChange={this.updateField.bind(null, 'gender')}
                    onFocus={this.clearError.bind(null, 'gender')}
                    onBlur={this.validateForm}
                    options={[
                      [1, 'Male'],
                      [2, 'Female']
                    ]}
                    value={data.gender}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-default" onClick={this.clearChanges}>Discard</button>
            <button type="submit" className="btn btn-primary" onClick={this.save}>Save</button>
          </div>
        </div>
      </div>
    );
  }
});
