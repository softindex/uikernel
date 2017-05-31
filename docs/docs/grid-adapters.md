---
title: Grid to Form adapters
id: grid-adapters
prev: filter-adapter.html
next: grid-export.html
---


## UIKernel.Adapters.Grid.toForm**Create**

Adapter that uses a Grid model([Abstract Grid Model](/docs/grid-interface.html)) for creating new records.

{% highlight javascript %}
new UIKernel.Adapters.Grid.ToFormCreate(AbstractGridModel model, Object initialData)
{% endhighlight %}

### submit

{% highlight javascript %}
submit(Object record, function callback)
{% endhighlight %}

Create a new record.

Check out [Usage Example](creating-records.html).

---

## UIKernel.Adapters.Grid.toForm**Update**

Adapter that uses a Grid model([AbstractGridModel](/docs/grid-interface.html)) for updating records.

{% highlight javascript %}
new UIKernel.Adapters.Grid.ToFormUpdate(AbstractGridModel model, any id)
{% endhighlight %}

### submit

{% highlight javascript %}
 submit (Object changes, function callback)
{% endhighlight %}

Apply form changes.

Check out [Usage Example](suggest-box.html).

---
