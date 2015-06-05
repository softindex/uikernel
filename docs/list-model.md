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
 read(string search, function callback(string error, Array records))
{% endhighlight %}

Get options for Select or SuggestBox editor.

---

### getLabel

{% highlight javascript %}
 getLabel(number id, function callback(string error, string record))
{% endhighlight %}

Get option name using ID.
