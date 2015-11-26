---
title: Reports mixin
id: reports-mixin
prev: form-xhr-model.html
next: reports-model.html
---

Reports allow to analyze business intelligence data conveniently to identify trends and generate insights from custom reports. Data to display is retrieved from [OLAP cube](reports-interface.html).

To display a table that retrieves data from the OLAP cube, you need to include a special mixin:

{% highlight javascript %}
var MainComponent = React.createClass({
  mixins: [UIKernelReports.mixins]
  ...
{% endhighlight %}

`UIKernelReports.mixins` generates Grid model, columns configuration and filters depending on current settings.

---

## Settings

All report settings are stored in state:

| Type                               | Name                  | Description                               |
|------------------------------------|-----------------------|-------------------------------------------|
| string[]                           | **reportsDimensions** | Current Dimensions                        |
| string[]                           | **reportsMeasures**   | Limit used measures                       |
| Function                           | **reportsColumns**    | Function for columns generation           |
| [ReportsModel](reports-model.html) | **reportsModel**      | Reports model constructor                 |
| Array[]                            | reportsDrillDowns     | DrillDown's, that need to be applied      |
| Object                             | reportsFilters        | Filter values                             |
| Object                             | reportsNames          | Dimension display names                   |
| Function                           | reportsErrorHandler   | Error handler                             |

---

### reportsColumns

`reportsColumns` accepts function value for columns generation and should depend on such arguments:
{% highlight javascript %}
Object function columnsBuilder(string[] dimensions, string[] measures)
{% endhighlight %}
Accepts dimensions and measures arguments which need to be displayed in the table and where the
function should return columns configuration using them.

> Columns, which display dimension, shouldn't specify dependencies in `render`

---

## Render

{% highlight javascript %}
  render: function () {
    if (!this.isReportsReady()) {
      return <span>Loading...</span>;
    }

    return (
      <UIKernel.Grid
        cols={this.getReportsColumns()}
        model={this.getReportsGridModel()}
      />
    );
  }
{% endhighlight %}

---

## Methods for data retrieving

* **getReportsFilters()**
Filter values that can be displayed

* **getReportsDrillDowns()**
Available DrillDowns list

* **getReportsMeasures()**
Available measures list

* **getReportsGridModel()**
Table model

* **getReportsColumns()**
Table configuration

* **getReportsBreadcrumbs()**
Breadcrumbs

* **getDimensionName()**
Dimension name

* **getCubeFilters()**
Filter values and drillDowns in a single object. Used as filters for ReportsModel.

* **isReportsReady()**
Are reports ready flag

* **isReportsLoading()**
Are reports loading flag

---

## Handlers

DrillDown processing
{% highlight javascript %}
onSelectDimension: function (drillDown, nextDimensions) {
  this.setState({
    reportsDrillDowns: this.state.reportsDrillDowns.concat(drillDown),
    reportsDimensions: nextDimensions
  });
}
{% endhighlight %}

---

## Others

* **reportsFixFilters(filters, defaults)**
Parses composite filters and sets default values. Is used before applying filters to the state.

* **forceReportsUpdate()**
