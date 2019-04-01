import React from 'react';
import UIKernel from 'uikernel';
import countries from '../countriesList';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryId: 'AD'
    };
    this.updateCountry = this.updateCountry.bind(this);
  }

  updateCountry(countryId) {
    this.setState({countryId});
  }

  render() {
    return (
      <div className="container">
        <UIKernel.Editors.SuggestBox
          model={countries}
          onChange={this.updateCountry}
          select={true}
          value={this.state.countryId}
        />
      </div>
    );
  }
}

export default MainComponent