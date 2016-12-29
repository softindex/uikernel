/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var FiltersForm = React.createClass({

  updateValue: function (field, value) {
    if (value.target) {
      value = value.target.value
    }

    this.props.onSubmit({
      ...this.props.state,
      [field]: value
    });
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
              value={this.props.state.search}
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
              value={this.props.state.age}
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
              value={this.props.state.gender}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <a className="btn btn-success" onClick={this.props.clearFilters}>
              Clear
            </a>
          </div>
        </div>
      </form>
    );
  }
});
