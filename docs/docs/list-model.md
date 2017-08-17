---
title: List Model Interface
id: list-model
prev: labels.html
next: list-xhr-model.html
---

Definition of the model used by one-to-many editors like SuggestBox and Select.

## Implementations

* [List XHR Model](list-xhr-model.html)

## Constructor

{% highlight javascript %}
  const abstractListModel = new UIKernel.AbstractModels.List();
{% endhighlight %}

## Methods

### (abstract) async read

{% highlight javascript %}
 async read(string search)
{% endhighlight %}

Get options list for a Select or SuggestBox editor taking into account list labels `search` filter(case insensitive).

---

### (abstract) async getLabel

{% highlight javascript %}
 async getLabel(number id)
{% endhighlight %}

Get an option name which matches specified ID.
