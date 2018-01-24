---
title: Sorting and pagination
id: sorting-and-pagination
prev: first-grid-component.html
next: applying-filters.html
---
* [Live demo](/examples/sorting-and-pagination/){:target="_blank"}
* [Code](https://embed.plnkr.co/4j6Sj8EWGddQFzq5Z2O6/){:target="_blank"}

Let's add our grid some functionality, such as sorting and pagination.

To create pagination, we'll pass our `UIKernel.Grid` the `viewCount` property. In this example, we’re going to display 10 records per page.

`MainComponent.js`:
{% highlight javascript %}
<UIKernel.Grid
  model={this.state.model}
  cols={columns}
  viewCount={10} // display 10 records per page
/>
{% endhighlight %}

Next, we’ll pass the `sortCycle` property to columns. This will allow us to sort our grid data.

`columns.js`:
{% highlight javascript %}
const columns = {
  name: {
    name: 'First Name',
    sortCycle: ['asc', 'desc', 'default'], // add sorting
    render: ['name', record => record.name]
  },

  // ...
};
{% endhighlight %}

Now as you click your grid headers, you’ll see your grid sorted by ascending or descending.

