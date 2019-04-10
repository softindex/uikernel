---
title: Grid Express API
id: grid-express-api
prev: grid-export.html
next: form-service.html
---

You can use Grid Express API to link the client UI and Grid server model.

Grid Express API helps to perform the next requests:

| Method | URL         | Description |
|--------|-------------|--------------|
| GET    | /           | Get all records |
| POST   | /read       | Get all records (in case large query) |
| GET    | /:recordId  | Get particular record |
| PUT    | /           | Update multiple records |
| POST   | /           | Create a record |
| POST   | /validation | Validate particular record |

## Initialization

{% highlight javascript %}
  const gridApiBuilder = UIKernel.gridExpressApi();    //initializes builder
{% endhighlight %}

----

## Builder methods

### model

{% highlight javascript %}
  gridApiBuilder.model(gridModel);
  gridApiBuilder.model(getModel);
{% endhighlight %}

Specify a Grid model which must implement [Grid Model Interface](/docs/grid-interface.html) and can be an instance or a constructor
so that the Grid Express Api will be able to use the provided data model to perform client requests.

**Parameters**:

| Type                                   | Name       | Description                  |
|----------------------------------------|------------|------------------------------|
| [GridModel](/docs/form-interface.html) | gridModel  | *Required*. The instance of a Grid Model |

Or:

| Type      | Name      | Description                                                       |
|-----------|-----------|-------------------------------------------------------------------|
| Function  | getModel  | *Required*. Function to be called with Express middleware's `req` and `res`   |
|           |           | parameters returning a Grid model instance                        |

----

### result

{% highlight javascript %}
  gridApiBuilder.result(callback);
{% endhighlight %}

Specify a function to be called when the response is ready

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
  const router = gridApiBuilder.getRouter();
{% endhighlight %}

Creates an [Express router object](http://expressjs.com/en/4x/api.html#router)
with middlewares performing requests specified above.

----

## Usage

Pass a model instance to Express API:

{% highlight javascript %}
  import advertisersModel from 'somewhere';
  const router = UIKernel.gridExpressApi()
    .model(advertisersModel)
    .getRouter();
{% endhighlight %}

Or use a constructor for that:

{% highlight javascript %}
  import AdvertisersModel from 'somewhere';
  const router = UIKernel.gridExpressApi()
    .model((req, res) => {
      return new AdvertisersModel(req.params.param1, res.locals.param2)
    })
    .getRouter();
{% endhighlight %}

To interact with this API at front-end use [Grid Xhr Model](/docs/grid-model-xhr.html).

> You can also customize your API with some additional methods,
> or perform a similar behaviour using other frameworks of course.

### Example of customizing provided API with your own methods

{% highlight javascript %}
  import model from 'somewhere';
  const router = UIKernel.gridExpressApi()
    .model(model)
    .getRouter()
    //here you can add performing of some other API requests:
    .delete('/:recordId', (req, res, next) => {
      model.delete(req.params.recordId)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
    });
{% endhighlight %}
