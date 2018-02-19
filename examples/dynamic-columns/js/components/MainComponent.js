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
    this.openColumnsForm = this.openColumnsForm.bind(this);
  }

  openColumnsForm() {
    //open modal with our information (you can use your own modal)
    const columnsWindow = popup.open(Form, {
      cols: this.state.cols,
      onChange: (cols) => {
        columnsWindow.close();
        this.setState({cols});
      }
    }, "opened");
  }

  render() {
    return (
      <div>
        <a className="btn btn-default" onClick={this.openColumnsForm}>
          <i className="fa fa-th-list"></i>{' '}Columns
        </a>
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