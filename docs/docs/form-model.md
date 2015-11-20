---
title: Model interface
id: form-model
prev: form-mixin.html
next: form-xhr-model.html
---

Model for form requests handling.

*FormModel extends [AbstractFormModel]({{site.github}}/src/form/AbstractFormModel.js){:target="_blank"}*

### getData

{% highlight javascript %}
 getData(string[] fields, function callback)
{% endhighlight %}

Returns all requested fields.

----

### submit

{% highlight javascript %}
 submit(Object changes, [function callback])
{% endhighlight %}
 
Process form data

----

### getValidationDependency

{% highlight javascript %}
string[] getValidationDependency(string[] fields)
{% endhighlight %}

Returns fields that need to be sent additionally to validate fields `field`. Such a method necessity
is caused with the ability to create group validators.

----

### isValidRecord

{% highlight javascript %}
isValidRecord(Object record, function callback)
{% endhighlight %}

Validates records.

---

## Adapters

Form model can be easily obtained from Grid model.
[More..](grid-adapters.html)

---

## Simple model

You case use `UIKernel.Model.Form` to create simple client form models.
Example: [Usage in a filters form](applying-filters.html)
