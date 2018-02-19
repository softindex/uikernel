---
title: Grid Model Interface
id: grid-interface
prev: grid-columns.html
next: grid-model-xhr.html
---

Definition of the model which is able to create, read, edit, remove and validate records of spreadsheets(grids).

## Implementations
* [Grid Xhr Model](/docs/grid-model-xhr.html)
* [Grid Collection Model](/docs/grid-model-collection.html)

## Constructor

{% highlight javascript %}
  const abstractGridModel = new UIKernel.AbstractModels.Grid();
{% endhighlight %}

## Methods

### (abstract) async create

{% highlight javascript %}
  async Object create(Object record)
{% endhighlight %}

Adds a record to the grid model data and returns an ID of the added record.

----

### (abstract) async read

{% highlight javascript %}
  async Array read(Object settings)
{% endhighlight %}

Retrieves grid records applying there filters, sorting, limits and offset.

---

### (abstract) async getRecord

{% highlight javascript %}
  async Object getRecord (Any id, string[] fields)
{% endhighlight %}

Get record by ID.

---

### (abstract) async update

{% highlight javascript %}
  async Array update(Object[][] changes)
{% endhighlight %}

Applies record changes.

---

### (abstract) getValidationDependency

{% highlight javascript %}
  string[] getValidationDependency(string[] fields)
{% endhighlight %}

Return fields(Array of string values) that need to be sent additionally to validate fields specified in passed parameters.

---

### (abstract) async isValidRecord

{% highlight javascript %}
  async ValidationErrors isValidRecord(Object record)
{% endhighlight %}

Validates a record.

---
