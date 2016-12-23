/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var FiltersForm = (function () {
  var defaultFilters = {
    search: '',
    age: null,
    gender: 0
  };

  return React.createClass({
    getInitialState: function () {
      return {
        filters: _.clone(defaultFilters)
      }
    },

    onClear: function () {
      this.setState({filters: _.clone(defaultFilters)});
      this.props.onSubmit(defaultFilters);
    },

    updateValue: function (field, value) {
      if (value.target) {
        value = value.target.value
      }

      this.state.filters[field] = value;
      this.props.onSubmit(this.state.filters);
    },

    render() {
      return (
        <form className="filters-form form-horizontal">
          <div className="form-group">
            <label className="col-sm-3 control-label">Search</label>
            <div className="col-sm-9">
              <input
                type="text" // text editor
                className="form-control"
                onChange={this.updateValue.bind(null, 'search')}
                value={this.state.filters.search}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Age</label>
            <div className="col-sm-9">
              <input
                type="number" // number editor
                className="form-control"
                onChange={this.updateValue.bind(null, 'age')}
                value={this.state.filters.age}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Gender</label>
            <div className="col-sm-9">
              <UIKernel.Editors.Select // select editor
                className="form-control"
                onChange={this.updateValue.bind(null, 'gender')}
                options={[
                  [0, ''],
                  [1, 'Male'],
                  [2, 'Female']
                ]}
                value={this.state.filters.gender}
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
