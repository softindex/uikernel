---
title: Form mixin
id: form-mixin
prev: grid-express-api.html
next: form-interface.html
---

[Example](form-example.html)

### initForm

{% highlight javascript %}
initForm(object settings, [function callback])
{% endhighlight %}

Initialize form

**Settings object**

| Type     | Name                       | Description                                           |
|----------|----------------------------|-------------------------------------------------------|
| string[] |     **fields**             | Fields list, that are required to display
| [FormModel](/docs/form-model.html) | **model**   | Form model
| Object   | data                       | Preset data
| Object   | changes                    | Preset changes
| boolean  | submitAll=false            | Send all form for validity check
| boolean  | partialErrorChecking=false | Activate partial gradual form validation
| boolean  | showDependentFields=false  | Mark the fields which are involved in group validation
| boolean  | autoSubmit                 | Automatic submit before updateField
| Function | autoSubmitHandler          | Automatic submit handler

----

### isLoaded

{% highlight javascript %}
boolean isLoaded()
{% endhighlight %}

Check if data loaded

----

### getChanges

{% highlight javascript %}
Object getChanges()
{% endhighlight %}

Get form changes

----

### hasChanges

{% highlight javascript %}
boolean hasChanges(string field)
{% endhighlight %}

Check if form field has validity errors

----

### hasError

{% highlight javascript %}
boolean hasError(string field) {
{% endhighlight %}

Check if form field has validity errors

----

### clearError

{% highlight javascript %}
clearError(string field, [function callback])
{% endhighlight %}

Clear field error mark

----

### getOriginalData

{% highlight javascript %}
Object getOriginalData()
{% endhighlight %}

Get form data without changes

----

### getData

{% highlight javascript %}
Object getData()
{% endhighlight %}

Get form data, or **null** if it's absent

----

### getValidationErrors

{% highlight javascript %}
ValidationErrors getValidationErrors()
{% endhighlight %}

Get form errors

----

### getFieldErrors

{% highlight javascript %}
string[] getFieldErrors(string field)
{% endhighlight %}

Get field errors

---

### getGlobalError

{% highlight javascript %}
Error getGlobalError()
{% endhighlight %}

Get global error data, or **null** if it's absent

----

### updateField

{% highlight javascript %}
updateField(string fields, * values, [function callback])
updateField(string[] fields, * values, [function callback])
{% endhighlight %}

Update form value. Is used as the Editors onSubmit handler.
Values param gets event or data.

----

### validateField

{% highlight javascript %}
validateField(string fields, * values, function callback)
validateField(string[] fields, * values, function callback)
{% endhighlight %}

Update form value and validate form

----

### validateForm

{% highlight javascript %}
validateForm([function callback])
{% endhighlight %}

Validate form

----

### set

{% highlight javascript %}
set(Object data, [boolean validate], [function callback])
{% endhighlight %}

Set data in the form

----

### submitData

{% highlight javascript %}
submitData(Object data, function callback)
{% endhighlight %}

Submit data

----

### submit

{% highlight javascript %}
submit([function callback])
{% endhighlight %}

Send form data to the model

----

### isSubmitting
{% highlight javascript %}
boolean isSubmitting()
{% endhighlight %}

Check if form is being submitted

----

### clearFieldChanges

{% highlight javascript %}
clearFieldChanges(string field, [function callback])
{% endhighlight %}

Clear form field changes

----

### clearChanges

{% highlight javascript %}
clearChanges([function callback])
{% endhighlight %}

Clear form changes
