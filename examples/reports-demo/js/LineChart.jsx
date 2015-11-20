/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

var LineChart = React.createClass({
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
      return [
        new Date(record[props.dimension]).getTime(),
        record[props.measure]
      ];
    }.bind(this));

    $.plot(this.getDOMNode(), [chartData], {
      xaxis: {
        mode: 'time'
      },
      grid: {
        borderWidth: {top: 1, right: 1, bottom: 1, left: 1},
        hoverable: true
      },
      tooltip: {
        show: true,
        content: '%x: %y ' + _.capitalize(props.measure),
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
