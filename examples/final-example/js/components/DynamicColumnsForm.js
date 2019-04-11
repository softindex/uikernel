/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class FormCheckbox extends React.Component {
  onChangeHandler() {
    this.props.onChange(!this.props.value); // Change state of our value
  }

  render() {
    const id = `col-${this.props.id}`;

    return (
      <div className="row">
        <div className="col-lg-3">
          <input
            id={id}
            type="checkbox"
            checked={this.props.value}
            onChange={this.onChangeHandler.bind(this)}
          />
        </div>
        <div className="col-lg-9">
          <label htmlFor={id}>{this.props.label}</label>
        </div>
      </div>
    );
  }
}

class DynamicColumnsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: _.clone(this.props.cols) // Copy all columns
    };
    this.applyChanges = this.applyChanges.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  applyChanges() {
    this.props.onChange(_.clone(this.state.cols));
  }

  onChangeCheckbox(key, value) {
    // Change checkbox value
    this.setState({
      cols: {
        ...this.state.cols,
        [key]: value
      }
    });
  }

  render() {
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
              { _.map(_.omit(columns, ['bulk', 'tools']), function (value, key) {
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
}