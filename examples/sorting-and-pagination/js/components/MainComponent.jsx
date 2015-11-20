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
  render: function () {
    return (
      <UIKernel.Grid
        model={this.state.model} // Grid model
        cols={columns} // columns configuration
        viewCount={10} // 10 records limit to display by default
      />
    );
  }
});
