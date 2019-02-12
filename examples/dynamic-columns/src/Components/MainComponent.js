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
          cols={ this.state.cols}
          onChange ={
            (cols) => {
              this.setState({cols})
            }
          }
        />
        <UIKernel.Grid
          cols={columns}
          model={this.state.model}
          viewColumns={this.state.cols}
          viewCount={20}
        />
      </div>
    );
  }
}

export default MainComponent
