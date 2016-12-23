---
title: Form service
id: form-service
prev: grid-express-api.html
next: form-interface.html
---

[Example](form-example.html)

## Constructor

{% highlight javascript %}
getInitialState: function () {
    this.form = new UIKernel.Services.Form();
  }
{% endhighlight %}

### initForm

{% highlight javascript %}
componentDidMount() {
    this.form.initForm(object settings);
    this.form.addChangeListener(function handler); //subscribe on form change
  },

  componentWillUnmount() {
      this.form.removeChangeListener(function handler); //unsubscribe
  },
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

----

**Function handler result object**

| Type     | Name                       | Description                                           |
|----------|----------------------------|-------------------------------------------------------|
| Object   | data                       | Form data, or null if it’s absent
| Object   | originalData               | Form data without changes
| boolean  | isLoaded                   | Check if data loaded
| Object   | changes                    | Form changes
| Object   | errors                     | Form errors
| Object   | globalError                | Global error data, or null if it’s absent
| boolean  | submitting                 | Check if form is being submitted

----

### clearError

{% highlight javascript %}
clearError(string field)
{% endhighlight %}

Clear field error mark

----

### updateField

{% highlight javascript %}
updateField(string fields, * values)
updateField(string[] fields, * values)
{% endhighlight %}

Update form value. Is used as the Editors onSubmit handler.
Values param gets event or data.

----

### validateField

{% highlight javascript %}
validateField(string fields, * values)
validateField(string[] fields, * values)
{% endhighlight %}

Update form value and validate form

----

### validateForm

{% highlight javascript %}
validateForm()
{% endhighlight %}

Validate form

----

### set

{% highlight javascript %}
set(Object data, [boolean validate])
{% endhighlight %}

Set data in the form

----

### submitData

{% highlight javascript %}
submitData(Object data)
{% endhighlight %}

Submit data

----

### submit

{% highlight javascript %}
submit()
{% endhighlight %}

Send form data to the model

----

### clearFieldChanges

{% highlight javascript %}
clearFieldChanges(string field)
{% endhighlight %}

Clear form field changes

----

### clearChanges

{% highlight javascript %}
clearChanges()
{% endhighlight %}

Clear form changes
