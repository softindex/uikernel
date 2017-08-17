---
title: Form Model interface
id: form-interface
prev: form-service.html
next: form-model.html
---

Definition of the model for keeping and performing data of your forms.

## Implementations
* [Form XHR Model](/docs/form-xhr-model.html)
* [Form Collection Model](/docs/form-model.html)

## Constructor

{% highlight javascript %}
  const abstractFormModel = new UIKernel.AbstractModels.Form();
{% endhighlight %}

## Methods

### (abstract) async getData

{% highlight javascript %}
 async getData(string[] fields)
{% endhighlight %}

Return all requested fields.

----

### (abstract) submit

{% highlight javascript %}
 async submit(Object changes)
{% endhighlight %}

Process form data.

----

### (abstract) getValidationDependency

{% highlight javascript %}
  string[] getValidationDependency(string[] fields)
{% endhighlight %}

Return fields that need to be sent additionally to validate a field. This method is required for creating group
validators.

----

### (abstract) async isValidRecord

{% highlight javascript %}
  async isValidRecord(Object record)
{% endhighlight %}

Validate records

---

## Adapters

Form model can be easily obtained **from Grid model**.
[More..](grid-adapters.html)
