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
      date: '2003-05-01'
    };
  },
  handleChanges: function (newDate) {
    this.setState({date: newDate});
  },
  render: function () {
    return (
      <div className="container">
        <span>Date: {this.state.date}</span>
        <br/>
        <UIKernel.Editors.DatePicker
          ref="datepicker"
          format="yy-mm-dd"
          textFormat="DD, d MM, yy"
          onChange={this.handleChanges}
          min="2003-01-01"
          max="2003-12-31"
          value={this.state.date}
          />
      </div>
    );
  }
});
