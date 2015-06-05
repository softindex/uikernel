/**
 * Copyright 2015, SoftIndex LLC.
 */
var MainComponent = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Records</h3>
              </div>
              <div className="panel-body padding0">
                <UIKernel.Grid
                  ref="grid"
                  model={model}
                  cols={columns}
                />
                <Form />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
