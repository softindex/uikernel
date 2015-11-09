---
title: Sorting and pagination
id: sorting-and-pagination
prev: first-grid-component.html
next: applying-filters.html
---

Let's teach our grid to sort column data and use pagination.

* [Live demo](/examples/sorting-and-pagination/){:target="_blank"}
* [Code]({{site.github}}_site/examples/sorting-and-pagination){:target="_blank"}

### Main component

We can modify our UIKernel.Grid props by adding pagination configuration. In this example, we're going to display 10 records as the default.

`MainComponent.jsx`:
{% highlight javascript %}
<UIKernel.Grid
  model={this.state.model}
  cols={columns}
  viewCount={10}
/>
{% endhighlight %}

### Columns configuration

We can also specify sortCycle for a certain column.

`columns.jsx`:
{% highlight javascript %}
var columns = {
  name: {
    name: 'First Name',
    sortCycle: ['asc', 'desc', 'default'], // sort cycle
    render: ['name', function (record) {
      return record.name;
    }]
  },

  // ...
};
{% endhighlight %}
