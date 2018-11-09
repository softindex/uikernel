/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.form = new UIKernel.Form();
    this.state = this.form.getAll();
    this.onFormChange = this.onFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.form.init({
      fields: ['name', 'surname', 'phone', 'age', 'gender'],
      model: new UIKernel.Adapters.Grid.ToFormCreate(model, { // default field values
        name: '',
        surname: '',
        phone: '',
        age: 18,
        gender: 1
      }),
      submitAll: true,
      partialErrorChecking: true
    });
    this.form.addChangeListener(this.onFormChange);
  }

  componentWillUnmount() {
    this.form.removeChangeListener(this.onFormChange);
  }

  onFormChange(newFormState) {
    this.setState(newFormState);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.form.submit() // create a new record
      .then((recordId) => {
        this.props.onSubmit(recordId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.isLoaded) {
      return <span>Loading...</span>;
    }

    return (
      <div>
        <form className="form-horizontal edit-form" onSubmit={this.handleSubmit}>
          <div className={"form-group" + (this.state.fields.name.isChanged ? ' changed' : '') +
          (this.state.fields.name.errors ? ' error' : '')}>
            <label className="col-sm-3 control-label">First Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="Alyx"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'name')}
                onFocus={this.form.clearValidation.bind(this.form, 'name')}
                onBlur={this.form.validateForm}
                value={this.state.fields.name.value}
              />
              {this.state.fields.name.errors &&
              <small className="control-label">{this.state.fields.name.errors[0]}</small>}
            </div>
          </div>
          <div
            className={"form-group" + (this.state.fields.surname.isChanged ? ' changed' : '') +
            (this.state.fields.surname.errors ? ' error' : '')}>
            <label className="col-sm-3 control-label">Last Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="Vance"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'surname')}
                onFocus={this.form.clearValidation.bind(this.form, 'surname')}
                onBlur={this.form.validateForm}
                value={this.state.fields.surname.value}
              />
              {this.state.fields.surname.errors &&
              <small className="control-label">{this.state.fields.surname.errors[0]}</small>}
            </div>
          </div>
          <div
            className={"form-group" + (this.state.fields.phone.isChanged ? ' changed' : '') +
            (this.state.fields.phone.errors ? ' error' : '')}>
            <label className="col-sm-3 control-label">Phone</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="555-0100"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'phone')}
                onFocus={this.form.clearValidation.bind(this.form, 'phone')}
                onBlur={this.form.validateForm}
                value={this.state.fields.phone.value}
              />
              {this.state.fields.phone.errors &&
              <small className="control-label">{this.state.fields.phone.errors[0]}</small>}
            </div>
          </div>
          <div
            className={"form-group" + (this.state.fields.age.isChanged ? ' changed' : '') +
            (this.state.fields.age.errors ? ' error' : '')}>
            <label className="col-sm-3 control-label">Age</label>
            <div className="col-sm-9">
              <UIKernel.Editors.Number
                placeholder="18"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'age')}
                onFocus={this.form.clearValidation.bind(this.form, 'age')}
                onBlur={this.form.validateForm}
                value={this.state.fields.age.value}
              />
              {this.state.fields.age.errors &&
              <small className="control-label">{this.state.fields.age.errors[0]}</small>}
            </div>
          </div>
          <div
            className={"form-group" + (this.state.fields.gender.isChanged ? ' changed' : '')}>
            <label className="col-sm-3 control-label">Gender</label>
            <div className="col-sm-9">
              <UIKernel.Editors.Select
                options={[
                  [1, 'Male'],
                  [2, 'Female']
                ]}
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'gender')}
                onFocus={this.form.clearValidation.bind(this.form, 'gender')}
                onBlur={this.form.validateForm}
                value={this.state.fields.gender.value}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-9">
              <button type="button" className="btn btn-default" onClick={this.form.clearChanges}>
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
}
