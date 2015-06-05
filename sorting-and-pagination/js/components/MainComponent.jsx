var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model // let's store model in the state
    };
  },
  render: function () {
    return (
      <UIKernel.Grid
        model={this.state.model} // Grid model
        cols={columns} // columns configuration
        viewCount={10} // 10 records limit to display by default
      />
    );
  }
});
