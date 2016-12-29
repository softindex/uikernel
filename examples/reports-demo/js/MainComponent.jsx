/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
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
      reportsNames: dimensionNames,
      reportsFilters: {
        date: ['between', ['2015-01-01', '2015-03-31']]
      }
    };
  },
  onSelectDimension: function (drillDown, nextDimensions) {
    this.setState({
      reportsDrillDowns: this.state.reportsDrillDowns.concat(drillDown),
      reportsDimensions: nextDimensions
    });
  },
  setPage: function (drillDownIndex) {
    this.state.reportsDimensions = [this.state.reportsDrillDowns[drillDownIndex][0]];
    this.state.reportsDrillDowns.splice(drillDownIndex, this.state.reportsDrillDowns.length);
    this.forceReportsUpdate();
  },
  setFilters: function (filters) {
    this.setState({
      reportsFilters: filters
    });
  },
  render: function () {
    if (!this.isReportsReady()) {
      return <span>Loading...</span>;
    }

    var lastDimension = this.state.reportsDimensions[this.state.reportsDimensions.length - 1];
    var currentPage = dimensionNames[lastDimension];

    return (
      <div className="container">
        <ol className="breadcrumb">
          {this.getReportsBreadcrumbs().map(function (crumb, key) {
            return <li><a href="#" onClick={this.setPage.bind(null, key)}>{crumb.param}({crumb.value})</a></li>;
          }, this)}
          <li className="active">{currentPage}</li>
        </ol>
        <FiltersForm
          filters={this.getReportsFilters()}
          onSubmit={this.setFilters}
        />
        <Charts
          dimensions={this.state.reportsDimensions}
          measures={this.getReportsMeasures()}
          filters={this.getCubeFilters()}
        />
        <UIKernel.Grid
          cols={this.getReportsColumns()}
          model={this.getReportsGridModel()}
          viewCount={20}
        />
      </div>
    );
  }
});