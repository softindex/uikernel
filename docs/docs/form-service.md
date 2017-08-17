---
title: Form service
id: form-service
prev: grid-express-api.html
next: form-interface.html
---

[Usage Example](form-example.html)

## Constructor

{% highlight javascript %}
  const formService = new UIKernel.Form();
{% endhighlight %}

___

## Methods

- [initForm(settings)](#initform)
- [addChangeListener(handler)](#addchangelistener)
- [removeChangeListener(handler)](#removechangelistener)
- [removeAllListeners()](#removealllisteners)
- [async updateField(field, value)](#async-updatefield)
- [async validateField(field, value)](#async-validatefield)
- [async validateForm()](#async-validateform)
- [async set(data, validate)](#async-set)
- [async submit()](#async-submit)
- [async submitData(data)](#async-submitdata)
- [clearError(field)](#clearerror)
- [clearFieldChanges(field)](#clearfieldchanges)
- [clearChanges()](#clearchanges)

---

### initForm

{% highlight javascript %}
  formService.initForm(settings);
{% endhighlight %}

Initialize a form

**Parameters**:

| Type                                                  | Name                                | Description                                            |
|-------------------------------------------------------|-------------------------------------|--------------------------------------------------------|
| <span style="white-space:nowrap;"> String [ ] </span> | settings.fields                     | *Required*. Fields list, that are required to display
| [FormModel](/docs/form-interface.html)                | settings.model                      | *Required*. Form model
| Object                                                | settings.data                       | *Optional*. Preset data
| Object                                                | settings.changes                    | *Optional*. Preset changes
| Boolean                                               | settings.submitAll=false            | *Optional*. Send all form for validity check
| Boolean                                               | settings.partialErrorChecking=false | *Optional*. Activate partial gradual form validation
| Boolean                                               | settings.showDependentFields=false  | *Optional*. Mark the fields which are involved in group validation |

----

### addChangeListener

{% highlight javascript %}
  formService.addChangeListener(handler);
{% endhighlight %}

Subscribe on formService 'update' events.

**Parameters**:

| Type     | Name    | Description                                                   |
|----------|---------|---------------------------------------------------------------|
| Function | handler | *Required*. An event handler which receives `changes` object  |


**`handler`s arguments:**

| Type     | Name                       | Description                                           |
|----------|----------------------------|-------------------------------------------------------|
| Object   | changes.data               | Form data, or null if it’s absent
| Object   | changes.originalData       | Form data without changes
| Boolean  | changes.isLoaded           | Check if data loaded
| Object   | changes.changes            | Form changes
| Object   | changes.errors             | Form errors
| Object   | changes.globalError        | Global error data, or null if it’s absent
| Boolean  | changes.submitting         | Check if form is being submitted                      |

----

### removeChangeListener

{% highlight javascript %}
  formService.removeChangeListener(handler);
{% endhighlight %}

Unsubscribe from formService 'update' events.

**Parameters**:

| Type     | Name    | Description                               |
|----------|---------|-------------------------------------------|
| Function | handler | *Required*. An event handler to stop listening to events |

----

### removeAllListeners

{% highlight javascript %}
  formService.removeAllListeners();
{% endhighlight %}

Unsubscribe all formService 'update' events handlers.

----

### async updateField

{% highlight javascript %}
  await formService.updateField(field, value);
{% endhighlight %}

Update changes of the specified form field(s). Returns promise which resolves when the field is updated.
 The method triggers 'update' event eventually

**Parameters**:

| Type     | Name    | Description                                                        |
|----------|---------|--------------------------------------------------------------------|
| String   | field   | *Required*. Field name to update.                                              |
| Any      | value   | *Required*. Value to update the field with. Can be either an event or any serializable data |

----

### async validateField

{% highlight javascript %}
  let validationErrors = await formService.validateField(field, value);
{% endhighlight %}

Update field value and validate form. Returns Promise which resolves with validation errors
(if there are some invalid fields) or empty result.
 The method triggers 'update' event eventually

**Parameters**:

| Type     | Name    | Description                                                        |
|----------|---------|--------------------------------------------------------------------|
| String   | field   | *Required*. Field name to update.                                              |
| Any      | value   | *Required*. Value to update the field with. Can be either an event or any serializable data |

----

### async validateForm

{% highlight javascript %}
 let validationErrors = await formService.validateForm();
{% endhighlight %}

Validate form. Returns Promise which resolves with validation errors
(if there are some invalid fields) or empty result.
The method triggers 'update' event eventually

----

### async set

{% highlight javascript %}
  await formService.set(data, validate);
{% endhighlight %}

Set data(changes) in the form.
Returns Promise which resolves after data is set.
If parameter `validate` is specified, the promise will resolve with validation errors
(if there are some invalid fields) or empty result.
The method triggers 'update' event eventually

**Parameters**:

| Type     | Name           | Description                                                                                |
|----------|----------------|--------------------------------------------------------------------------------------------|
| Object   | data           | *Required*. New data to be saved in the internal class structure                                       |
| Boolean  | validate=false | *Optional*. If the data should be validated after saving(there might be kept invalid data and it's ok) |

----

### async submit

{% highlight javascript %}
  await formService.submit();
{% endhighlight %}

Send form data(changes) to the model.
If the data is invalid, or there is appeared an error while sending form data to the model -
the error will be thrown. If everything went well, the sent data will be returned.
The method triggers 'update' event eventually

----

### async submitData

{% highlight javascript %}
  await formService.submitData(data);
{% endhighlight %}

Set data as changes in the form and send it to the model(combines set and submit methods).
The method triggers 'update' event eventually

**Parameters**:

| Type     | Name       | Description                                                                                |
|----------|------------|--------------------------------------------------------------------------------------------|
| Object   | data       | *Required*. New data to be saved in the internal class structure and sent to the model |

----

### clearError

{% highlight javascript %}
  formService.clearError(field);
{% endhighlight %}

Clear field error mark. The method triggers 'update' event eventually

**Parameters**:

| Type                                                              | Name   | Description                                                                                     |
|-------------------------------------------------------------------|--------|-------------------------------------------------------------------------------------------------|
| <span style="white-space:nowrap;"> String [ ] \|\| String </span> | field  | *Required*. Field name(s) to clear error of. Accepts ether one string value, or array of string field names |

----

### clearFieldChanges

{% highlight javascript %}
  formService.clearFieldChanges(field);
{% endhighlight %}

Clear form field data(changes). The method triggers 'update' event eventually

**Parameters**:

| Type     | Name    | Description                                                        |
|----------|---------|--------------------------------------------------------------------|
| String   | field   | *Required*. Field name to clear changes of.                        |

----

### clearChanges

{% highlight javascript %}
  formService.clearChanges();
{% endhighlight %}

Clear all form data(changes).
The method triggers 'update' event eventually
