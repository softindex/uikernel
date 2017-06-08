/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var PieChart = React.createClass({
  componentDidMount: function () {
    this.updateChart(this.props);
  },
  componentWillReceiveProps: function (props) {
    this.updateChart(props);
  },
  updateChart: function (props) {
    if (!props.data) {
      return;
    }

    var chartData = props.data.map(function (record) {
      return {
        label: record[props.dimension + 'Name'] || record[props.dimension],
        data: record[props.measure]
      };
    }.bind(this));
    $.plot(this.getDOMNode(), chartData, {
      series: {
        pie: {
          show: true,
          label: false
        }
      },
      legend: {
        show: false
      },
      grid: {
        hoverable: true
      },
      tooltip: {
        show: true,
        content: '%s: %n ' + _.capitalize(props.measure),
        shifts: {
          x: 10,
          y: 20
        }
      }
    });
  },
  render: function () {
    return <div className="chart"/>;
  }
});
