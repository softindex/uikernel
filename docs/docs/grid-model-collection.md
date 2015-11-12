---
title: Grid Collection Model
id: grid-model-collection
prev: grid-model-xhr.html
next: validator.html
---

Grid Collection Model specifies a model that will work with array data passed to it as a parameter.

*GridCollectionModel extends [AbstractGridModel](/docs/grid-interface.html){:target="_blank"}*

## GridCollectionModel

{% highlight javascript %}
GridCollectionModel(Object settings) 
{% endhighlight %}

**Settings:** 

| Type      | Name                           | Description                 |
|-----------|--------------------------------|-----------------------------|
| Array[]   | options.data                   | Data array                  |
| Object    | options.filtersHandler         | Filtration                  |
| [Validator](/docs/validator.html) | settings.validation            | Validation                  |

---

### setData

{% highlight javascript %}
 setData(Array[] data)
{% endhighlight %}
 
Set data array in model.

---