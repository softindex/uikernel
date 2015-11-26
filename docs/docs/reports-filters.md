---
title: Reports Filters
id: reports-filters
prev: reports-model.html
next: dynamic-columns.html
---

## Simple filters

You can pass report filter values as a state parameter `reportsFilters`

{% highlight javascript %}
this.setState({
  reportsFilters: {
    country: 'US',
    status: 1,
    ...
  }
});
{% endhighlight %}

ReportsMixin will independently determine filters which should be displayed in the interface.
`this.getReportsFilters()` returns filters, that can be displayed in the filter editing form.

---

## Composite filters

If a dimension is child to the other one, then displaying filters will require additional actions.
This is due to the fact that the values of a child filter are composite when parent dimension value is indeterminate.

{% highlight javascript %}
// Example of possible values of the filter, that contains a drop down list for "child" dimension
[
  {"parent": 1, "child": 1},
  {"parent": 1, "child": 2},
  {"parent": 2, "child": 1},
  {"parent": 3, "child": 5}
]
{% endhighlight %}

> If we set `child` value without setting a `parent` will cause potential issues, as a `child` can belong to multiple `parent` components.

Thus a given `child` filter value will be an object that contains values of all indeterminate parent dimension values, additionally.

But ReportsMixin expects that `this.state.reportsFilters` does not contain composite filters.
So function `reportsFixFilters(filters, defaults)` is proposed to use before state overwriting.
This function converts composite filters to a simple form.

{% highlight javascript %}
this.setState({
  reportsFilters: this.reportsFixFilters(filters)
});
{% endhighlight %}

---

## ListModel in filters

Editors SuggestBox and Select are convenient for usage in filters. They need to request available ReportModel values to
display all variants OLAP Cube can provide indeed. It's necessary to create ReportModel with current (drillDowns,
CubeFilters) state in the ListModel and call getDimensions(dimension) method, that will return available values.

{% highlight javascript %}
// ListModel declaration and state pass
var model = new CountriesList(this.reportsDimensions, this.getCubeFilters());
{% endhighlight %}

{% highlight javascript %}
// Exmaple of the ListModel that interacts with cube

var cube = require('./cube');
var measures = require('./usedMeasures');

function CountriesList(filters) {
  this._filters = filters;
}

CountriesList.prototype.read = function (search, cb) {
  cube.getDimensions('country', measures, this._filters, function (err, availableVariants) {
    if (err) {
      return cb(err);
    }
    // Get all value variants as availableVariants:
    // [{"country": "US"},  {"country": "AU"}, ...]
    // If parent dimension is undefined for the filter their values will also be included to the result.

    // Return available countries list
    return availableVariants.map(function (variant) {
      return [variant.country, this.getCountryName(variant.country)];
    });
  });
};
{% endhighlight %}

