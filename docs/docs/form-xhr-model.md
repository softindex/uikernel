---
title: Form XHR Model
id: form-xhr-model
prev: form-model.html
next: reports-mixin.html
---

Form XHR Model specifies Form model which interacts with the server API.

### Constructor

{% highlight javascript %}
UIKernel.FormXhrModel(Object settings)
{% endhighlight %}

**Settings:** 

| Type                              | Name                  | Description                 |
|-----------------------------------|-----------------------|-----------------------------|
| string                            | **api**               | API address                 |
| [Validator](/docs/validator.html) | commonValidator       | General validator           |
| boolean                           | serverValidation=true | Check async validation flag |
| Function                          | xhr                   | XHR interface               |
