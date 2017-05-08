/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.form = new UIKernel.Form();
    this.onFormChange = this.onFormChange.bind(this);
  }

  componentDidMount() {
    this.form.init({
      fields: ['name', 'age'], // Fields we need
      model: new UIKernel.Adapters.Grid.ToFormUpdate(model, 2), // We're going to change record with ID = 2
    });
    this.form.addChangeListener(this.onFormChange);
  }

  componentWillUnmount() {
    this.form.removeChangeListener(this.onFormChange);
  }

  onFormChange(newFormState) {
    if (!_.isEqual(this.props.state.data, newFormState.data)) {
      this.form.submit()
        .catch((err) => {
          if (err && !(err instanceof UIKernel.Models.ValidationErrors)) { // If error is not a validation one
            alert('Error');
          }
        });
    }

    this.props.onChange(newFormState);
  }

  render() {
    if (!this.props.state.isLoaded) {
      return <span>Loading...</span>;
    }

    return (
      <div className="form">
        <div className="header panel-heading">
          <h4 className="title">Edit record number 2</h4>
        </div>
        <div className="body">
          <form className="form-horizontal change-second-field-form">
            <div className={'form-group' + (this.props.state.errors.hasError('name') ? ' error' : '')}>
              <label className="col-sm-2 control-label">Name</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.form.updateField.bind(this.form, 'name')}
                  value={this.props.state.data.name}
                />
              </div>
              <div className="col-sm-3">
                <div className="validation-error">{this.props.state.errors.getFieldErrors('name')}</div>
              </div>
            </div>
            <div className={'form-group' + (this.props.state.errors.hasError('age') ? ' error' : '')}>
              <label className="col-sm-2 control-label">Age</label>
              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control"
                  onChange={this.form.updateField.bind(this.form, 'age')}
                  value={this.props.state.data.age}
                />
              </div>
              <div className="col-sm-3">
                <div className="validation-error">{this.props.state.errors.getFieldErrors('age')}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
