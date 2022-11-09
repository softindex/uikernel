/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import columns from '../columns';
import model from '../model';
import UIKernel from 'uikernel';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {model};
  }

  render() {
    return (
      <div>
        <UIKernel.Grid
          model={this.state.model} // Grid model
          columns={columns} // columns configuration
          viewCount={10}
        />
      </div>
    );
  }
}

export default MainComponent
