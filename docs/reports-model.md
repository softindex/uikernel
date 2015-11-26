---
title: Reports Model
id: reports-model
prev: reports-mixin.html
next: reports-filters.html
---

Model allows to retrieve data to display in OLAP cube.

## XHR Model

There's a client model implementation, that interacts with cube via API.

{% highlight javascript %}
var model = UIKernel.createReportsXhrModel(string apiUrl, [Object xhr]);
{% endhighlight %}

## HTTP Model

There’s a server model implementation, that interacts with remote cube server.

{% highlight javascript %}
var model = UIKernel.createReportsHttpModel({
  host: 'localhost',
  port: 80
});
{% endhighlight %}

## REST API

| Method | URL         | Description                                                                                |
|--------|-------------|--------------------------------------------------------------------------------------------|
| GET    | /           | Read data from cube                                                                   |
| GET    | /info       | Retrieve information about what dimensions, mesuares and drillDowns are available to display |
| GET    | /dimensions | Get dimensions IDs, that can be values of the certain fitler |

---

## Model Interface

### getData

{% highlight javascript %}
 getData(string[] dimensions, string[] measures, Object filters, function callback)
{% endhighlight %}

Get requested data from cube.

---

### getInfo

{% highlight javascript %}
 getInfo(string[] dimensions, string[] measures, Object filters, function callback)
{% endhighlight %}

Get requested information from cube.

**info:**

| Type     | Name       | Description                 |
|----------|------------|-----------------------------|
| string[] | drillDowns | Available DrillDowns list |
| string[] | measures   | Available measures list     |

---

### getDimensions

{% highlight javascript %}
getDimensions(
  string dimension,
  string[] measures,
  Object filters,
  function callback
)
{% endhighlight %}

Get the list of available values for the filter using certain dimension

---

## Replacing ID in result

To replace IDs with a names you need to declare reportsModel, that is going to call OLAP cube methods and replace IDs
with appropriate names. To replace IDs in breadcrumbs you need to return an addition parameter `names` in the
getInfo method, that stores string correspondences for every dimension.

{% highlight javascript %}
reportsModel.getInfo = function (dimensions, measures, filters, cb) {
  cube.getInfo(dimensions, measures, filters, function (err, info) {
    info.names = {};

    if (this.filters.userId) {
       info.names.userId = this.getUserName(this.filters.userId);
    }

    cb(null, info);
  });
};
{% endhighlight %}

> User name is determined by a synchronous function call in this example. In most cases string name can be obtained
by only asynchronous calls. We recommend to use something like Promise, Generators or Async/Await for these purposes.
