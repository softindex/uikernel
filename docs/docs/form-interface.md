---
title: Model interface
id: form-interface
prev: form-service.html
next: form-model.html
---

Model for handling form requests.

*FormModel extends [AbstractFormModel]({{site.github}}/src/form/AbstractFormModel.js){:target="_blank"}*

### getData

{% highlight javascript %}
 getData(string[] fields, function callback)
{% endhighlight %}

Return all requested fields

### Example
{% highlight javascript %}
form.getData(['search'], (err, data) => {
    console.log(data);//{ search: "query" }
});
{% endhighlight %}

----

### submit

{% highlight javascript %}
 submit(Object changes, function callback)
{% endhighlight %}

Process form data

----

### getValidationDependency

{% highlight javascript %}
string[] getValidationDependency(string[] fields)
{% endhighlight %}

Return fields that need to be sent additionally to validate a field. This method is required for creating group 
validators.

----

### isValidRecord

{% highlight javascript %}
isValidRecord(Object record, function callback)
{% endhighlight %}

Validate records

---

## Adapters

Form model can be easily obtained from Grid model.
[More..](grid-adapters.html)

---