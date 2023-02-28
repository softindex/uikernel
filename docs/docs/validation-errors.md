---
title: ValidationErrors
id: validation-errors
prev: validator.html
next: reports-mixin.html
---

Useful helper class to work with validation errors.

## Constructor

Returns an instance of the ValidationErrors class.

**Example**:
{% highlight javascript %}
  import {ValidationErrors} from 'uikernel';

  const validationErrors = new ValidationErrors(); 
  // validationErrors = {field1: [“field1 error1”], field2: [“field2 error1”, “field2 error2”], …}
{% endhighlight %}

---

## Methods

- [(static) createFromJSON(jsonObject)](#static-createfromjson)
- [(static) createWithError(field, error)](#static-createwitherror)
- [(static) merge(error1, error2, ..., errorN)](#static-merge)
- [add(field, error)](#add)
- [clear()](#clear)
- [clearField(field)](#clearfield)
- [clone()](#clone)
- [getErrors()](#geterrors)
- [getFailedFields()](#getfailedfields)
- [getFieldErrorMessages(field)](#getfielderrormessages)
- [hasError(field)](#haserror)
- [isEmpty(field)](#isempty)
- [toJSON()](#tojson)

---

### (static) createFromJSON

{% highlight javascript %}
  const validationErrors = ValidationErrors.createFromJSON(jsonObject);
{% endhighlight %}

Convert object with a description of errors into ValidationErrors instance.

**Parameters**:

| Type    | Name       | Description                                                                                       |
|---------|------------|---------------------------------------------------------------------------------------------------|
| Object  | jsonObject | An ValidationErrors description Object that will be turned into its instance. Expected structure: |
|         |            | {field1: ["field1 error1"], field2: ["field2 error1", "field2 error2"], ...}  |

**Returns**: new `ValidationErrors` instance.

**Example**:
{% highlight javascript %}
  const validationErrors = ValidationErrors.createFromJSON({
    login: "invalid login!",
    pass: "invalid password!"
  });
{% endhighlight %}

---

### (static) createWithError

Create ValidationErrors instance with one error.

**Parameters**:

| Type    | Name  | Description |
|---------|-------|-------------|
| string  | field | Field name  |
| string  | error | Error text  |

**Returns**: new `ValidationErrors` instance.

**Example**:
{% highlight javascript %}
  const validationErrors = ValidationErrors.createWithError('message', 'Massage is required');
{% endhighlight %}

---

### (static) merge

{% highlight javascript %}
  const validationErrors = ValidationErrors.merge(error1, error2, ..., errorN);
{% endhighlight %}

Unites several ValidationErrors instances into one.

**Parameters**:

| Type              | Name        | Description                                                                           |
|-------------------|-------------|---------------------------------------------------------------------------------------|
| ValidationErrors  | error1      | A ValidationErrors instance to be united with others passed in arguments  |
| ValidationErrors  | error2      | *(Optional)* A ValidationErrors instance to be united with others passed in arguments  |
| ValidationErrors  | errorN      | *(Optional)* A ValidationErrors instance to be united with others passed in arguments  |

**Returns**: new `ValidationErrors` instance.

---

### add

{% highlight javascript %}
  validationErrors.add(field, errorText);
{% endhighlight %}

Add en error into the ValidationErrors instance.

**Parameters**:

| Type    | Name         | Description |
|---------|--------------|-------------|
| string  | field        | Field name  |
| string  | errorText    | Error text  |

**Returns**: this

**Example**:
{% highlight javascript %}
  validationErrors
    .add("email", "The email field is invalid!")
    .add("phone", "The phone number field is invalid!");
{% endhighlight %}

---

### clear

{% highlight javascript %}
  validationErrors.clear();
{% endhighlight %}

Clear errors list.

**Returns**: this

---

### clearField

{% highlight javascript %}
  validationErrors.clearField(field);
{% endhighlight %}

Clear errors of the specified field.

**Parameters**:

| Type    | Name     | Description                           |
|---------|----------|---------------------------------------|
| string  | field    | Name of the field to be cleared from errors  |

**Returns**: this

**Example**:
{% highlight javascript %}
  validationErrors.clearField("email");
{% endhighlight %}

---

### clone

{% highlight javascript %}
  const validationErrors2 = validationErrors.clone();
{% endhighlight %}

Return a new instance cloning this, so that the new instance will have the same structure,
but a new memory address.

**Returns**: this

---

### getErrors

{% highlight javascript %}
  const myErrors = validationErrors.getErrors();
{% endhighlight %}

Get errors entries of this ValidationErrors instance.

**Returns**: *Array* with the following structure: [["field1", ["field1 error1"]], ["field2", ["field2 error1", "field2 error2"]], ...]

**Example**:
{% highlight javascript %}
  for(let [field, errors] of validationErrors.getErrors())
    console.log(field, ": ", errors);
{% endhighlight %}

---

### getFailedFields

{% highlight javascript %}
  const fieldsWithErrors = validationErrors.getFailedFields();
{% endhighlight %}

Get field names array, that contain errors.

**Returns**: *string[]* or *null*(if there is no errors)

**Example**:
{% highlight javascript %}
  const fieldsWithErrors3 = validationErrors.getFailedFields();   //["login", "pass", "phone"]
  const fieldsWithErrors7 = validationErrors.getFailedFields();   //null
{% endhighlight %}

---

### getFieldErrorMessages

{% highlight javascript %}
  const loginErrors = validationErrors.getFieldErrorMessages(field);
{% endhighlight %}

Get errors messages of the specified field.

**Parameters**:

| Type    | Name      | Description                   |
|---------|-----------|-------------------------------|
| string  | field     | Field name to get errors of   |

**Returns**: *string[]* or *null*(if there is no errors)

**Example**:
{% highlight javascript %}
  const loginErrors = validationErrors.getFieldErrorMessages("login");   //["invalid login!"]
{% endhighlight %}

---

### hasError

{% highlight javascript %}
  const loginIsValid = validationErrors.hasError(field);
{% endhighlight %}

Check if the field has any errors.

**Parameters**:

| Type    | Name      | Description                   |
|---------|-----------|-------------------------------|
| string  | field     | Field name to check validity of   |

**Returns**: *Boolean*

**Example**:
{% highlight javascript %}
  const loginIsValid = validationErrors.hasError("login");   //false
{% endhighlight %}

---

### isEmpty

{% highlight javascript %}
  const formIsValid = validationErrors.isEmpty(field);
{% endhighlight %}

Check if this ValidationErrors instance has any field with errors.

**Returns**: *Boolean*

**Example**:
{% highlight javascript %}
  const formIsValid = validationErrors.isEmpty();   //true
{% endhighlight %}

---

### toJSON

{% highlight javascript %}
  const formErrorsObj = validationErrors.toJSON();
{% endhighlight %}

Convert this ValidationErrors instance to plain JS Object.

**Returns**: *Object* with the following structure: {field1: ["field1 error1"], field2: ["field2 error1", "field2 error2"], ...}

**Example**:
{% highlight javascript %}
  const formErrorsObj = validationErrors.toJSON();
  // formErrorsObj === {
  //   login: ["invalid login!"],
  //   pass: ["invalid password!"],
  //   phone: ["The phone number field is invalid!"]
  // }
{% endhighlight %}


