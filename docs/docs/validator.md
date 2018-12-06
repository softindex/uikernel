---
title: Validator
id: validator
prev: form-express-api.html
next: validation-errors.html
---

UIKernel provides a handy tool to validate data,
so that the user can be notified of invalid input
before submitting a form or changes in an editable grid.

### createValidator

{% highlight javascript %}
  const validator = UIKernel.createValidator();
{% endhighlight %}

Returns a builder that allows to define validation rules.

---

## Methods

- [field(fieldName, rule,  rule2, ruleN)](#field)
- [fields(fieldNames, rule)](#fields)
- [asyncDependence(fieldNames)](#asyncdependence)
- [asyncField(fieldName, rule)](#asyncfield)
- [asyncFields(fieldNames, rule)](#asyncfields)
- [getValidationDependency(string [ ] fields)](#getvalidationdependency)
- [async isValidRecord(Object record, function callback)](#async-isvalidrecord)

___

### field

{% highlight javascript %}
  validator.field(fieldName, rule,  rule2, ...,  ruleN);
{% endhighlight %}

Add synchronous field validation.

**Parameters**:

| Type       | Name       | Description                                                                      |
|------------|------------|----------------------------------------------------------------------------------|
| String     | fieldName  | *Required*. Field name to add validation for.                                    |
| Function   | rule       | *Required*. Function to validate the field. If the field is invalid, the function should return a string value with error text. Else(if the field is valid) the function should return nothing. `rule` may be your own function, or one of the predefined in the UIKernel validation functions |
| Function   | rule2      | *Optional*   |
| Function   | ruleN      | *Optional*   |

**`rule`s arguments:**

| Type     | Name        | Description                         |
|----------|-------------|-------------------------------------|
| Any      | value       | The value of the field to validate  |

---

### fields

{% highlight javascript %}
  validator.fields(fieldNames, rule);
{% endhighlight %}

Specify a rule for synchronous validation of a group of fields.

**Parameters**:

| Type                                                  | Name       | Description                                                                      |
|-------------------------------------------------------|------------|----------------------------------------------------------------------------------|
| <span style="white-space:nowrap;"> String [ ] </span> | fieldNames | *Required*. Field names(Array of string values) to add validation for.                                    |
| Function                                              | rule       | *Required*. Function to validate the fields. If any of the fields is invalid, the `rule` function should add the corresponding error to the `errors` object(second argument passed to the `rule` function). |

**`rule`s arguments:**

| Type              | Name     | Description                         |
|-------------------|----------|-------------------------------------|
| Object            | record   | Object with values of all fields. The object has the following structure: {field1: field1Value, field2: field2Value, ...} |
| ValidationErrors  | errors   | Object with errors of all fields. If any of the fields is invalid, the `rule` function should add the corresponding error to this errors object. |

---

### asyncDependence

{% highlight javascript %}
  validator.asyncDependence(fieldNames);
{% endhighlight %}

Specify server validation dependencies in a client validator.

**Parameters**:

| Type       | Name       | Description                                                                      |
|------------|------------|----------------------------------------------------------------------------------|
| String [ ] | fieldNames | *Required*. Field names(Array of string values) which need to be validated on a remote server. |

**Example**:

`/validation/client.js`
{% highlight javascript %}
  const clientValidator = UIKernel.createValidator()
    //...here might be some other fields
    .asyncDependence(['recordId', 'keywords']);
{% endhighlight %}

`/validation/server.js`
{% highlight javascript %}
  //serverValidator should be called in server model in response to a client request
  //  there is an example of how to do it is in the server side tutorial
  const serverValidator = UIKernel.createValidator()
    //...here might be some other fields
    .asyncFields(
      //dependent fields received from the client validator,
      // they are sending to serverValidator automatically when
      // clientValidator.isValidRecord(`serverValidationUrl`) is called.
      ['recordId', 'keywords'],
      async function keywordValidation(record, errors) {
        let queryString = `SELECT keyword FROM my_keywords_table WHERE record_id = ${record.recordId}`,
        queryResult = await mysql.query(queryString),
        existingKeywords = queryResult.map(row => row.keyword);

        const uniqCount = 0;
        for(let recKeyword of record.keywords)
          if(existingKeywords.includes(recKeyword))
            return errors.add('keywords', 'All the keywords must be new and unique!');
      }
    );
{% endhighlight %}

---

### asyncField

{% highlight javascript %}
  validator.asyncField(fieldName, rule);
{% endhighlight %}

Add an asynchronous validation rule to a field.

**Parameters**:

| Type             | Name       | Description                                                                      |
|------------------|------------|----------------------------------------------------------------------------------|
| String           | fieldName  | *Required*.  |
| async Function   | rule       | *Required*. Async function to validate the field. If the field is invalid, the function should resolve with a string value of the error text. Else(if the field is valid) the function should resolve with an empty value(null or undefined). |

---

### asyncFields

{% highlight javascript %}
  validator.asyncFields(fieldNames, rule)
{% endhighlight %}

Specify a rule for asynchronous validation of a group of fields.

**Parameters**:

| Type                                                  | Name        | Description                                                                      |
|-------------------------------------------------------|-------------|----------------------------------------------------------------------------------|
| <span style="white-space:nowrap;"> String [ ] </span> | fieldNames  | *Required*. Field names(Array of string values) to add validation for.           |
| async Function                                        | rule*       | *Required*. Async function to validate the field. If any of the fields is invalid, the `rule` function should add the corresponding error to the `errors` object(second argument passed to the `rule` function) and resolve eventually. |

**`rule`s arguments:**

| Type              | Name     | Description                         |
|-------------------|----------|-------------------------------------|
| Object            | record   | Object with values of all fields. The object has the following structure: {field1: field1Value, field2: field2Value, ...} |
| ValidationErrors  | errors   | Object with errors of all fields. If any of the fields is invalid, the `rule` function should add the corresponding error to this errors object. |

---

### getValidationDependency

{% highlight javascript %}
  let dependentFields = validator.getValidationDependency(fields);
{% endhighlight %}

Get all dependent fields required for validation of passed `fields`.
Dependent fields come up when you use group validation methods: `fields()`, `asyncDependence()`, `asyncFields()`.

**Parameters**:

| Type                                                  | Name      | Description                                                        |
|-------------------------------------------------------|-----------|--------------------------------------------------------------------|
| <span style="white-space:nowrap;"> String [ ] </span> | fields    | *Required*. Fields names which you want to get dependent fields of |

**Returns**: *String [ ]*

**Example**:
{% highlight javascript %}
  let validator = UIKernel.createValidator()
    .fields(['password', 'passwordConfirm'], (data, errors) => {
      if (data.password !== data.passwordConfirm)
        errors.add('passwordConfirm', 'Passwords don\'t match');
    });

  let dependentFields = validator.getValidationDependency(['passwordConfirm']);

  console.log(dependentFields);  //[['password']
{% endhighlight %}

---

### async isValidRecord

{% highlight javascript %}
  const validationResult = await validator.isValidRecord(record);
{% endhighlight %}

Checks validity of the given `record`. Returns ValidationErrors instance.

**Parameters**:

| Type      | Name    | Description                                                                                                             |
|-----------|---------|-------------------------------------------------------------------------------------------------------------------------|
| Object    | record  | *Required*. Record to validate. The object has the following structure: {field1: field1Value, field2: field2Value, ...} |

**Returns**: Promise which resolves with *ValidationErrors* instance.

---

## Built-in Validation Rules
There is a set of basic validation rules is provided out of the box:

{% highlight javascript %}
// Check if value is not empty string, null and undefined
UIKernel.Validators.notNull(string errorMessage)

// Check if value is not an empty string, array or object and not null, undefined, 0
UIKernel.Validators.notEmpty(string errorMessage)

// Check if value is boolean
UIKernel.Validators.boolean(string errorMessage)
UIKernel.Validators.boolean.notNull(string errorMessage)

// Check if date matches min-to-max range
UIKernel.Validators.date(Date min, Date max, string errorMessage)
UIKernel.Validators.date.notNull(Date min, Date max, string errorMessage)

// Check if variants contain the value
UIKernel.Validators.enum(Array variants, string errorMessage)
UIKernel.Validators.enum.notNull(Array variants, string errorMessage)

// Check if value is float
UIKernel.Validators.float(number min, number max, string errorMessage)
UIKernel.Validators.float.notNull(number min, number max, string errorMessage)

// Check if value is integer
UIKernel.Validators.number(number min, number max, string errorMessage)
UIKernel.Validators.number.notNull(number min, number max, string errorMessage)

// Check if value matches regular expression
UIKernel.Validators.regExp(RegExp regExp, string errorMessage)
UIKernel.Validators.regExp.notNull(RegExp regExp, string errorMessage)

// Check if value belongs to set
UIKernel.Validators.set(Array set, string errorMessage)
UIKernel.Validators.set.notNull(Array set, string errorMessage)
{% endhighlight %}

---

## Custom Validation Rules

You can also define your own validation rules. For example:
{% highlight javascript %}
  function oddNumbers(value) {
    if (value % 2 === 0) {
      return 'The value must be odd.';
    }
  }

  const validator = UIKernel.createValidator()
    .field('oddField', oddNumbers);
{% endhighlight %}

---

## Validation Example
Usage of the validator is built-in in Grid and Form models,
[here is an example](/docs/editing-grid-data.html)

But you can also use it independently wherever you want, e.g.:
{% highlight javascript %}
  const validator = UIKernel.createValidator()
    // Check if email is valid using regular expression
    .field('email', UIKernel.Validators.regExp.notNull(/^.*@.*$/, 'Your email is invalid'))
    //validation of several dependent fields
    .fields(['password', 'passwordConfirm'], (record, errors) => {
      if (record.password !== record.passwordConfirm)
        errors.add('passwordConfirm', 'Passwords don\'t match');
    })
    // Check if country isn't empty
    .field('country', UIKernel.Validators.notNull('This field must not be empty.'))
    // Check if data isn't less than '2014-10-01'
    .field('timestamp', UIKernel.Validators.date.notNull(
      '2014-10-01', null,
      'Timestamp must exceed 2014-10-01'
    ))
    // Check if age matches 15-90 range
    .field('age', UIKernel.Validators.number.notNull(15, 90,
      'You do not have the right age'
    ))
    // Check if credit isn't less than 30.5
    .field('credit', UIKernel.Validators.float(30.5, null,
      'You can not take the credit which is less than 30.5'
    ))
     // Check if interests belong to set
     .field('interests',
        UIKernel.Validators.set.notNull(['ART', 'SPORT', 'ANIMALS', 'GAMES'], 'An incorrect interest')
     )
    // Check if user agrees with terms of use
    .field( 'agree', UIKernel.Validators.boolean.notNull(true, 'Select that you agree with the rules'))
    // Check by means of the **custom validator** if a number is odd
    .field('oddField', (value) => {
      if (value % 2 === 0)
        return 'oddField should be odd';
     })
    //async validation:
    .asyncField('login', async function (val) {
       let response = await fetch('https://yesno.wtf/api');
       if(!response.ok)
         throw new Error('Unable to reach validation API :(');
       let respData = await response.json();
       if (respData.answer !== 'yes')
         return 'user with such login already exists!';

       //or if it's the server side validation you can make DB request here
    });

  const testRecord = {
    email: "z.freid1856@gmail.com",
    password: "12345678",
    passwordConfirm: "smth else",
    country: "Austria",
    timestamp: 1495032689647,
    age: 161,
    credit: 777,
    interests: ["PSYCHOLOGY"],
    agree: false,
    oddField: 13,
    login: "z.freid1856"
  };

  try {
    const validationResult = await validator.isValidRecord(testRecord);
    if (validationResult.isEmpty())
      console.log('All right, there is no any errors! Validation result:', validationResult);
    else
      console.error('Passed record is invalid! Validation errors:', validationResult);
  } catch (err) {
    console.error('There is appeared an unexpected error in validation process:', err);
  }

{% endhighlight %}
