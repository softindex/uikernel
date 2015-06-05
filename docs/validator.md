---
title: Validator
id: validator
prev: grid-model-collection.html
next: filter-adapter.html
---

Validation is an important consideration for products. Here are some basic validation examples within UIKernel:

---

### createValidator

{% highlight javascript %}
Validator createValidator() 
{% endhighlight %}

Returns a builder needed to start a definition of validation rules.
---

### field

{% highlight javascript %}
Validator field(string field, [string|null function validator(value), ...])
{% endhighlight %}

Add synchronous field validation. Such a function returns error description if existing.

Some basic synchronous validators already exist:

{% highlight javascript %}
// Check if value is boolean
UIKernel.Validators.boolean(string errorMessage)

// Check if date matches min-to-max range
UIKernel.Validators.date(Date min, Date max, string errorMessage)

// Check if variants contain the value
UIKernel.Validators.enum(Array variants, string errorMessage)

// Check if value is float
UIKernel.Validators.float(number min, number max, string errorMessage)

// Check if value matches [id, string label] form
UIKernel.Validators.listElement(string errorMessage)

// Check if value matches [id, string label] form and id is not null
UIKernel.Validators.listElement.isRequired(string errorMessage)

// Check if value is not empty
UIKernel.Validators.notNull(string errorMessage)

// Check if value is integer
UIKernel.Validators.number(number min, number max, string errorMessage)

// Check if value matches regular expression
UIKernel.Validators.regExp(RegExp regExp, string errorMessage)
{% endhighlight %}


[Sources]({{ site.github }})

---

### fields

{% highlight javascript %}
Validator fields(string[] fields, function validatorFunction(Object record, ValidationErrors errors))
{% endhighlight %}

Specify multiple synchronous validators for fields group. If errors occur, function complements errors object.

---

### asyncDependence

{% highlight javascript %}
Validator asyncDependence(string[] fields)
{% endhighlight %}

Function specifies server validation dependencies in a client validator.

---

### asyncField

{% highlight javascript %}
Validator asyncField(string field,  function (value, function cb(Error err, string errorMessage)))
{% endhighlight %}

Add field asynchronous validator.

---

### asyncFields

{% highlight javascript %}
Validator asyncFields(string[] fields, function (Object record, ValidationErrors errors, function cb(Error err)))
{% endhighlight %}

Add field asynchonous validators. If errors occur, function complements `errors` object.

> `err` contains the error, that occured during asynchronous function execution, the `errors` parameter contain
validation errors.

---

## Validation example

{% highlight javascript %}
var yourValidation = UIKernel.createValidator()
  // Check if country's present
  .field('country', Validators.notNull('Invalid country.'))
  // Check if email is valid using regular expressin
  .field('email', Validators.regExp(
    /^.*@.*$/,
    'Your email is invalid'
  ))
  // Check data isn't less than '2014-10-01' 
  .field('timestamp', Validators.date(
    '2014-10-01', null,
    'Timestamp must exceed 2014-10-01'
  ))
  // Check if the age matches 15-90 range
  .field('age', Validators.number(15, 90,
    'You do not have the right age'
  ))
  // Check if credit isn't less than 30.5
   .field('credit', Validators.float(30.5, null,
      'You can not take the credit is less than 30.5'
    ))
  // Check if user agrees with terms of use
   .field('agree', Validators.boolean(true,
      'Select that you agree with the rules.'
    ))
{% endhighlight %}

---

## Building result

### getValidationDependency

{% highlight javascript %}
 string[] getValidationDependency(string[] fields)
{% endhighlight %}

Get all dependent fields validation needs

---

### isValidRecord

{% highlight javascript %}
 ValidationErrors|null isValidRecord(Object record, function callback(Error error, ValidationErrors result))
{% endhighlight %}

Check record validity
