/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

var FiltersForm = (function () {
  var defaultFilters = {
    search: '',
    age: null,
    gender: 0
  };

  return React.createClass({
    mixins: [UIKernel.Mixins.Form],
    componentDidMount: function () {
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
      if (!this.isLoaded()) {
        return <span>Loading...</span>;
      }

      var data = this.getData();

      return (
        <form className="filters-form">
          <div className="form-group col-sm-7">
            <label>Search</label>
            <input
              type="text" // text editor
              className="form-control"
              onChange={this.updateField.bind(null, 'search')} // on data change event
              value={data.search}
            />
          </div>
          <div className="form-group col-sm-2">
            <label>Age</label>
            <input
              type="number" // number editor
              className="form-control"
              onChange={this.updateField.bind(null, 'age')}
              value={data.age}
            />
          </div>
          <div className="form-group col-sm-2">
            <label>Gender</label>
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
          <div className="form-group col-sm-1">
            <label>
              <br/>
            </label>
            <br/>
            <a className="btn btn-success" onClick={this.onClear}>
              Clear
            </a>
          </div>
        </form>
      );
    }
  });
})();
