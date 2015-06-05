/**
 * Copyright 2015, SoftIndex LLC.
 */
var Form =  React.createClass({
  mixins: [UIKernel.Mixins.Form],
  componentDidMount: function () {
    this.initForm({
      fields: ['name', 'age'], // Fields we need
      model: UIKernel.Adapters.Grid.toFormUpdate(model, 2), // We're going to change record with ID = 2
      autoSubmit: true, // Submit data automatically after it changes
      autoSubmitHandler: this.onSubmit
    });
  },

  onSubmit: function (err) {
    if (err && !(err instanceof UIKernel.Models.ValidationErrors)) { // If error is not a validation one
      alert('Error');
    }
  },

  render: function () {
    if (!this.isLoaded()) {
      return <span>Loading...</span>;
    }

    var data = this.getData();

    return (
      <div className="form">
        <div className="header panel-heading">
          <h4 className="title">Edit record number 2</h4>
        </div>
        <div className="body">
          <form className="form-horizontal change-second-field-form">
            <div className={'form-group'+ (this.hasError('name') ? ' error' : '')}>
              <label className="col-sm-2 control-label">Name</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.updateField.bind(null, 'name')}
                  value={data.name}
                  />
              </div>
              <div className="col-sm-3">
                <div className="validation-error">{this.getFieldErrors('name')}</div>
              </div>
            </div>
            <div className={'form-group'+ (this.hasError('age') ? ' error' : '')}>
              <label className="col-sm-2 control-label">Age</label>
              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control"
                  onChange={this.updateField.bind(null, 'age')}
                  value={data.age}
                  />
              </div>
              <div className="col-sm-3">
                <div className="validation-error">{this.getFieldErrors('age')}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});
