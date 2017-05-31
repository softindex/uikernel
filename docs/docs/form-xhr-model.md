---
title: Form XHR Model
id: form-xhr-model
prev: form-model.html
next: reports-mixin.html
---

Form XHR Model is a model which interacts with the server API.

### Constructor

{% highlight javascript %}
UIKernel.FormXhrModel(Object settings)
{% endhighlight %}

**Settings:**

| Type                              | Name                  | Description                 |
|-----------------------------------|-----------------------|-----------------------------|
| string                            | **api**               | API address                 |
| [Validator](/docs/validator.html) | validator             | Validator                   |
| Function                          | xhr                   | XHR interface               |
