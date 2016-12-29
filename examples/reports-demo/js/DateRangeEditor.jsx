/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var DateRangeEditor = React.createClass({
  _set: function (index, value) {
    var range = this.props.value ? _.clone(this.props.value[1]) : null;
    if (!range) {
      range = [null, null];
    }
    range[index] = value;
    if (range[0] || range[1]) {
      this.props.onChange(['between', range]);
    } else {
      this.props.onChange(null);
    }
  },
  render: function () {
    var value = this.props.value && this.props.value[1];
    if (!value) {
      value = [null, null];
    }
    return (
      <div>
        <div className="col-sm-2">
          <label className="control-label">From</label>
          <UIKernel.Editors.DatePicker
            className="form-control"
            onChange={this._set.bind(null, 0)}
            value={value[0]}
            max={value[1]}
            format="yy-mm-dd"
          />
        </div>
        <div className="col-sm-2">
          <label className="control-label">To</label>
          <UIKernel.Editors.DatePicker
            className="form-control"
            onChange={this._set.bind(null, 1)}
            value={value[1]}
            min={value[0]}
            format="yy-mm-dd"
          />
        </div>
      </div>
    );
  }
});