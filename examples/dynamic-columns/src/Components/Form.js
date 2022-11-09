/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import columns from '../columns';
import React from 'react';
import {Button, Modal} from 'react-bootstrap';

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

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols:{...this.props.cols}, // Copy all columns
      showModal: false

    };
    this.applyChanges = this.applyChanges.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);

  }
  toggleModal(isShow){
    this.setState({showModal: isShow})
  }
  applyChanges() {
    this.props.onChange({...this.state.cols});
    this.toggleModal(false)
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
    const {showModal} = this.state;
    return (
      <>
      <Button variant="outline-secondary" onClick={(e)=>this.toggleModal(true)}>
        Columns
      </Button>
      <Modal show={showModal} onHide={(e)=>this.toggleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Columns</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary"  onClick={(e)=>this.toggleModal(false)}>
            Close
          </Button>
          <Button variant="primary"  onClick={this.applyChanges}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
      </>

    );
  }
}

export default Form
