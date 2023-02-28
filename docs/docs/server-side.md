---
title: Server side
id: server-side
prev: creating-records.html
next: server-routes.html
---

In this tutorial, we'll be writing an example of the server-side part of the app which will use UIKernel.
We are going to use Node.js, Express and MySql.

Our app will have the following structure:

{% highlight html %}
|-- src
    |-- client // the client-side part of the app described in the previous tutorial
    |-- server
        |-- common
            mysql.js
        |-- modules
            |--userGrid
                model.js
                router.js
                validator.js
        api.js
package.json
server.js
{% endhighlight %}

First, we'll define packages in `package.json`.

`package.json`:
{% highlight javascript %}
{
  "name": "uikernel-server-example",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.15.2",
    "express": "^4.14.0",
    "mysql": "^2.12.0",
    "squel": "^5.5.0",
    "uikernel": "^0.17.0"
  }
}
{% endhighlight %}

To install them, we'll need to run `npm i` from the command line.

Next, let's configure the server.

`server.js`:
{% highlight javascript %}
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

// define our app using express
const app = express();

// configure our app to use bodyParser so that we could get the data from a POST
app.use(bodyParser.json());
app.use('/static', express.static('/static'));
// we'll be using UIKernel from "node_modules" on the client side
app.use('/node_modules', express.static('node_modules'));

app.use('/', express.static('/src/client'));
// register routes
app.use('/api', api);

// define error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.sendStatus(statusCode);
});

// set our port
const port = process.env.PORT || 8000;

// start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
{% endhighlight %}

In the next section of the tutorial, we'll define routes for our app.

The client-side part of the app is similar to the one described in the previous part of the tutorial,
the only difference is that the data model on the client-side part will be an instance of UIKernel.Models.Grid.Xhr
instead of UIKernel.Models.Grid.Collection, so that the client-side part will fetch grid data and synchronize it
with the server's model:

`client/js/model/model.js`
{% highlight javascript %}
const UIKernel = require('uikernel');

const model = new UIKernel.Models.Grid.Xhr({
  api: '/api/records',
  validator,
});

// do not forget to define a delete method for UserGridModel
model.deleteItem = async function (recordId) {
  await this._xhr({
    method: 'DELETE',
    uri: this._apiUrl + '/' + recordId
  });
};
{% endhighlight %}
