---
title: Form Express API
id: form-express-api
prev: form-interface.html
next: reports-mixin.html
---

You can use Form Express API to link the client UI and your server data model.

Form Express API helps to perform the next requests:

| Method   | URL         | Description        |
|----------|-------------|--------------------|
| GET      | /           | Get form data      |
| POST     | /           | Submit form data   |
| POST     | /validation | Validate form data |

## Initialization

{% highlight javascript %}
  const formApiBuilder = UIKernel.formExpressApi();    //initializes builder
{% endhighlight %}

## Builder methods

### model

{% highlight javascript %}
  formApiBuilder.model(formModel);
  formApiBuilder.model(getModel);
{% endhighlight %}

Specify a form model which must implement [Form Model Interface](/docs/form-interface.html) can be an instance or a constructor
so that the Form Express Api will be able to use the provided data model to perform client requests.

**Parameters**:

| Type                                   | Name       | Description                  |
|----------------------------------------|------------|------------------------------|
| [FormModel](/docs/form-interface.html) | formModel  | *Required*. The instance of a Form model |

Or:

| Type      | Name      | Description                                                       |
|-----------|-----------|-------------------------------------------------------------------|
| Function  | getModel  | *Required*. Function to be called with Express middleware's `req` and `res` parameters returning a Form model instance.  |

----

### result

{% highlight javascript %}
  formApiBuilder.result(callback);
{% endhighlight %}

Specify a function to be called when the response is ready.

**Parameters**:

| Type       | Name        | Description                                         |
|------------|-------------|-----------------------------------------------------|
| Function   | callback    | *Optional*. Function to be called with the result.  |

**`callback`s arguments:**

| Type       | Name        | Description                                        |
|------------|-------------|----------------------------------------------------|
| Any        | err         | Error caught from model methods                    |
| Any        | data        | Result returned by model methods                   |

----

### getRouter

{% highlight javascript %}
  const router = formApiBuilder.getRouter();
{% endhighlight %}

Creates an [Express router object](http://expressjs.com/en/4x/api.html#router)
with middlewares performing requests specified above.

----

## Usage example

Pass a model instance to Express API:

{% highlight javascript %}
  import advertisersModel from 'somewhere';
  const router = UIKernel.formExpressApi()
    .model(advertisersModel)
    .getRouter();
{% endhighlight %}

Or use a constructor for that:

{% highlight javascript %}
  import AdvertisersModel from 'somewhere';
  const router = UIKernel.formExpressApi()
    .model((req, res) => {
      return new AdvertisersModel(req.params.param1, res.locals.param2)
    })
    .getRouter();
{% endhighlight %}

To interact with this API at front-end use [Form XHR Model](/docs/form-xhr-model.html).

> You can also customize your API with some additional methods,
> or perform a similar behaviour using other frameworks of course.

### Example of customizing provided API with your own methods

{% highlight javascript %}
  import model from 'somewhere';
  const router = UIKernel.formExpressApi()
    .model(model)
    .getRouter()
    //here you can add performing of some other API requests:
    .get('/:additionalParamId', async (req, res, next) => {
      await model.getAdditionalInfo(req.params.additionalParamId);
      res.sendStatus(200);
    });
{% endhighlight %}
