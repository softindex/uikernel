---
title: Filters
id: filter-adapter
prev: grid-model-collection.html
next: grid-adapters.html
---

Use applyFilters to make the model work with a default set of filters.

### applyFilters

{% highlight javascript %}
  const modelWithFilters = UIKernel.applyGridFilters(model, filters);
{% endhighlight %}

Set default filters for a grid model. Under the hood it just decorates model's read method adding the filters to it's `options` parameter.

**Parameters**:

| Type                                    | Name    | Description                  |
|-----------------------------------------|---------|------------------------------|
| [Grid Model](/docs/grid-interface.html) | model   | *Required*. The instance of a Grid model. |
| Object                                  | filters | *Required*. Filters to be applied. The object is expected to have the next structure: |
|                                         |         |             {fieldName1: 'value1', fieldName2: 'value2', ...}  |

**Returns**: decorated `model` with applied filters.

> Check out [Usage Example](applying-filters.html).
