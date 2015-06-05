/**
 * Copyright 2015, SoftIndex LLC.
 */
var FiltersForm = (function () {
  var defaultFilters = {
    search: '',
    age: null,
    gender: 0
  };

  return React.createClass({
    mixins: [UIKernel.Mixins.Form],
    componentWillMount: function () {
      this.initForm({ // initialize filters form
        fields: ['search', 'age', 'gender'],
        model: new UIKernel.Models.Form(defaultFilters),
        submitAll: true,
        autoSubmit: true,
        autoSubmitHandler: this.onSubmit
      });
    },
    onSubmit: function (err, data) {
      if (!err) {
        this.props.onSubmit(data);
      }
    },
    onClear: function () { // onClear filters event
      this.submitData(defaultFilters, this.onSubmit);
    },
    render() {
      var data = this.getData();

      return (
        <form className="form-horizontal filters-form">
          <div className="form-group">
            <label className="col-sm-3 control-label">Search</label>
            <div className="col-sm-9">
              <input
                type="text" // text editor
                className="form-control"
                onChange={this.updateField.bind(null, 'search')} // on data change event
                value={data.search}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Age</label>
            <div className="col-sm-9">
              <input
                type="number" // number editor
                className="form-control"
                onChange={this.updateField.bind(null, 'age')}
                value={data.age}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Gender</label>
            <div className="col-sm-9">
              <UIKernel.Editors.Select // select editor
                className="form-control"
                onChange={this.updateField.bind(null, 'gender')}
                options={[
                  [0, ''],
                  [1, 'Male'],
                  [2, 'Female']
                ]}
                value={data.gender}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-9">
              <a className="btn btn-success" onClick={this.onClear}>
                Clear
              </a>
            </div>
          </div>
        </form>
      );
    }
  });
})();
