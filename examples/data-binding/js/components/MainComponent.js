/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model // let's store model in the state
    };
  },
  onSave: function () {
    this.refs.grid.save()
      .catch(function () {
        alert('Error');
      });
  },
  onClear: function () {
    this.refs.grid.clearAllChanges();
  },
  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h3>Grid with autosave</h3>
            <UIKernel.Grid
              model={this.state.model} // Grid model
              cols={columns} // columns configuration
              viewCount={10}
              realtime={true}
              />
          </div>
          <div className="col-sm-6">
            <h3>Grid without autosave</h3>
            <UIKernel.Grid
              ref="grid"
              model={this.state.model}
              cols={columns}
              viewCount={10}
              />
            <a className="btn btn-success" onClick={this.onClear}>Clear</a>
            {' '}
            <a className="btn btn-primary" onClick={this.onSave}>Save</a>
          </div>
        </div>
      </div>
    );
  }
});
