/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
