---
title: Form XHR Model
id: form-xhr-model
prev: form-model.html
next: form-express-api.html
---

Form XHR Model is a class which interacts with the server API keeping there its data.

*Form XHR Model implements [Form Model Interface](/docs/form-interface.html).*

### Constructor

{% highlight javascript %}
  const formXhrModel = new UIKernel.Models.FormXhr(settings);
{% endhighlight %}

**Parameters**:

| Type                              | Name                  | Description                   |
|-----------------------------------|-----------------------|-------------------------------|
| String                            | settings.api          | *Required*. API address to interact with  |
| [Validator](/docs/validator.html) | settings.validator    | *Optional*. Validator instance. By default there is used a new [Validator](/docs/validator.html) instance. |
| Function                          | settings.xhr          | *Optional*. XHR interface. By default there is used a built-in xhr function, but you can override it here. |

____

## Methods

### async getData

{% highlight javascript %}
  const record = await formModel.getData(fields);
{% endhighlight %}

Fetch values of the specified fields from the server.
It sends `GET` request to the URI = settings.api taken in the constructor.
In successful case(response status == 200) returns server response, otherwise throws an error.

**Parameters**:

| Type         | Name        | Description                                                                                    |
|--------------|-------------|------------------------------------------------------------------------------------------------|
| String [ ]   | fields      | *Optional*. Form fields to get values of. By default there is returned values of all the fields.   |

**Returns**: Promise which resolves with *Object* with form data. It has the following structure: `{field1dName: 'value1', ..., fieldNName: 'valueN'}`.

----

### async submit

{% highlight javascript %}
 const res = await formModel.submit(changes);
{% endhighlight %}

Submit form data(changes).
It sends `POST` request with header `{'Content-type': 'application/json'}` and `body = JSON.stringify(changes)`
to the URI = settings.api taken in the constructor.
Validation is supposed to be performed at the server
(but you can also do explicit local validation calling formModel.isValidRecord(record) before form submitting).
If the server response is successful(Status 200) and it has field `error`, the response will be thrown.
In case of unexpected error(e.g. server response status !== 200) an Error instance will be thrown.
If the server response is successful(Status 200) and it doesn't have field `error`,
so `serverResponse.data` will be resolved.

**Parameters**:

| Type       | Name    | Description                                                                                                      |
|------------|---------|------------------------------------------------------------------------------------------------------------------|
| Object     | changes | *Required*. Changes(or new values) in the form data. Expected structure: `{field1Name: 'value1', ..., fieldNName: 'valueN'}` |                                                             |

----

### getValidationDependency

{% highlight javascript %}
  formModel.getValidationDependency(fields)
{% endhighlight %}

Return fields(Array of string values) that need to be sent additionally to validate fields specified in passed parameters.
This method is required for creating group validators\(read details [here](/validator.html)\).

**Parameters**:

| Type                                                  | Name    | Description                                                           |
|-------------------------------------------------------|---------|-----------------------------------------------------------------------|
| <span style="white-space:nowrap;"> String [ ] </span> | fields  | *Required*. Array of fields to get their validation-dependant fields  |

----

### async isValidRecord

{% highlight javascript %}
  const valid = await formModel.isValidRecord(record);
{% endhighlight %}

Validate specified record by means of the validator passed in the constructor, or the default one.
An unexpected error(e.g. if there are async validation rules and the Internet doesn't work, or server responds with status !== 200) will be thrown.

**Parameters**:

| Type       | Name    | Description                                                                                                      |
|------------|---------|------------------------------------------------------------------------------------------------------------------|
| Object     | record  | *Required*. Record to validate. Expected structure: `{field1Name: 'value1', ..., fieldNName: 'valueN'}`      |

**Returns**: Promise which resolves with *ValidationErrors*

---

## Example
{% highlight javascript %}
  const apiUri = '/api/users';
  const validator = UIKernel.createValidator()
    // Check if email is valid using regular expression
    .field('email', UIKernel.Validators.regExp.notNull(/^.*@.*$/, 'Your email is invalid'))
    //validation of several dependent fields
    .fields(['password', 'passwordConfirm'], (data, errors) => {
      if (data.password !== data.passwordConfirm)
        errors.add('passwordConfirm', 'Passwords don\'t match');
    })
    //async validation:
    .asyncField('login', async function (val) {
       let response = await fetch('https://yesno.wtf/api');
       if(!response.ok)
         throw new Error('Unable to reach validation API :(');
       let respData = await response.json();
       if (respData.answer !== 'yes')
         return 'user with such login already exists!';
    });

  const userFormModel = new UIKernel.Model.FormXhr(apiUri, validator);

  //read value of the field
  try {
    const record = await userFormModel.getData(['login']);
    console.log(record);   // { login: "" }
  } catch(error) {
    console.error(error);
  }

  //update some fields
  try {
    //Suppose you obtained this data from somewhere else(e.g. by means of Form Service, or by hands)
    let newValues = {
      login: 'Immanuel Kant',
      email: 'i.kant1724@gmail.com',
      password: 'Categorical_imperative1',
      passwordConfirm: 'Categorical_imperative1',
    };
    await userFormModel.submit(newValues);
  } catch(error) {
    console.error(error);
  }

  //read the whole data
  try {
    const record = await userFormModel.getData()
    console.log(record);   // { "login": "Immanuel Kant", "email": "i.kant1724@gmail.com", ... }
  } catch(error) {
    console.error(error);
  }

  try {
    //Under the hood it uses validator.isValidRecord
    const validationResult = await userFormModel.isValidRecord(testRecord);
    if (validationResult.isEmpty())
      console.log('All right, there is no any errors! Validation result:', validationResult);
    else
      console.error('Passed record is invalid! Validation errors:', validationResult);
  } catch (err) {
    console.error('There is appeared an unexpected error in validation process:', err);
  }

  //Under the hood it uses validator.getValidationDependency
  let dependentFields = userFormModel.getValidationDependency(['passwordConfirm']);
  console.log(dependentFields);  //[['password']
{% endhighlight %}
