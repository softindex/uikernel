---
title: Form Model Interface
id: form-interface
prev: form-service.html
next: form-model.html
---

A standard model that describes the basic necessary methods (without a specific implementation) for keeping and performing data of your forms.

## Implementations
* [Form XHR Model](/docs/form-xhr-model.html)
* [Form Collection Model](/docs/form-model.html)

## Abstract Model

{% highlight javascript %}
  const ownModelImplementation = new UIKernel.AbstractModels.Form();
{% endhighlight %}

It is recommended for inheritance when creating your own models on the client side. 

## Methods

### async getData

{% highlight javascript %}
 async getData(string[] fields)
{% endhighlight %}

**Returns**: Promise which resolves with *Object* with form data. It has the following structure: `{field1dName: 'value1', ..., fieldNName: 'valueN'}`.

----

### async submit

{% highlight javascript %}
 async submit(Object changes)
{% endhighlight %}

Process form data(changes): validate it(by means of the validator passed in the constructor, or the default one)
and save it in the local data structure of the model.

**Return** If some fields are invalid - nothing will be saved, but the ValidationError instance will be thrown.

----

### getValidationDependency

{% highlight javascript %}
  string[] getValidationDependency(string[] fields)
{% endhighlight %}


**Return** Fields(Array of string values) that need to be sent additionally to validate fields specified in passed parameters.
This method is required for creating group validators\(read details [here](/docs/validator.html)\).


----

### async isValidRecord

{% highlight javascript %}
  async isValidRecord(Object record)
{% endhighlight %}

**Returns**: Promise which resolves with *ValidationErrors*

---

## Adapters

Form model can be easily obtained **from Grid model**.
[More..](grid-adapters.html)
