/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var RecordForm = React.createClass({
  getInitialState: function () {
    this.form = new UIKernel.Form();

    return {
      form: this.form.getAll()
    };
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

    this.form.init(formProperties);
    this.form.addChangeListener(this.onFormChange);
  },

  componentWillUnmount() {
    this.form.removeChangeListener(this.onFormChange);
  },

  onFormChange(newFormState) {
    this.setState({form: newFormState});
  },

  save: function (e) {
    e.preventDefault();
    this.form.submit()
      .then((recordId) => {
        this.props.onSubmit(recordId)
      });
  },

  render: function () {
    if (!this.state.form.isLoaded) {
      return <span>Loading...</span>;
    }

    return (
      <div className="modal-dialog modal-lg">
        <div className="modal-content animated fadeIn">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">
              {this.props.mode === "edit" ? "Edit " + this.state.form.fields.name.value + ' ' + this.state.form.fields.surname.value : "Create"}
            </h4>
          </div>
          <div className="modal-body">
            <div className="form-horizontal">
              <div className={"form-group" + (this.state.form.fields.name.isChanged ? ' bg-warning' : '') +
              (this.state.form.fields.name.errors ? ' bg-danger' : '')}>
                <label className="col-sm-3 control-label">First Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.form.updateField.bind(this.form, 'name')}
                    onFocus={this.form.clearError.bind(this.form, 'name')}
                    onBlur={this.form.validateForm}
                    value={this.state.form.fields.name.value}
                  />
                </div>
              </div>
              <div className={"form-group" + (this.state.form.fields.surname.isChanged ? ' bg-warning' : '') +
              (this.state.form.fields.surname.errors ? ' bg-danger' : '')}>
                <label className="col-sm-3 control-label">Last Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.form.updateField.bind(this.form, 'surname')}
                    onFocus={this.form.clearError.bind(this.form,'surname')}
                    onBlur={this.form.validateForm}
                    value={this.state.form.fields.surname.value}
                  />
                </div>
              </div>
              <div className={"form-group" + (this.state.form.fields.phone.isChanged ? ' bg-warning' : '') +
              (this.state.form.fields.phone.errors ? ' bg-danger' : '')}>
                <label className="col-sm-3 control-label">Phone</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.form.updateField.bind(this.form, 'phone')}
                    onFocus={this.form.clearError.bind(this.form,'phone')}
                    onBlur={this.form.validateForm}
                    value={this.state.form.fields.phone.value}
                  />
                </div>
              </div>
              <div className={"form-group" + (this.state.form.fields.age.isChanged ? ' bg-warning' : '') +
              (this.state.form.fields.age.errors ? ' bg-danger' : '')}>
                <label className="col-sm-3 control-label">Age</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    onChange={this.form.updateField.bind(this.form, 'age')}
                    onFocus={this.form.clearError.bind(this.form,'age')}
                    onBlur={this.form.validateForm}
                    value={this.state.form.fields.age.value}
                  />
                </div>
              </div>
              <div className={"form-group" + (this.state.form.fields.gender.isChanged ? ' bg-warning' : '') +
              (this.state.form.fields.gender.errors ? ' bg-danger' : '')}>
                <label className="col-sm-3 control-label">Gender</label>
                <div className="col-sm-9">
                  <UIKernel.Editors.Select
                    options={[
                      [1, 'Male'],
                      [2, 'Female']
                    ]}
                    className="form-control"
                    onChange={this.form.updateField.bind(this.form, 'gender')}
                    onFocus={this.form.clearError.bind(this.form,'gender')}
                    onBlur={this.form.validateForm}
                    value={this.state.form.fields.gender.value}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" onClick={this.save}>Save</button>
            <button type="button" className="btn btn-default" onClick={this.form.clearChanges}>Discard</button>
            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
});
