---
title: Routes definition
id: server-routes
prev: server-side.html
next: server-validation.html
---

First, let's define types

`api/users/types.ts`:
{% highlight typescript %}
export interface Filters {
  age?: number;
  gender?: 1 | 2;
  search?: string;
}

export type UserRecord = {
  age: number;
  gender: 1 | 2;
  name: string;
  phone: string;
  surname: string;
}

export type UserField = keyof UserRecord;
{% endhighlight %}

Then, let's define the main router of our app.

`api/index.ts`:
{% highlight typescript %}
import {Router} from 'express';
import {userRouter} from './users/userRouter';

// get an instance of the express Router
export const api = Router();

api.use('/users', userRouter);
{% endhighlight %}


Next, we'll define routes for the module named `userRouter`. It will be responsible for working with the data passed to the client model.
UIKernel allows to generate routes if you use Express. So we're going to generate routes for this module.

`api/users/userRouter.ts`:
{% highlight typescript %}
import UIKernel from 'uikernel';
import {Router} from 'express';
import {MySqlPool} from '../../sql/MySqlPool';
import {UserGridModel} from './UserGridModel'; // we'll define the model in the next step of our tutorial
import {Filters, UserRecord} from './types';

// creating sql pool
const pool = MySqlPool.create()

// creating model with our class UserGridModel
const model = new UserGridModel(pool)

// generate routes
// this router is passed to the main router of our app
export const userRouter: Router = UIKernel.gridExpressApi<number, UserRecord, Filters>()
  .model(model)
  .getRouter() // "getRouter" returns express.Router object

// UIKernel doesn't generate the delete method, so we'll define it
userRouter.delete('/:recordId', (req, res, next) => {
  const id = Number(req.params.recordId);

  if (isNaN(id)) {
    throw new Error('Invalid ID');
  }

  model
    .delete(id)
    .then(() => res.end())
    .catch(next)
});
{% endhighlight %}

Pay attention to the argument passed to `model()`.
It must be an object with the methods described [here](/docs/grid-interface.html) or function that return model based on request.

The usage of `gridExpressApi` is optional.
You can define a router by yourself, but it must be able to handle the following [requests](/docs/grid-express-api.html).

Read more about `gridExpressApi` [here](/docs/grid-express-api.html)
