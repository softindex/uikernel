---
title: Grid Model Interface
id: grid-interface
prev: grid-columns.html
next: grid-model-xhr.html
---

A standard model that describes the basic methods  (creation, reading, editing, deletion and validation) of grids without a specific implementation.

## Implementations
* [Grid Xhr Model](/docs/grid-model-xhr.html)
* [Grid Collection Model](/docs/grid-model-collection.html)

It is recommended for inheritance when creating your own models on the client side.

## Abstract Model

{% highlight javascript %}
  const ownModelImplementation = new UIKernel.AbstractModels.Grid();
{% endhighlight %}

## Methods

### async create

{% highlight javascript %}
  async Object create(Object record)
{% endhighlight %}

Adds a record to the grid model data and returns an ID of the added record.

**Returns**: Promise which resolves with an id of the created record.
             If passed record is invalid then the ValidationErrors instance will be thrown.

----

### async read

{% highlight javascript %}
  async Array read(Object settings)
{% endhighlight %}

Retrieves grid records applying there filters, sorting, limits and offset.

**Returns**: Promise which resolves with the retrieved grid data. It is expected to be an Object with the next structure:

| Type                                                              | Name                | Description                                               |
|-------------------------------------------------------------------|---------------------|-----------------------------------------------------------|
| <span style="white-space:nowrap;"> [ ] \[String, Object\] </span> | result.records      | Requested grid records with applied limit, offset, filters and sorting. Array of arrays. Expected to have the next structure:             |
|                                                                   |                     | [                                                                                                               |
|                                                                   |                     |   ['id_1', {field1: 'val_11', field2: 'val_12', ...}],                                                          |
|                                                                   |                     |   ...,                                                                                                          |
|                                                                   |                     |   ['id_n', {field1: 'val_n1', field2: 'val_n2', ...}]                                                           |
|                                                                   |                     | ]     
| Object [ ]                                                        | result.extraRecords | Extra records. Array of grid records which correspond to ids requested in settings.extra                                         |
| Number                                                            | result.count        | Number of all records                                                                                                       |
| Object                                                            | result.totals       | Data for totals(bottom row with table data summary like 'Total costs' of costs table). Expected to be an Object with the next structure:  |
|                                                                   |                     | `{field1Name: 'value1', ..., fieldNName: 'valueN'} 

---

### async getRecord

{% highlight javascript %}
  async Object getRecord (Any id, string[] fields)
{% endhighlight %}

Get record by ID.

**Returns**: Promise which resolves with *Object* with record data. 
             It has the following structure: `{field1dName: 'value1', ..., fieldNName: 'valueN'}`.

---

### async update

{% highlight javascript %}
  async Array update(Object[][] changes)
{% endhighlight %}

Applies record changes.

**Returns**:

Promise which resolves with an Array where each item is an array of 2 fields:
 - in case of VALID record the array will consist of recordId and record data
 - in case of INVALID record the array will consist of recordId and ValidationErrors instance.

---

### getValidationDependency

{% highlight javascript %}
  string[] getValidationDependency(string[] fields)
{% endhighlight %}

**Returns**

Return fields(Array of string values) that need to be sent additionally to validate fields specified in passed parameters.
This method is required for creating group validators\(read details [here](/docs/validator.html)\).

---

### async isValidRecord

{% highlight javascript %}
  async ValidationErrors isValidRecord(Object record)
{% endhighlight %}

Validates a record.

**Returns**: Promise which resolves with *ValidationErrors*

---
