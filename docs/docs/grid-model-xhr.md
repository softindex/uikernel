---
title: Grid Xhr Model
id: grid-model-xhr
prev: grid-interface.html
next: grid-model-collection.html
---

Grid Model Xhr a model that interacts with the server API.

*Grid Xhr Model extends [AbstractGridModel](/docs/grid-interface.html){:target="_blank"}*

## GridXhrModel

{% highlight javascript %}
GridXhrModel(Object settings)
{% endhighlight %}

**Settings:**

| Type      | Name                           | Description                 |
|-----------|--------------------------------|-----------------------------|
| string    | settings.api                   | API address                 |
| [Validator](/docs/validator.html) | settings.validator       | General validator           |
| Function  | settings.xhr                   | XHR interface               |
