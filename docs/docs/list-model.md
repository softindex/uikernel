---
title: List Model Interface
id: list-model
prev: labels.html
next: list-xhr-model.html
---

Definition of the model that describes the basic necessary methods (without a specific implementation) used by one-to-many editors like SuggestBox and Select.

## Implementations

* [List XHR Model](list-xhr-model.html)

## Constructor

{% highlight javascript %}
  const ownModelImplementation = new UIKernel.AbstractModels.List();
{% endhighlight %}

## Methods

### async read

{% highlight javascript %}
 async read(string search)
{% endhighlight %}

**Returns**: Promise which resolves with the parsed server response.

---

### async getLabel

{% highlight javascript %}
 async getLabel(number id)
{% endhighlight %}

Get an option name which matches specified ID.

**Returns** In successful case(server response status == 200) returns parsed server response
(which is assumed to be a string value of the corresponding label), otherwise throws an error.
