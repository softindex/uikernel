---
title: Filters
id: filter-adapter
prev: validator.html
next: grid-adapters.html
---

Use applyFilters to make the model work with a default set of filters.

### applyFilters

{% highlight javascript %}
AbstractGridModel applyFilters(AbstractGridModel model, Object filters)
{% endhighlight %}

Set default filters to the GridModel.

## Example
{% highlight javascript %}
 var modelWithFilters = UIKernel.applyFilters(GridModel, filters) 
 // Returns new filtered model
{% endhighlight %}

Now utilizing the default set of filters instead of the old filter.
