---
title: List Express API
id: list-express-api
prev: list-xhr-model.html
next: grid-component.html
---

You can use List Express API to link the client UI(especially editors like Select or SuggestBox with remote data source)
and sever data model.

List Express API helps to perform the next requests:

| Method   | URL              | Description |
|----------|------------------|--------------|
| GET      | /                | Get all records |
| GET      | /label/:recordId | Get particular record label |

----

## Initialization

{% highlight javascript %}
  const listApiBuilder = UIKernel.listExpressApi();    //initializes builder
{% endhighlight %}

## Builder methods

### model

{% highlight javascript %}
  listApiBuilder.model(listModel);
  listApiBuilder.model(getModel);
{% endhighlight %}

Specify a list model which must implement [List Model Interface](/docs/list-model.html) and can be an instance or a constructor
so that the List Express Api will be able to use the provided data model to perform client requests.

**Parameters**:

| Type                               | Name       | Description                  |
|------------------------------------|------------|------------------------------|
| [FormModel](/docs/list-model.html) | listModel  | *Required*. The instance of a List model |

Or:

| Type      | Name      | Description                                                       |
|-----------|-----------|-------------------------------------------------------------------|
| Function  | getModel  | *Required*. Function to be called with Express middleware's `req` and `res` parameters returning a List model instance  |

----

### result

{% highlight javascript %}
  listApiBuilder.result(callback);
{% endhighlight %}

Specify a function to be called when the response is ready.

**Parameters**:

| Type       | Name        | Description                                                                                    |
|------------|-------------|-----------------------------------------------------|
| Function   | callback    | *Optional*. Function to be called with the result.  |

**`callback`s arguments:**

| Type       | Name        | Description                                        |
|------------|-------------|----------------------------------------------------|
| Any        | err         | Error caught from model methods        |
| Any        | data        | Result returned by model methods       |

----

### getRouter

{% highlight javascript %}
  const router = listApiBuilder.getRouter();
{% endhighlight %}

Creates an [Express router object](http://expressjs.com/en/4x/api.html#router)
with middlewares performing requests specified above.

----

## Usage Example

Pass a model instance to Express API:

{% highlight javascript %}
  import citiesListModel from 'somewhere';
  const router = UIKernel.listExpressApi()
    .model(citiesListModel)
    .getRouter();
{% endhighlight %}

Or use a constructor for that:

{% highlight javascript %}
  import CitiesListModel from 'somewhere';
  const router = UIKernel.listExpressApi()
    .model((req, res) => {
      return new CitiesListModel(req.params.countryId);
    })
    .getRouter();
{% endhighlight %}

> You can also customize your API by adding other methods
> or define API using other frameworks.

To interact with this API at front-end use [List XHR Model](/docs/list-xhr-model.html).

### Example of customizing provided API with your own methods

{% highlight javascript %}
  import model from 'somewhere';
  const router = UIKernel.gridExpressApi()
    .model(model)
    .getRouter()
    //here you can add performing of some other API requests:
    .put('/:recordId', function (req, res, next) {
      model.updateRecord(req.params.recordId)
        .then(function () {
          res.sendStatus(200);
        })
        .catch(function (err) {
          next(err);
        })
    });
{% endhighlight %}
