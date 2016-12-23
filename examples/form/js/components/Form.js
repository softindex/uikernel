/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

var Form =  React.createClass({
  getInitialState: function() {
    this.form = new UIKernel.Services.Form();
    return null;
  },
  onFormChange(newFormState) {
    if (!_.isEqual(this.props.state.data, newFormState.data)) {
      this.form.submit()
        .catch(err =>{
          if (err && !(err instanceof UIKernel.Models.ValidationErrors)) { // If error is not a validation one
            alert('Error');
          }
        });
    }
    this.props.stateHandler(newFormState);
  },

  componentDidMount: function () {
    this.form.init({
      fields: ['name', 'age'], // Fields we need
      model: UIKernel.Adapters.Grid.toFormUpdate(model, 2), // We're going to change record with ID = 2
    });
    this.form.addChangeListener(this.onFormChange);
  },

  componentWillUnmount() {
    this.form.removeChangeListener(this.onFormChange);
  },

  render: function () {
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
            <div className={'form-group'+ (this.props.state.errors.name ? ' error' : '')}>
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
                <div className="validation-error">{this.props.state.errors.name}</div>
              </div>
            </div>
            <div className={'form-group'+ (this.props.state.errors.age ? ' error' : '')}>
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
                <div className="validation-error">{this.props.state.errors.age}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});
