/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import columns from '../columns';
import model from '../model';
import UIKernel from 'uikernel';
import Form from './Form';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: model,
      cols: {
        // display name, surname, phone by default
        name: true,
        surname: true,
        phone: true,
        // hide age, gender
        age: false,
        gender: false
      }
    };

  }

  render() {
    return (
      <div>
        <Form
          columns={ this.state.cols}
          onChange ={
            (cols) => {
              this.setState({cols})
            }
          }
        />
        <UIKernel.Grid
          columns={columns}
          model={this.state.model}
          viewColumns={this.state.cols}
          viewCount={20}
        />
      </div>
    );
  }
}

export default MainComponent
