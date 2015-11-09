---
title: List Model
id: list-model
prev: labels.html
next: list-xhr-model.html
---

A model used by one-to-many editors like SuggestBox and Select.

---

## Types

* [List XHR Model](list-xhr-model.html)

---

## Interface

### read

{% highlight javascript %}
 read(string search, function callback)
{% endhighlight %}

Get options for Select or SuggestBox editor.

---

### getLabel

{% highlight javascript %}
 getLabel(number id, function callback)
{% endhighlight %}

Get option name using ID. The callback function will return result as a string.
