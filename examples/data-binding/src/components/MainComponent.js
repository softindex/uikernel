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
    this.state = {
      model: model // let's store model in the state
    };
    this.saveChanges = this.saveChanges.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
  }

  saveChanges() {
    this.grid.save()
      .catch(function () {
        alert('Error');
      });
  }

  clearChanges() {
    this.grid.clearAllChanges();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h3>Grid with autosave</h3>
            <UIKernel.Grid
              model={this.state.model} // Grid model
              columns={columns} // columns configuration
              defaultViewCount={10}
              autoSubmit={true}
            />
          </div>
          <div className="col-sm-6">
            <h3>Grid without autosave</h3>
            <UIKernel.Grid
              ref={(grid) => this.grid = grid}
              model={this.state.model}
              columns={columns}
              defaultViewCount={10}
            />
            <a href="#" className="btn btn-default" onClick={this.clearChanges}>Clear</a>
            {' '}
            <a href="#" className="btn btn-primary" onClick={this.saveChanges}>Save</a>
          </div>
        </div>
      </div>
    );
  }
}

export default MainComponent
