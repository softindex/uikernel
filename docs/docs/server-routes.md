---
title: Routes definition
id: server-routes
prev: server-side.html
next: server-validation.html
---

First, let's define the main router of our app.

`router.js`:
{% highlight javascript %}
const express = require('express');
const userGridRouter = require('./modules/userGrid/router');

// get an instance of the express Router
const router = new express.Router();
router.use('/records', userGridRouter);

module.exports = router;
{% endhighlight %}


Next, we'll define routes for the module named `userGrid`. It will be responsible for working with the data passed to the client model.
UIKernel allows to generate routes if you use Express. So we're going to generate routes for this module.

`userGrid/router.js`:
{% highlight javascript %}
const UIKernel = require('uikernel');
const UserGridModel = require('./model'); // we'll define the model in the next step of our tutorial

// generate routes
const router = UIKernel.gridExpressApi()
    .model(new UserGridModel())
    .getRouter(); // "getRouter" returns express.Router object

// UIKernel doesn't generate the delete method, so we'll define it
router.delete('/:recordId', (req, res, next) => {
    new UserGridModel().delete(req.params.recordId)
        .then(() => res.end())
        .catch((err) => next(err))
});

module.exports = router; // this router is passed to the main router of our app
{% endhighlight %}

Pay attention to the argument passed to `model()`.
It must be an object with the methods described [here](/docs/grid-interface.html) or function that return model based on request.

The usage of `gridExpressApi` is optional.
You can define a router by yourself, but it must be able to handle the following [requests](/docs/grid-express-api.html).

Read more about `gridExpressApi` [here](/docs/grid-express-api.html)
