---
title: Routes definition
id: server-routes
prev: server-side.html
next: server-validation.html
---

First, let's define tha main router of our app.

`router.js`:
{% highlight javascript %}
var express = require('express');
var userGridRouter = require('./modules/userGrid/router');

// get an instance of the express Router
var router = new express.Router();
// use router from userGrid module to handle all requests that end in '/userGrid'
router.use('/userGrid', userGridRouter);

module.exports = router;
{% endhighlight %}


Next, we'll define routes for the module named `userGrid`. It will be responsible for work with data passed to the client model.
UIKernel allows to generate routes if you use Express. So we're going to generate routes for this module.    

`userGrid/router.js`:
{% highlight javascript %}
var UIKernel = require('uikernel');
var model = require('./model'); // we'll define the model in the next step of our tutorial

//generate routes
var router = UIKernel.gridExpressApi()
    .model(model)
    .getRouter(); //"getRouter" returns express.Router object

// UIKernel doesn't generate the delete method, so we'll define it
router.delete('/:recordId', function (req, res, next) {
    model.delete(req.params.recordId)
    .then(function () {
        res.end();
    })
    .catch(function (err) {
        next(err);
    })
});

module.exports = router; // this router is passed to the main router of our app
{% endhighlight %}

Pay attention to the argument passed to `model()`. 
It must be an object with the methods described [here](/docs/grid-interface.html)

{% highlight javascript %}
var router = UIKernel.gridExpressApi()
    .model(model)// <--
    .getRouter();
});
{% endhighlight %}

The usage of `gridExpressApi` is optional.
You can define a router by yourself, but it must be able to handle the following [requests](/docs/grid-express-api.html).

Read more about `gridExpressApi` [here](/docs/grid-express-api.html)