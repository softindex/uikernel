/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var FormCheckbox = React.createClass({
  onChangeHandler: function () {
    this.props.onChange(!this.props.value); // Change state of our value
  },

  render: function () {
    var id = 'col-' + this.props.id;
    return (
      <div className="row">
        <div className="col-lg-3">
          <input
            id={id}
            type="checkbox"
            checked={this.props.value}
            onChange={this.onChangeHandler}
          />
        </div>
        <div className="col-lg-9">
          <label htmlFor={id}>{this.props.label}</label>
        </div>
      </div>
    );
  }
});

var Form = React.createClass({
  getInitialState: function () {
    return {
      model: this.model,
      cols: _.clone(this.props.cols) // Take a copy of all columns
    };
  },

  applyChanges: function () {
    this.props.onChange(_.clone(this.state.cols));
  },

  onChangeCheckbox: function (key, value) { // Change out checkbox by key
    this.state.cols[key] = value;
    this.forceUpdate(); // and update it
  },

  render: function () {
    return (
      <div className="modal-dialog">
        <div className="modal-content animated fadeIn">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">Columns</h4>
          </div>
          <div className="modal-body">
            <form className="form-horizontal">
              { _.map(columns, function (value, key) {
                return (
                  <FormCheckbox
                    id={key}
                    key={key}
                    value={this.state.cols[key]}
                    label={value.name}
                    onChange={this.onChangeCheckbox.bind(null, key)}
                  />);
              }.bind(this))}
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-white" data-dismiss="modal">Cancel</button>
            <button type="submit" className="btn btn-primary" onClick={this.applyChanges}>Apply</button>
          </div>
        </div>
      </div>
    );
  }
});