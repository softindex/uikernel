import React from 'react';
import columns from './columns';
import model from './model';
import UIKernel from 'uikernel';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {model};
  }

  render() {
    return (
      <div>
        <UIKernel.Grid
          model={this.state.model} // Grid model
          columns={columns} // columns configuration
        />
      </div>
    );
  }
}

export default MainComponent