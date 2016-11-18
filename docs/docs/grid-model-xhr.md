---
title: Grid Xhr Model
id: grid-model-xhr
prev: grid-interface.html
next: grid-model-collection.html
---

Grid Model Xhr is a model that interacts with the server API.

*Grid Xhr Model extends [AbstractGridModel](/docs/grid-interface.html){:target="_blank"}*

## Constructor

{% highlight javascript %}
UIKernel.Models.Grid.Xhr(Object settings)
{% endhighlight %}

**Settings:**

| Type      | Name                           | Description                 |
|-----------|--------------------------------|-----------------------------|
| string    | settings.api                   | API address                 |
| [Validator](/docs/validator.html) | settings.validator       | General validator           |
| Function  | settings.xhr                   | XHR interface               |
