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

  onChangeFiltersHandler: function (filters) {
    this.setState({
      model: UIKernel.applyGridFilters(model, filters)
    });
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
              onSubmit={this.onChangeFiltersHandler}
            />
          </div>
        </div>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Records</h3>
          </div>
            <UIKernel.Grid
              model={this.state.model} // Grid model
              cols={columns} // columns configuration
              viewCount={10} // 10 records limit to display by default
            />
        </div>
      </div>
    );
  }
});
