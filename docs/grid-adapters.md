---
title: Grid to Form adapters
id: grid-adapters
prev: filter-adapter.html
next: express-grid-api.html
---

 
## UIKernel.Adapters.Grid.toForm**Create**
 
Adapter which utilizes Grid as a model([AbstractGridModel](/docs/grid-interface.html)) for new form record creation

{% highlight javascript %}
 UIKernel.Adapters.Grid.toFormCreate(AbstractGridModel model, Object initialData)
{% endhighlight %}

### submit
 
{% highlight javascript %}
submit(Object record, function callback(string error, number recordId))
{% endhighlight %}

Creating a new record.

---

## UIKernel.Adapters.Grid.toForm**Update**
 
Adapter that allows us to use Grid model record([AbstractGridModel](/docs/grid-interface.html)) as a form model

{% highlight javascript %}
 UIKernel.Adapters.Grid.toFormUpdate(AbstractGridModel model, any id)
{% endhighlight %}

### submit
 
{% highlight javascript %}
 submit (Object changes, function callback(string error, Object changes))
{% endhighlight %}

Applies form changes.

---
