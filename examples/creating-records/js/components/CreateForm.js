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
    this.onFormChange = this.onFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.form.init({
      fields: ['name', 'surname', 'phone', 'age', 'gender'],
      model: new UIKernel.Adapters.Grid.ToFormCreate(model, { // default field values
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
    this.props.onChange(newFormState);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.form.submit() // create a new record
      .then((recordId) => {
        this.props.onSubmit(recordId)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!this.props.state.isLoaded) {
      return <span>Loading...</span>;
    }

    return (
      <div>
        {this.props.state.globalError ? this.props.state.globalError.message : ''}
        <form className="form-horizontal edit-form" onSubmit={this.handleSubmit}>
          <div className={"form-group" + (this.props.state.changes.name ? ' changed' : '') +
          (this.props.state.errors.hasError('name') ? ' error' : '')}>
            <label className="col-sm-3 control-label">First Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="Alyx"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'name')}
                onFocus={this.form.clearError.bind(this.form, 'name')}
                onBlur={this.form.validateForm}
                value={this.props.state.data.name}
              />
              {this.props.state.errors.hasError('name') &&
              <small className="control-label">{this.props.state.errors.getFieldErrors('name')}</small>}
            </div>
          </div>
          <div
            className={"form-group" + (this.props.state.changes.surname ? ' changed' : '') +
            (this.props.state.errors.hasError('surname') ? ' error' : '')}>
            <label className="col-sm-3 control-label">Last Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="Vance"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'surname')}
                onFocus={this.form.clearError.bind(this.form, 'surname')}
                onBlur={this.form.validateForm}
                value={this.props.state.data.surname}
              />
              {this.props.state.errors.hasError('surname') &&
              <small className="control-label">{this.props.state.errors.getFieldErrors('surname')}</small>}
            </div>
          </div>
          <div
            className={"form-group" + (this.props.state.changes.phone ? ' changed' : '') +
            (this.props.state.errors.hasError('phone') ? ' error' : '')}>
            <label className="col-sm-3 control-label">Phone</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="555-0100"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'phone')}
                onFocus={this.form.clearError.bind(this.form, 'phone')}
                onBlur={this.form.validateForm}
                value={this.props.state.data.phone}
              />
              {this.props.state.errors.hasError('phone') &&
              <small className="control-label">{this.props.state.errors.getFieldErrors('phone')}</small>}
            </div>
          </div>
          <div
            className={"form-group" + (this.props.state.changes.age ? ' changed' : '') +
            (this.props.state.errors.hasError('age') ? ' error' : '')}>
            <label className="col-sm-3 control-label">Age</label>
            <div className="col-sm-9">
              <input
                type="number"
                placeholder="18"
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'age')}
                onFocus={this.form.clearError.bind(this.form, 'age')}
                onBlur={this.form.validateForm}
                value={this.props.state.data.age}
              />
              {this.props.state.errors.hasError('age') &&
              <small className="control-label">{this.props.state.errors.getFieldErrors('age')}</small>}
            </div>
          </div>
          <div
            className={"form-group" + (this.props.state.changes.gender ? ' changed' : '')}>
            <label className="col-sm-3 control-label">Gender</label>
            <div className="col-sm-9">
              <UIKernel.Editors.Select
                options={[
                  [1, 'Male'],
                  [2, 'Female']
                ]}
                className="form-control"
                onChange={this.form.updateField.bind(this.form, 'gender')}
                onFocus={this.form.clearError.bind(this.form, 'gender')}
                onBlur={this.form.validateForm}
                value={this.props.state.data.gender}
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
}
