---
title: Grid Xhr Model 
id: grid-model-xhr
prev: grid-interface.html
next: grid-model-collection.html
---

Grid Model Xhr specifies the Grid model that interacts with the server API.

*GridXhrModel extends [AbstractGridModel](/docs/grid-interface.html){:target="_blank"}*

## GridXhrModel

{% highlight javascript tabsize=2 %}
GridXhrModel(Object settings) 
{% endhighlight %}

**Settings:** 

| Type      | Name                           | Description                 |
|-----------|--------------------------------|-----------------------------|
| string    | settings.api                   | API address                 |
| [Validator](/docs/validator.html) | settings.commonValidator       | General validator           |
| boolean   | settings.serverValidation=true | Check async validation flag |
| Function  | settings.xhr                   | XHR interface               |
