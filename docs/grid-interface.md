---
title: Grid Model
id: grid-interface
prev: grid-component.html
next: grid-model-xhr.html
---

Model that is able to create, read, edit, remove and validate records.

## Types
* [GridXhrModel](/docs/grid-model-xhr.html)
* [GridCollectionModel](/docs/grid-model-collection.html)

## Interface

### create

{% highlight javascript %}
 create(Object record, function callback(string error, number recordId))
{% endhighlight %}

Adds a record and returns its ID.

----

### read

{% highlight javascript %}
 read(Object settings, function callback(Error error, Object[] result))
{% endhighlight %}

Reads records, filters, sorts and limits them.

**settings:**

| Type     | Name             | Description                         |
|----------|------------------|-------------------------------------|
| string[] | settings.fields  | Fields                              |
| number   | settings.limit   | Limit                               |
| Object   | settings.filters | Filter values object                |
| Array    | settings.sort    | Sort parameters                     |
| Array    | settings.extra     | Record IDs, we need to get for sure |

*settings.extra* accepts record IDs, that need to be explicitly returned in a result.
Usually they are edited records, that are displayed in spite of filters and current page.

**result:**

| Type    | Name                | Description                                               |
|---------|---------------------|-----------------------------------------------------------|
| Array[] | result.records      | Required records                                      |
| Array[] | result.extraRecords | Extra records                      |
| number  | result.count        | Filtered records count |
| Object  | result.totals       | Totals line      |

---

### getRecord
 
{% highlight javascript %}
 getRecord (id, string[] fields, function callback(Error error, Object record))
{% endhighlight %}

Get record by ID.
 
---

### update

{% highlight javascript %}
 update(Array[] changes, function callback(Error error, Array[] changes))
{% endhighlight %}
 
Applies record changes.

---

### getValidationDependency

{% highlight javascript %}
  string[] getValidationDependency(string[] fields)
{% endhighlight %}

Returns fields that need to be sent additionally to validate fields `field`. Such a method necessity
is caused with the ability to create group validators.

---

### isValidRecord

{% highlight javascript %}
 ValidationErrors|null isValidRecord(Object record, function callback(Error error, ValidationErrors result))
{% endhighlight %}

Validates a record.

---
 


