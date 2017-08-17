---
title: Form Collection Model
id: form-model
prev: form-interface.html
next: form-xhr-model.html
---

Form Collection Model is a class which keeps its data inside
(works with an array of data passed to it as a parameter) and doesn't interact with the server.

*Form Collection Model implements [Form Model interface](/docs/form-interface.html).*

## Constructor

{% highlight javascript %}
  const formModel = new UIKernel.Model.Form(defaultValues, validator);
{% endhighlight %}

**Parameters**:

| Type                              | Name                  | Description                                                                                    |
|-----------------------------------|-----------------------|------------------------------------------------------------------------------------------------|
| Object                            | defaultValues         | *Optional*. Default form field values                                                                      |
| [Validator](/docs/validator.html) | validator             | *Optional*. Validator instance. By default there is used a new [Validator](/docs/validator.html) instance. |

____

## Methods

### async getData

{% highlight javascript %}
 const record = await formModel.getData(fields);
{% endhighlight %}

Return values of the specified fields from the local data structure.

**Parameters**:

| Type                                                  | Name        | Description                                                                                    |
|-------------------------------------------------------|-------------|------------------------------------------------------------------------------------------------|
| <span style="white-space:nowrap;"> String [ ] </span> | fields      | *Optional*. Form fields to get values of. By default there is returned values of all the fields.   |

**Returns**: Promise which resolves with *Object* with form data. It has the following structure: `{field1dName: 'value1', ..., fieldNName: 'valueN'}`.

----

### async submit

{% highlight javascript %}
 await formModel.submit(changes);
{% endhighlight %}

Process form data(changes): validate it(by means of the validator passed in the constructor, or the default one)
and save it in the local data structure of the model. If some fields are invalid - nothing will be saved,
but the ValidationError instance will be thrown.

**Parameters**:

| Type       | Name        | Description                                                                                                      |
|------------|-------------|------------------------------------------------------------------------------------------------------------------|
| Object     | changes     | *Required*. Changes(or new values) in the form data. Expected structure: `{field1Name: 'value1', ..., fieldNName: 'valueN'}`    |

**Returns**: Promise which resolves with data that was saved(duplicates the parameter passed to the method)

----

### getValidationDependency

{% highlight javascript %}
  const dependentFields = formModel.getValidationDependency(fields);
{% endhighlight %}

Return fields(Array of string values) that need to be sent additionally to validate fields specified in passed parameters.
This method is required for creating group validators\(read details [here](/validator.html)\).

**Parameters**:

| Type       | Name   | Description                                                           |
|------------|--------|-----------------------------------------------------------------------|
| String [ ] | fields | *Required*. Array of fields to get their validation-dependant fields  |

----

### async isValidRecord

{% highlight javascript %}
  const valid = await formModel.isValidRecord(record);
{% endhighlight %}

Validate specified record by means of the validator passed in the constructor, or the default one.

**Parameters**:

| Type       | Name     | Description                                                                                                      |
|------------|----------|------------------------------------------------------------------------------------------------------------------|
| Object     | record   | *Required*. Record to validate. Expected structure: `{field1Name: 'value1', ..., fieldNName: 'valueN'}`      |

**Returns**: Promise which resolves with *ValidationErrors*

---

## Example
{% highlight javascript %}
  const defaultValues = {
    login: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
  const validator = UIKernel.createValidator()
    // Check if email is valid using regular expression
    .field('email', UIKernel.Validators.regExp.notNull(/^.*@.*$/, 'Your email is invalid'))
    //validation of several dependent fields
    .fields(['password', 'passwordConfirm'], (data, errors) => {
      if (data.password !== data.passwordConfirm)
        errors.add('passwordConfirm', 'Passwords don\'t match');
    })
    //async validation:
    .asyncField('login', async (val) => {
       let response = await fetch('https://yesno.wtf/api');
       if(!response.ok)
         throw new Error('Unable to reach validation API :(');
       let respData = await response.json();
       if (respData.answer !== 'yes')
         return 'user with such login already exists!';
    });

  const userFormModel = new UIKernel.Model.Form(defaultValues, validator);

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