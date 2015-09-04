/**
 * Copyright 2015, SoftIndex LLC.
 */
var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model // let's store model in the state
    };
  },
  applyFilters: function (filters) {
    console.log(UIKernel.applyGridFilters(model, filters));
    this.setState({
      model: UIKernel.applyGridFilters(model, filters)
    });
  },
  onSave: function () {
    this.refs.grid.save(function (err) {
      if (err) {
        alert('Error');
      }
    });
  },
  onClear: function () {
    this.refs.grid.clearAllChanges();
  },
  render: function () {
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Filters</h3>
          </div>
          <div className="panel-body">
            <FiltersForm
              onSubmit={this.applyFilters}
            />
          </div>
        </div>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Records</h3>
          </div>
          <div className="panel-body padding0">
            <UIKernel.Grid
              ref="grid"
              model={this.state.model} // Grid model
              cols={columns} // columns configuration
              viewCount={10} // 10 records limit to display by default
            />
          </div>
          <div className="panel-footer">
            <button className="btn btn-success" onClick={this.onClear}>
              Clear
            </button>
            {' '}
            <button className="btn btn-primary" onClick={this.onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
});
