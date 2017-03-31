/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {model}
  }

  render() {
    return (
      <div>
        <UIKernel.Grid
          model={this.state.model} // Grid model
          cols={columns} // columns configuration
          viewCount={10} //display 10 records per page
          />
      </div>
    );
  }
}
