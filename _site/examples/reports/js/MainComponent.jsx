/**
 * Copyright 2015, SoftIndex LLC.
 */
var MainComponent = React.createClass({
  mixins: [UIKernelReports.mixin],
  getInitialState: function () {
    return {
      reportsDimensions: ['advertiser'],
      reportsColumns: columnsBuilder,
      reportsModel: reportsModel,
      reportsMeasures: ['impressions', 'clicks', 'conversions', 'revenue'],
      reportsDrillDowns: [],
      reportsNames: dimensionNames
    };
  },
  onSelectDimension: function (drillDown, nextDimensions) {
    this.setState({
      reportsDrillDowns: this.state.reportsDrillDowns.concat(drillDown),
      reportsDimensions: nextDimensions
    });
  },
  render: function () {
    if (!this.isReportsReady()) {
      return <span>Loading...</span>;
    }

    var lastDimension = this.state.reportsDimensions[this.state.reportsDimensions.length - 1];
    var currentPage = dimensionNames[lastDimension];

    return (
      <div>
        {this.getReportsBreadcrumbs().map(function (crumb, key) {
          return <span key={key}>{crumb.param}({crumb.value}) &gt; </span>;
        })}
        <b>{currentPage}</b>
        <UIKernel.Grid
          cols={this.getReportsColumns()}
          model={this.getReportsGridModel()}
          viewCount={20}
        />
      </div>
    );
  }
});