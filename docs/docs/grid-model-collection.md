---
title: Grid Collection Model
id: grid-model-collection
prev: grid-model-xhr.html
next: validator.html
---

Grid Collection Model is a model that works with an array of data passed to it as a parameter.

*Grid Collection Model extends [AbstractGridModel](/docs/grid-interface.html){:target="_blank"}*

## Grid Collection Model

{% highlight javascript %}
Grid Collection Model(Object settings)
{% endhighlight %}

**Settings:**

| Type      | Name                           | Description                 |
|-----------|--------------------------------|-----------------------------|
| Array[]   | **data**                   | Data array                  |
| Object    | filtersHandler         | Filtration                  |
| [Validator](/docs/validator.html) | validation            | Validation                  |

---

### setData

{% highlight javascript %}
 setData(Array[] data)
{% endhighlight %}

Pass data to a model.

---