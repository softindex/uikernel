/**
 * Copyright 2015, SoftIndex LLC.
 */
var MainComponent = React.createClass({
  getInitialState: function () { // add cols - state to our initial states
    return {
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
  },

  openColumnsForm: function openColumnsForm() {
    //open modal with our information (you can use your own modal)
    var columnsWindow = popup.open(Form, {
      cols: this.state.cols,
      onChange: function onChange(cols) {
        columnsWindow.close();
        this.setState({cols: cols});
      }.bind(this)
    }, "opened");
  },

  render() {
    return (
      <div>
        <div>
          <a className="btn btn-success" onClick={this.openColumnsForm}>
            <i className="fa fa-th-list"></i>{' '}Columns
          </a>
          <UIKernel.Grid
            cols={columns}
            model={this.state.model}
            viewColumns={this.state.cols}
            viewCount={20}
            />
        </div>
      </div>
    );
  }
});