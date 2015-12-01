---
title: Reports example
id: reports-example
prev: suggest-box.html
---

Simple reports usage example.

* [Live demo](/examples/reports/){:target="_blank"}
* [Code]({{ site.github }}/examples/reports){:target="_blank"}

---

Let's create a model and specify the path to cube API.

`reportsModel.js`:
{% highlight javascript %}
var reportsModel = UIKernelReports.createXhrModel('http://localhost:7777');
{% endhighlight %}
---

Next, we'll define a function for generating columns.

`columnsBuilder.js`:
{% highlight javascript %}
function columnsBuilder(dimensions, measures) {
  var columns = {};

  ['date', 'publisher', 'advertiser', 'campaign', 'banner'].forEach(function (dimension) {
    if (dimensions.indexOf(dimension) >= 0) {
      columns[dimension] = {
        name: _.capitalize(dimension), // Capitalize names
        sortCycle: ['desc', 'asc', 'default'],
        render: [function (record) { // Dimensions don't contain dependencies in render function
          return record[dimension];
        }]
      };
    }
  });

  ['impressions', 'clicks', 'conversions', 'revenue'].forEach(function (measure) {
    if (measures.indexOf(measure) >= 0) {
      columns[measure] = {
        name: _.capitalize(measure),
        sortCycle: ['desc', 'asc', 'default'],
        render: [measure, function (record) {
          if (measure === 'revenue') {
            return record[measure].toFixed(2);
          }
          return record[measure];
        }]
      };
    }
  });

  return columns;
}
{% endhighlight %}
---

Now let's build `MainComponent`.

`MainComponent.jsx`:
{% highlight javascript %}
var MainComponent = React.createClass({
  mixins: [UIKernelReports.mixin],
  getInitialState: function () {
    return {
      reportsDimensions: ['advertiser'],
      reportsColumns: columnsBuilder,
      reportsModel: reportsModel,
      reportsMeasures: ['impressions', 'clicks', 'conversions', 'revenue'],
      reportsDrillDowns: []
    };
  },
  onSelectDimension: function (drillDown, nextDimensions) {
    // Pass DrillDown further and set next dimension
    this.setState({
      reportsDrillDowns: this.state.reportsDrillDowns.concat(drillDown),
      reportsDimensions: nextDimensions
    });
  },
  render: function () {
    if (!this.isReportsReady()) {
      return <span>Loading...</span>;
    }

    return (
      <UIKernel.Component
        cols={this.getReportsColumns()}
        model={this.getReportsGridModel()}
        viewCount={20}
      />
    );
  }
});
{% endhighlight %}
---

Finally, let's render our `MainComponent`.

`main.jsx`:
{% highlight javascript %}
React.render(<MainComponent/>, document.getElementById("example"));
{% endhighlight %}
