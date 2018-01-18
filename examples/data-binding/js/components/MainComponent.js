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
    this.state = {
      model: model // let's store model in the state
    };
    this.saveChanges = this.saveChanges.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
  }

  saveChanges() {
    this.refs.grid.save()
      .catch(function () {
        alert('Error');
      });
  }

  clearChanges() {
    this.refs.grid.clearAllChanges();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h3>Grid with autosave</h3>
            <UIKernel.Grid
              model={this.state.model} // Grid model
              cols={columns} // columns configuration
              viewCount={10}
              autoSubmit={true}
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
            <a className="btn btn-default" onClick={this.clearChanges}>Clear</a>
            {' '}
            <a className="btn btn-primary" onClick={this.saveChanges}>Save</a>
          </div>
        </div>
      </div>
    );
  }
}
