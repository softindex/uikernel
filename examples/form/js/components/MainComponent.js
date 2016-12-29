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
      form: {}
    };
  },

  onFormStateHandler: function (newFormState) {
    this.setState({form: newFormState});
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Records</h3>
              </div>
              <div className="panel-body padding0">
                <UIKernel.Grid
                  ref="grid"
                  model={model}
                  cols={columns}
                  autoSubmit={true}
                />
                <Form
                  state={this.state.form}
                  stateHandler={this.onFormStateHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
