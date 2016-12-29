/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var options = [
  [null, ''], [1, 'Option 1'], [2, 'Option 2'], [3, 'Option 3'], [4, 'Option 4'], [5, 'Option 5']
];

var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      value: 2,
      label: 'Option 2'
    };
  },
  handleChange: function (newValue) {
    this.setState({value: newValue});
  },
  handleLabelChange: function (newLabel) {
    this.setState({label: newLabel})
  },
  render: function () {
    return (
      <div className="container">
        <span>Selected: {this.state.label}</span>
        <br />
        <UIKernel.Editors.Select
          ref="select"
          onChange={this.handleChange}
          onLabelChange={this.handleLabelChange}
          value={this.state.value}
          options={options}
          />
      </div>
    );
  }
});




