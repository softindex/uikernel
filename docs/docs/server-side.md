---
title: Server side
id: server-side
prev: creating-records.html
next: server-routes.html
---

In this tutorial, we'll be writing an example of the server-side part of the app which will use UIKernel.
We are going to use Node.js with ts-node, Express and MySql with ts-sql-query.

Our app will have the following structure:

{% highlight html %}
|-- client // the client-side part of the app described in the previous tutorial
    server
    |-- sql
        |-- MySqlPool.ts
            UserTable.ts
        api
        |-- users
            |-- types.ts
                UserGridModel.ts
                userRouter.ts
                userValidator
            index.ts
        server.ts
        tsconfig.json
        package.json
{% endhighlight %}

First, we'll define packages in `package.json`.

`package.json`:
{% highlight javascript %}
{
  "name": "uikernel-server-example",
  "main": "server.ts",
  "scripts": {
    "start": "ts-node server.ts"
  },
  "dependencies": {
    "body-parser": "^1.20.2",
    "express": "^4.18.2",
    "mysql": "^2.18.1",
    "ts-node": "^10.9.1",
    "ts-sql-query": "^1.51.0",
    "typescript": "^5.0.4",
    "uikernel": "https://github.com/softindex/uikernel/tarball/v1.0.1-dev13.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/mysql": "^2.15.21"
  }
}
{% endhighlight %}

To install them, we'll need to run `npm i` from the command line.

Next, let's configure the server.

`server.ts`:
{% highlight typescript %}
import bodyParser from 'body-parser';
import express, {NextFunction, Request, Response} from 'express';
import {api} from './api';

// set our port
const PORT = process.env.PORT ?? 8000;

// define our app using express
const app = express();

// configure our app to use bodyParser so that we could get the data from a POST
app.use(bodyParser.json());

// register routes
app.use('/api', api);

// define error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message);
  res.sendStatus(500);
});

// start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
{% endhighlight %}

In the next section of the tutorial, we'll define routes for our app.

The client-side part of the app is similar to the one described in the previous part of the tutorial,
the only difference is that the data model on the client-side part will be an instance of UIKernel.Models.Grid.Xhr
instead of UIKernel.Models.Grid.Collection, so that the client-side part will fetch grid data and synchronize it
with the server's model:

`client/src/model.js`
{% highlight javascript %}
import UIKernel from 'uikernel';
import validator from './validator';

const model = new UIKernel.Models.Grid.Xhr({
  api: '/api/users',
  validator,
});

// do not forget to define a delete method for UserGridModel
model.delete = async function (recordId) {
  await this.xhr({
    method: 'DELETE',
    uri: `${this.apiUrl}/${recordId}`
  });
};
{% endhighlight %}

And we need set proxy in client app.

`client/package.json`:
{% highlight javascript %}
{
  // ...
  "proxy": "http://localhost:8000",
  // ...
}
{% endhighlight %}
