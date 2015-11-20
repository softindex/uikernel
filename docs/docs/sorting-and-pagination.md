---
title: Sorting and pagination
id: sorting-and-pagination
prev: first-grid-component.html
next: applying-filters.html
---

We have the list of data displayed all nicely. Now let's add our grid some functionality, such as sorting and pagination.

* [Live demo](/examples/sorting-and-pagination/){:target="_blank"}
* [Code]({{site.github}}_site/examples/sorting-and-pagination){:target="_blank"}


To create pagination, we'll pass our `UIKernel.Grid` the `viewCount` property. In this example, we’re going to display 10 records per page.

`MainComponent.jsx`:
{% highlight javascript %}
<UIKernel.Grid
  model={this.state.model}
  cols={columns}
  viewCount={10} // display 10 records per page
/>
{% endhighlight %}
---

Next, we’ll be adding a way to sort our grid data. We just have to pass the `sortCycle` property to our columns.

`columns.jsx`:
{% highlight javascript %}
var columns = {
  name: {
    name: 'First Name',
    sortCycle: ['asc', 'desc', 'default'], // add sorting
    render: ['name', function (record) {
      return record.name;
    }]
  },

  // ...
};
{% endhighlight %}
---

Now as you click your grid headers, you’ll see your grid sorted by ascending or descending.

