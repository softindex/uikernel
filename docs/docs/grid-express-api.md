---
title: Express Grid API
id: grid-express-api
prev: grid-export.html
next: form-service.html
---

You can use Grid Express API to link the client UI and Grid server model.

## Initialization

{% highlight javascript %}
UIKernel.gridExpressApi()
{% endhighlight %}

It can schematically be displayed like this:

| Method   | URL   | Description |
|----------|--------|--------------|
| GET | / | Get all records |
| GET | /:recordId | Get particular record |
| PUT | / | Update multiple records |
| POST | / | Create a record |
| POST | /validation | Validate particular record |

----

## Builder functions

### model

{% highlight javascript %}
model(Object gridModel)
model(function(Object req, Object res))
{% endhighlight %}

Specify a Grid model, which can be an instance or a constructor

----

### result

{% highlight javascript %}
result(function(Error err, Object data))
{% endhighlight %}

Specify a function to call when the response is ready

----

### getRouter

{% highlight javascript %}
getRouter()
{% endhighlight %}

Creates a router object

----

## Usage

Pass a model instance to Express API:

{% highlight javascript %}
UIKernel.gridExpressApi()
  .model(advertisers)
  .getRouter();
{% endhighlight %}

Or use a constructor for that:

{% highlight javascript %}
UIKernel.gridExpressApi()
  .model(function (req, res) {
    return new Advertisers(req.params.param1, res.locals.param2)
  })
  .getRouter();
{% endhighlight %}

> You can also customize your API with some additional methods,
> or perform a similar behaviour using other frameworks of course.
