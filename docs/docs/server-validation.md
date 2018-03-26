---
title: Server-side validation
id: server-validation
prev: server-routes.html
next: server-model.html
---

UIKernel supports client-side and server-side validation.
To define the server-side validation, we're going to use [UIKernel validator](/docs/validator.html).

`userGrid/validations.js`:
{% highlight javascript %}
const UIKernel = require('uikernel');
// define a validator using UIKernel.createValidator
const serverValidator = UIKernel.createValidator()
  // define validation rules
  .field('name', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid first name.'))
  .field('surname', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid last name.'))
  .field('phone', UIKernel.Validators.regExp.notNull(/^(\d{3}-)?\d{2,10}$/, 'Invalid phone number.'))
  .field('age', UIKernel.Validators.number.notNull(0, 120, 'Invalid age.'))
  .field('gender', UIKernel.Validators.enum.notNull([1, 2], 'Invalid gender.'));

module.exports = serverValidator;
{% endhighlight %}

The `field` method accepts two arguments: a field name and a function for validation. Here, we've used
synchronous validators provided by UIKernel. There are also asynchronous validators.
You can read more about them [here](/docs/validator.html).
