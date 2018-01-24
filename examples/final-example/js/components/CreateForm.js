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
      <div className="body">
        <form className="form-horizontal edit-form change-second-field-form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (this.state.fields.name.isChanged ? ' changed' : '') +
          (this.state.fields.name.errors ? ' error' : '')}>
            <label className="col-sm-4 control-label">First Name</label>
            <div className="col-sm-4">
              <input
                type="text"
                placeholder="Alyx"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'name')}
                onFocus={this.form.clearError.bind(this.form, 'name')}
                onBlur={this.form.validateForm}
                value={this.state.fields.name.value}
              />
            </div>
            {this.state.fields.name.errors &&
              <div className="col-sm-3">
                <div className="validation-error">{this.state.fields.name.errors[0]}</div>
              </div>}
          </div>
          <div
            className={'form-group' + (this.state.fields.surname.isChanged ? ' changed' : '') +
            (this.state.fields.surname.errors ? ' error' : '')}>
            <label className="col-sm-4 control-label">Last Name</label>
            <div className="col-sm-4">
              <input
                type="text"
                placeholder="Vance"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'surname')}
                onFocus={this.form.clearError.bind(this.form, 'surname')}
                onBlur={this.form.validateForm}
                value={this.state.fields.surname.value}
              />
            </div>
            {this.state.fields.surname.errors &&
            <div className="col-sm-3">
              <div className="validation-error">{this.state.fields.surname.errors[0]}</div>
            </div>}
          </div>
          <div
            className={'form-group' + (this.state.fields.phone.isChanged ? ' changed' : '') +
            (this.state.fields.phone.errors ? ' error' : '')}>
            <label className="col-sm-4 control-label">Phone</label>
            <div className="col-sm-4">
              <input
                type="text"
                placeholder="555-0100"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'phone')}
                onFocus={this.form.clearError.bind(this.form, 'phone')}
                onBlur={this.form.validateForm}
                value={this.state.fields.phone.value}
              />
            </div>
            {this.state.fields.phone.errors &&
            <div className="col-sm-3">
              <div className="validation-error">{this.state.fields.phone.errors[0]}</div>
            </div>}
          </div>
          <div
            className={'form-group' + (this.state.fields.age.isChanged ? ' changed' : '') +
            (this.state.fields.age.errors ? ' error' : '')}>
            <label className="col-sm-4 control-label">Age</label>
            <div className="col-sm-4">
              <UIKernel.Editors.Number
                placeholder="18"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'age')}
                onFocus={this.form.clearError.bind(this.form, 'age')}
                onBlur={this.form.validateForm}
                value={this.state.fields.age.value}
              />
            </div>
            {this.state.fields.age.errors &&
            <div className="col-sm-3">
              <div className="validation-error">{this.state.fields.age.errors[0]}</div>
            </div>}
          </div>
          <div
            className={'form-group' + (this.state.fields.gender.isChanged ? ' changed' : '')}>
            <label className="col-sm-4 control-label">Gender</label>
            <div className="col-sm-4">
              <UIKernel.Editors.Select
                options={[
                  [1, 'Male'],
                  [2, 'Female']
                ]}
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'gender')}
                onFocus={this.form.clearError.bind(this.form, 'gender')}
                onBlur={this.form.validateForm}
                value={this.state.fields.gender.value}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-5 col-sm-4">
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
