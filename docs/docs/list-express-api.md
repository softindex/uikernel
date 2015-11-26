---
title: List Express API
id: list-express-api
prev: list-xhr-model.html
next: grid-component.html
---

You can use List Express API to link the Client UI and List sever model.

It can schematically be displayed like this:

| Method   | URL   | Description |
|----------|--------|--------------|
| GET | / | Get all records |
| GET | /label/:recordId | Get particular record label |

----

## Builder functions

### model

{% highlight javascript %}
model(Object gridModel)
model(function(Object req, Object res))
{% endhighlight %}

Specify a Grid model. It can be an instance or a constructor

----

### result

{% highlight javascript %}
result(function func(Error err, Object data))
{% endhighlight %}

Specify a function to call when you have a response

----

## Usage Example

Pass a model instance to Express API:

{% highlight javascript %}
var router = express.Router();
Grid.listExpressAPI(router).model(advertisersList);
{% endhighlight %}

Or use a constructor for that:

{% highlight javascript %}
var router = express.Router();
Grid.listExpressAPI(router).model(function (req, res) {
  return new CitiesList(req.params.countryId);
});
{% endhighlight %}

> You can also customize your API with some additional methods,
> or perform a similar behaviour using other frameworks of course.
