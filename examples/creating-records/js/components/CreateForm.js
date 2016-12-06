/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

var CreateForm = React.createClass({
  getInitialState: function () {
    this.form = new UIKernel.Form();
    return this.form.getAll();
  },

  componentDidMount() {
    this.form.init({
      fields: ['name', 'surname', 'phone', 'age', 'gender'],
      model: UIKernel.Adapters.Grid.toFormCreate(model, { // pass it default field values
        name: '',
        surname: '',
        phone: '',
        age: '',
        gender: 1
      }),
      submitAll: true,
      partialErrorChecking: true
    });
    this.form.addChangeListener(this.onFormChange);
  },

  componentWillUnmount() {
    this.form.removeChangeListener(this.onFormChange);
  },

  onFormChange(newFormState) {
    this.setState(newFormState);
  },

  save: function (e) { // save record handler
    e.preventDefault();
    this.form.submit()
      .then((recordId) => {
        this.props.onSubmit(recordId)
      });
  },

  render: function () {
    if (!this.state.isLoaded) {
      return <span>Loading...</span>;
    }

    return (
      <div>
        {this.state.globalError ? this.state.globalError.message : ''}
        <form className="form-horizontal edit-form" onSubmit={this.save}>
          <div
            className={"form-group" + (this.state.changes.name ? ' changed' : '') + (this.state.errors.name ? ' error' : '')}>
            <label className="col-sm-3 control-label">First Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="Alyx"
                className="form-control"
                onChange={this.form.updateField.bind(this.form,'name')}
                onFocus={this.form.clearError.bind(this.form, 'name')}
                onBlur={this.form.validateForm}
                value={this.state.data.name}
              />
            </div>
          </div>
          <div
            className={"form-group" + (this.state.changes.surname ? ' changed' : '') + (this.state.errors.surname ? ' error' : '')}>
            <label className="col-sm-3 control-label">Last Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="Vance"
                className="form-control"
                onChange={this.form.updateField.bind(this.form,'surname')}
                onFocus={this.form.clearError.bind(this.form, 'surname')}
                onBlur={this.form.validateForm}
                value={this.state.data.surname}
              />
            </div>
          </div>
          <div
            className={"form-group" + (this.state.changes.phone ? ' changed' : '') + (this.state.errors.phone ? ' error' : '')}>
            <label className="col-sm-3 control-label">Phone</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="555-0100"
                className="form-control"
                onChange={this.form.updateField.bind(this.form,'phone')}
                onFocus={this.form.clearError.bind(this.form, 'phone')}
                onBlur={this.form.validateForm}
                value={this.state.data.phone}
              />
            </div>
          </div>
          <div
            className={"form-group" + (this.state.changes.age ? ' changed' : '') + (this.state.errors.age ? ' error' : '')}>
            <label className="col-sm-3 control-label">Age</label>
            <div className="col-sm-9">
              <input
                type="number"
                placeholder="18"
                className="form-control"
                onChange={this.form.updateField.bind(this.form,'age')}
                onFocus={this.form.clearError.bind(this.form, 'age')}
                onBlur={this.form.validateForm}
                value={this.state.data.age}
              />
            </div>
          </div>
          <div
            className={"form-group" + (this.state.changes.gender ? ' changed' : '') + (this.state.errors.gender ? ' error' : '')}>
            <label className="col-sm-3 control-label">Gender</label>
            <div className="col-sm-9">
              <UIKernel.Editors.Select
                options={[
                  [1, 'Male'],
                  [2, 'Female']
                ]}
                className="form-control"
                onChange={this.form.updateField.bind(this.form,'gender')}
                onFocus={this.form.clearError.bind(this.form, 'gender')}
                onBlur={this.form.validateForm}
                value={this.state.data.gender}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-9">
              <button type="button" className="btn btn-success" onClick={this.form.clearChanges}>
                Clear
              </button>
              {' '}
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});
