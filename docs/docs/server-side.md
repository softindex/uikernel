---
title: Server side
id: server-side
prev: creating-records.html
next: server-routes.html
---
* [Code](https://github.com/softindex/uikernel-server-example){:target="_blank"}

In this tutorial, we'll be writing a server-side part of the app which will use UIKernel.
We are going to use Node.js, Express and MySql.

Our app will have the following structure:

{% highlight html %}
|-- api
    |-- common
        MySQL.js
    |-- modules
        |--userGrid
            model.js
            router.js
            validation.js
     router.js
|-- client // the client-side part of the app is described in the previous tutorial
|--config
package.json
server.js
{% endhighlight %}

First, we'll define packages in `package.json`.

`package.json`:
{% highlight javascript %}
{
  "name": "uikernel-server-example",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^1.15.2",
    "config": "^1.24.0",
    "es6-promisify": "^5.0.0",
    "express": "^4.14.0",
    "mysql": "^2.12.0",
    "squel": "^5.5.0",
    "uikernel": "git+ssh://git@github.com/softindex/uikernel.git#v0.17.0-dev18"
  },
  "scripts": {
    "start": "node server.js"
  }
}
{% endhighlight %}

To install them, we'll need to run `npm i` from the command line.

Next, let's configure the server.

`server.js`:
{% highlight javascript %}
var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var router = require('./api/router');

// define our app using express
var app = express(); 

// configure our app to use bodyParser so that we could get the data from a POST
app.use(bodyParser.json());
app.use(express.static('client'));
// we'll be using UIKernel from "node_modules" on the client side
app.use('/node_modules', express.static('node_modules')); 

// register routes
app.use('/api', router);

// define error handling middleware
app.use(function (err, req, res, next) {
  console.error(err);
  var statusCode = err.statusCode || 500;
  res.sendStatus(statusCode);
});

// set our port
var port = process.env.PORT || config.get('defaultPort');

// start the server
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
{% endhighlight %}

In the next section of the tutorial, we'll define routes for our app.

The client-side part of the app is similar to the one described in the previous part of the tutorial, 
the only difference is that the data model at the client-side part will be an instance of UIKernel.Models.Grid.Xhr
instead of UIKernel.Models.Grid.Collection, so that the client-side part will fetch grid data and synchronize it 
with the server's model:

`client/js/model/model.js`
{% highlight javascript %}
const model = new UIKernel.Models.Grid.Xhr({
    api: '/api/users',     // URI of the back-end Grid API 
    validator              // Client-side validator
});
{% endhighlight %}
