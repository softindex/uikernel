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
      model: model
    };
  },
  save: function () {
    this.refs.grid.save()
      .catch(() => {
        alert('Error');
      });
  },

  clear: function () {
    this.refs.grid.clearAllChanges();
  },

  render: function () {
    return (
      <div>
        <UIKernel.Grid
          ref="grid"
          cols={columns}
          model={this.state.model}
          viewCount={10}
        />
        <a className="btn btn-success" onClick={this.save}>Save</a>
        {' '}
        <a className="btn btn-success" onClick={this.clear}>Clear</a>
      </div>
    );
  }
});
