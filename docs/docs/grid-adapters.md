---
title: Grid to Form adapters
id: grid-adapters
prev: filter-adapter.html
next: grid-export.html
---

These adapters are used to adapt [Grid Model](/docs/grid-interface.html) interface
to [Form Model](/docs/form-interface.html) interface,
so that you can pass a grid model instance into a [form service](/docs/form-service.html)
and create or update grid records by means of a form controlled by that form service.

## UIKernel.Adapters.Grid.toForm**Create**

An adapter that converts the passed [Grid Model](/docs/grid-interface.html) into [Form Model](/docs/form-interface.html)
for creating new records of the grid on a separate form.

{% highlight javascript %}
  const adaptedGridToFormModel = new UIKernel.Adapters.Grid.ToFormCreate(model, initialData);
{% endhighlight %}

**Parameters**:

| Type                                   | Name        | Description                  |
|----------------------------------------|-------------|------------------------------|
| [GridModel](/docs/grid-interface.html) | model       | *Required*. The instance of a Grid model |
| Object                                 | initialData | *Optional*. Initial form data in the next format {'field1': 'value1', 'field2': 'value2', ...} |

**Returns**: new object with interface similar to [Form Model](/docs/form-interface.html).

### async submit

{% highlight javascript %}
  await adaptedGridToFormModel.submit(record);
{% endhighlight %}

Create a new `record` in the grid.

**Parameters**:

| Type   | Name   | Description                  |
|--------|--------|------------------------------|
| Object | record | *Required*. Record to be created in the grid. It is expected to be in the next format {'field1': 'value1', 'field2': 'value2', ...} |

> Check out [Usage Example](creating-records.html).

---

## UIKernel.Adapters.Grid.toForm**Update**

An adapter that converts the passed [Grid Model](/docs/grid-interface.html) into [Form Model](/docs/form-interface.html)
for updating specified grid record on a separate form.

{% highlight javascript %}
  const adaptedGridToFormModel = new UIKernel.Adapters.Grid.ToFormUpdate(model, id);
{% endhighlight %}

**Parameters**:

| Type                                   | Name    | Description                  |
|----------------------------------------|---------|------------------------------|
| [GridModel](/docs/grid-interface.html) | model   | *Required*. The instance of a Grid model. |
| Any                                    | id      | *Required*. Id of the grid record to be updated. |

**Returns**: new object with interface similar to [Form Model](/docs/form-interface.html).

### async submit

{% highlight javascript %}
  await adaptedGridToFormModel.submit(changes);
{% endhighlight %}

Apply form `changes` on the grid.

**Parameters**:

| Type   | Name    | Description                  |
|--------|---------|------------------------------|
| Object | changes | *Required*. Changed grid record data to be applied on the grid. It is expected to be in the next format {'field1': 'value1', 'field2': 'value2', ...} |

> Check out [Usage Example](/docs/form-example.html).
