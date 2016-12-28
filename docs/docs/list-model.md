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

Get options for a Select or SuggestBox editor.

### Example
{% highlight javascript %}
list.read('name', function (err, res) {
    console.log(res);
    /*
    [
      [1,'Alex'],
      [2,'Bob']
    ]
    */
})
});
{% endhighlight %}

---

### getLabel

{% highlight javascript %}
 getLabel(number id, function callback)
{% endhighlight %}

Get an option name using ID. The callback function will return the result as a string.
