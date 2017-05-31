/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var Charts = React.createClass({
  getInitialState: function () {
    return {
      data: null,
      measure: this.props.measures[0]
    };
  },
  componentDidMount: function () {
    this.updateData(this.props);
  },
  componentWillReceiveProps: function (props) {
    if (props.measures.indexOf(this.state.measure) < 0) {
      this.state.measure = props.measures[0];
    }
    if (this.props.dimensions !== props.dimensions) {
      this.updateData(props);
    }
  },
  updateData: function (props) {
    this.state.data = null;

    if (props.dimensions.length > 1) {
      return;
    }

    reportsModel.getData(props.dimensions, props.measures, props.filters, function (err, data) {
      if (err) {
        throw err;
      }
      this.setState({data: data});
    }.bind(this));
  },
  changeMeasureHandler: function (e) {
    this.setState({
      measure: e.target.value
    });
  },
  render: function () {
    var chart = null;
    var props = {
      dimension: this.props.dimensions[0],
      measure: this.state.measure,
      data: this.state.data
    };

    if (!this.state.data || this.state.data.length < 2) {
      return null;
    }

    switch (props.dimension) {
      case 'date':
        chart = <LineChart {...props}/>;
        break;
      case 'advertiser':
        chart = <BarChart {...props}/>;
        break;
      default:
        chart = <PieChart {...props}/>;
    }

    return (
      <div className="charts-panel">
        <select onChange={this.changeMeasureHandler}>
          {this.props.measures.map(function (measure, key) {
            return <option key={key} value={measure}>{_.capitalize(measure)}</option>;
          })}
        </select>
        {chart}
      </div>
    );
  }
});