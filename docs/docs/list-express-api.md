---
title: List Express API
id: list-express-api
prev: list-xhr-model.html
next: grid-component.html
---

You can use List Express API to link the client UI and List sever model.

It can schematically be displayed like this:

| Method   | URL   | Description |
|----------|--------|--------------|
| GET | / | Get all records |
| GET | /label/:recordId | Get particular record label |

----

## Builder functions

### model

{% highlight javascript %}
model(Object listModel)
model(function(Object req, Object res))
{% endhighlight %}

Specify a list model. The model can be an instance or a constructor.

----

### result

{% highlight javascript %}
result(function func(Error err, Object data))
{% endhighlight %}

Specify  a function for handling of responses.

----

### getRouter

{% highlight javascript %}
getRouter()
{% endhighlight %}

Create a router object

----

## Usage Example

Pass a model instance to Express API:

{% highlight javascript %}
UIKernel.listExpressApi()
  .model(citiesList)
  .getRouter();
{% endhighlight %}

Or use a constructor for that:

{% highlight javascript %}
UIKernel.listExpressApi()
  .model((req, res) => {
    return new CitiesList(req.params.countryId);
  })
  .getRouter();
{% endhighlight %}

> You can also customize your API by adding other methods
> or define API using other frameworks.
