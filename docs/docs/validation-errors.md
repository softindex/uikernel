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
  const myErrorsInstance1 = new ValidationErrors();
{% endhighlight %}

---

## Methods

- [(static) createFromJSON(jsonObject)](#static-createfromjson)
- [(static) merge(error1, error2, ..., errorN)](#static-merge)
- [add(field, errorText)](#add)
- [clear()](#clear)
- [clearField(field)](#clearfield)
- [clone()](#clone)
- [getErrors()](#geterrors)
- [getFailedFields()](#getfailedfields)
- [getFieldErrors(field)](#getfielderrors)
- [hasError(field)](#haserror)
- [isEmpty(field)](#isempty)
- [toJSON()](#tojson)

---

### (static) createFromJSON

{% highlight javascript %}
  const myErrorsInstance2 = ValidationErrors.createFromJSON(jsonObject);
{% endhighlight %}

Convert object with a description of errors into ValidationErrors instance.

**Parameters**:

| Type    | Name       | Description                                                                                       |
|---------|------------|---------------------------------------------------------------------------------------------------|
| Object  | jsonObject | *Required*. An ValidationErrors description Object that will be turned into its instance. Expected structure: |
|         |            | {field1: ["field1 error1"], field2: ["field2 error1", "field2 error2"], ...}  |

**Returns**: new `ValidationErrors` instance.

**Example**:
{% highlight javascript %}
  const myErrorsInstance2 = ValidationErrors.createFromJSON({
    login: "invalid login!",
    pass: "invalid password!"
  });
{% endhighlight %}

---

### (static) merge

{% highlight javascript %}
  const myErrorsInstance3 = ValidationErrors.merge(error1, error2, ..., errorN);
{% endhighlight %}

Unites several ValidationErrors instances into one.

**Parameters**:

| Type              | Name        | Description                                                                           |
|-------------------|-------------|---------------------------------------------------------------------------------------|
| ValidationErrors  | error1      | *Required*. A ValidationErrors instance to be united with others passed in arguments  |
| ValidationErrors  | error2      | *Optional*. A ValidationErrors instance to be united with others passed in arguments  |
| ValidationErrors  | errorN      | *Optional*. A ValidationErrors instance to be united with others passed in arguments  |

**Returns**: new `ValidationErrors` instance.

---

### add

{% highlight javascript %}
  myErrorsInstance3.add(field, errorText);
{% endhighlight %}

Add en error into the ValidationErrors instance.

**Parameters**:

| Type    | Name         | Description |
|---------|--------------|-------------|
| String  | field        | *Required*. Field name  |
| String  | errorText    | *Required*. Error text  |

**Returns**: this

**Example**:
{% highlight javascript %}
  myErrorsInstance3
    .add("email", "The email field is invalid!")
    .add("phone", "The phone number field is invalid!");
{% endhighlight %}

---

### clear

{% highlight javascript %}
  myErrorsInstance1.clear();
{% endhighlight %}

Clear errors list.

**Returns**: this

---

### clearField

{% highlight javascript %}
  myErrorsInstance3.clearField(field);
{% endhighlight %}

Clear errors of the specified field.

**Parameters**:

| Type    | Name     | Description                           |
|---------|----------|---------------------------------------|
| String  | field    | *Required*. Name of the field to be cleared from errors  |

**Returns**: this

**Example**:
{% highlight javascript %}
  myErrorsInstance3.clearField("email");
{% endhighlight %}

---

### clone

{% highlight javascript %}
  const myErrorsInstance3copy = myErrorsInstance3.clone();
{% endhighlight %}

Return a new instance cloning this, so that the new instance will have the same structure,
but a new memory address.

**Returns**: this

---

### getErrors

{% highlight javascript %}
  const myErrors = myErrorsInstance.getErrors();
{% endhighlight %}

Get errors entries of this ValidationErrors instance.

**Returns**: *Array* with the following structure: [["field1", ["field1 error1"]], ["field2", ["field2 error1", "field2 error2"]], ...]

**Example**:
{% highlight javascript %}
  for(let [field, error] of myErrorsInstance3.getErrors())
    console.log(field, ": ", error);
{% endhighlight %}

---

### getFailedFields

{% highlight javascript %}
  const fieldsWithErrors = myErrorsInstance.getFailedFields();
{% endhighlight %}

Get field names array, that contain errors.

**Returns**: *String[]* or *null*(if there is no errors)

**Example**:
{% highlight javascript %}
  const fieldsWithErrors3 = myErrorsInstance3.getFailedFields();   //["login", "pass", "phone"]
  const fieldsWithErrors7 = myErrorsInstance7.getFailedFields();   //null
{% endhighlight %}

---

### getFieldErrors

{% highlight javascript %}
  const loginErrors = myErrorsInstance3.getFieldErrors(field);
{% endhighlight %}

Get errors of the specified field.

**Parameters**:

| Type    | Name      | Description                   |
|---------|-----------|-------------------------------|
| String  | field     | *Required*. Field name to get errors of   |

**Returns**: *String[]* or *null*(if there is no errors)

**Example**:
{% highlight javascript %}
  const loginErrors = myErrorsInstance3.getFieldErrors("login");   //["invalid login!"]
{% endhighlight %}

---

### hasError

{% highlight javascript %}
  const loginIsValid = myErrorsInstance.hasError(field);
{% endhighlight %}

Check if the field has any errors.

**Parameters**:

| Type    | Name      | Description                   |
|---------|-----------|-------------------------------|
| String  | field     | *Required*. Field name to check validity of   |

**Returns**: *Boolean*

**Example**:
{% highlight javascript %}
  const loginIsValid = myErrorsInstance3.hasError("login");   //false
{% endhighlight %}

---

### isEmpty

{% highlight javascript %}
  const formIsValid = myErrorsInstance1.isEmpty(field);
{% endhighlight %}

Check if this ValidationErrors instance has any field with errors.

**Returns**: *Boolean*

**Example**:
{% highlight javascript %}
  const formIsValid = myErrorsInstance1.isEmpty();   //true
{% endhighlight %}

---

### toJSON

{% highlight javascript %}
  const formErrorsObj = myErrorsInstance3.toJSON();
{% endhighlight %}

Convert this ValidationErrors instance to plain JS Object.

**Returns**: *Object* with the following structure: {field1: ["field1 error1"], field2: ["field2 error1", "field2 error2"], ...}

**Example**:
{% highlight javascript %}
  const formErrorsObj = myErrorsInstance3.toJSON();
  //formErrorsObj === {login: ["invalid login!"], pass: ["invalid password!"], phone: ["The phone number field is invalid!"]}
{% endhighlight %}


