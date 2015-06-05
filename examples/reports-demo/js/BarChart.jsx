var BarChart = React.createClass({
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
        record[props.dimension + 'Name'] || record[props.dimension],
        record[props.measure]
      ];
    }.bind(this));

    $.plot(this.getDOMNode(), [chartData], {
      series: {
        bars: {
          show: true,
          barWidth: 0.6,
          align: "center"
        }
      },
      xaxis: {
        mode: "categories",
        tickLength: 0,
        font: {
          size: 0
        }
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
