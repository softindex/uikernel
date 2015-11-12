---
title: Express Grid API
id: express-grid-api
prev: grid-adapters.html
next: form-mixin.html
---

You can use Grid Express API to link the client UI and Grid server model.

## Initialization

{% highlight javascript %}
UIKernel.gridExpressApi(Express router, string[]|function(req, res) availableMethods)
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

Specify Grid model, which can be an instance or a constructor

----

### result

{% highlight javascript %}
result(function(Error err, Object data))
{% endhighlight %}

Specify send response function

----

## Usage

Pass model instance to Express API:

{% highlight javascript %}
var router = express.Router();
Grid.gridExpressApi(router).model(advertisers);
{% endhighlight %}

or use a constructor for that:

{% highlight javascript %}
var router = express.Router();
Grid.gridExpressApi(router).model(function (req, res) {
  return new Advertisers(req.params.param1, res.locals.param2)
});
{% endhighlight %}

> You can also customize your API with some additional methods,
> or perform a similar behaviour using other frameworks of course.
