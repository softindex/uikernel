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
        <form className="filters-form row">
          <div className="col-sm-7">
            <label className="control-label">Search</label>
            <input
              type="text" // text editor
              className="form-control"
              onChange={this.updateValue.bind(null, 'search')}
              value={this.state.filters.search}
            />
          </div>
          <div className="col-sm-2">
            <label className="control-label">Age</label>
            <input
              type="number" // number editor
              className="form-control"
              onChange={this.updateValue.bind(null, 'age')}
              value={this.state.filters.age}
            />
          </div>
          <div className="col-sm-2">
            <label className="control-label">Gender</label>
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
          <div className="col-sm-1">
            <label className="control-label">&nbsp;</label>
            <a className="btn btn-success show" onClick={this.onClear}>
              Clear
            </a>
          </div>
        </form>
      );
    }
  });
})();
