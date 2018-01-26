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
      value: 2,
      label: 'Option 2'
    };
    this.options = [[null, ''], [1, 'Option 1'], [2, 'Option 2'], [3, 'Option 3'], [4, 'Option 4'], [5, 'Option 5']];
    this.handleChange = this.handleChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
  }

  handleChange(newValue) {
    this.setState({value: newValue});
  }

  handleLabelChange(newLabel) {
    this.setState({label: newLabel});
  }

  render() {
    return (
      <div className="container">
        <span>Selected: {this.state.label}</span>
        <br />
        <UIKernel.Editors.Select
          ref={(select) => this.select = select}
          onChange={this.handleChange}
          onLabelChange={this.handleLabelChange}
          value={this.state.value}
          options={this.options}
        />
      </div>
    );
  }
}




