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
      form: {}
    };
    this.updateFormState =this.updateFormState.bind(this);
  }

  updateFormState(newFormState) {
    this.setState({form: newFormState});
  }

  render() {
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
                  ref={(grid) => this.grid = grid}
                  model={model}
                  cols={columns}
                  autoSubmit={true}
                />
                <Form
                  state={this.state.form}
                  onChange={this.updateFormState}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
