import columns from '../columns';
import React from 'react';

class FormCheckbox extends React.Component {
  onChangeHandler() {
    this.props.onChange(!this.props.value); // Change state of our value
  }

  render() {
    const id = `col-${this.props.id}`;

    return (
      <div className="form-check form-check-inline">
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

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols:{...this.props.cols} // Copy all columns
    };
    this.applyChanges = this.applyChanges.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);

  }

  applyChanges() {
    this.props.onChange({...this.state.cols});
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
        <div className="modal-content animated fadeIn">
          <div className="modal-body">
            <form className="form-horizontal">
              {
                Object.keys(columns).map((key)=>{
                  return(
                      <FormCheckbox
                          id={key}
                          key={key}
                          value={this.state.cols[key]}
                          label={columns[key].name}
                          onChange={this.onChangeCheckbox.bind(null, key)}
                      />
                  )
                })
              }
            </form>
          </div>
          <div className="modal-footer" >
            <button type= "submit" className="btn btn-primary" onClick={this.applyChanges}>Apply</button>
          </div>
        </div>
    );
  }
}

export default Form
