/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model // let's store model in the state
    };
  },

  applyFilters: function (filters) {
    this.setState({
      model: UIKernel.applyGridFilters(model, filters)
    });
  },

  onSave: function () {
    this.refs.grid.save()
      .catch(() => {
        alert('Error');
      });
  },

  onClear: function () {
    this.refs.grid.clearAllChanges();
  },

  render: function () {
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Filters</h3>
          </div>
          <div className="panel-body">
            <FiltersForm
              onSubmit={this.applyFilters}
            />
          </div>
        </div>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Records</h3>
          </div>
          <UIKernel.Grid
            ref="grid"
            model={this.state.model} // Grid model
            cols={columns} // columns configuration
            viewCount={10} // 10 records limit to display by default
            warningsValidator = {ValidationWarn}
          />
          <div className="panel-footer">
            <a className="btn btn-success" onClick={this.onClear}>
              Clear
            </a>
            {' '}
            <a className="btn btn-primary" onClick={this.onSave}>
              Save
            </a>
          </div>
        </div>
      </div>
    );
  }
});
