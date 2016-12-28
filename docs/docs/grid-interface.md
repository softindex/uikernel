---
title: Grid Model
id: grid-interface
prev: grid-columns.html
next: grid-model-xhr.html
---

Model that is able to create, read, edit, remove and validate records.

## Types
* [GridXhrModel](/docs/grid-model-xhr.html)
* [GridCollectionModel](/docs/grid-model-collection.html)

## Interface

### create

{% highlight javascript %}
 create(Object record, function callback)
{% endhighlight %}

Adds a record and returns its ID.

### Example
{% highlight javascript %}
model.create(
    {
      id:131,              name: "Sonya1",
      surname: "Weaver1",  phone: "555-01591",
      age: 59,             gender: 1
    },
function (err, response) {
   if (err){
       console.log(err);
       return;
   }
   console.log(response);//45
});
}
{% endhighlight %}

----

### read

{% highlight javascript %}
 read(Object settings, function callback)
{% endhighlight %}

Reads records, filters, sorts and limits them.

**settings:**

| Type     | Name             | Description                         |
|----------|------------------|-------------------------------------|
| string[] | settings.fields  | Fields                              |
| number   | settings.limit   | Limit                               |
| number   | settings.offset  | Offset                              |
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

### Example
{% highlight javascript %}
model.read(
    {
      limit: 10,
      offset: 0,
      sort: [['surname', 'asc']],
      fields: ['name', 'surname', 'phone', 'age', 'gender'],
      extra: [],
      filters: {search: 'John', age: '7'
    }
}, function (err, response) {
    if (err){
        console.log(err);
        return;
    }
    console.log(response);
    /*
    {
        "records": [
            [
                4,
                {
                    "id": 4, "name": "John",
                    "phone": "111-555", "age": 7,
                    "gender": 2, "surname": "Dom"
                }
            ]
        ],
        "count": 1
    }
    */
});
});
}
{% endhighlight %}

---

### getRecord

{% highlight javascript %}
 getRecord (id, string[] fields, function callback)
{% endhighlight %}

Get record by ID.

### Example
{% highlight javascript %}
model.getRecord(11, ['name', 'surname', 'phone', 'age', 'gender'],
function (err, response) {
    if (err){
        console.log(err);
        return;
    }
    console.log(response);
    /*
    {
        id: 11,
        name: "Sonya1",
        phone: "555-01591",
        age: 59,
        gender: 1,
        surname: "Weaver1"
    }
    */
});
{% endhighlight %}

---

### update

{% highlight javascript %}
update(Array[] changes, function callback)
{% endhighlight %}

Applies record changes.

### Example
{% highlight javascript %}
model.update(
    [
      [4, {"name":"Box","gender":1}]
    ],
function (err, response) {
    if (err){
        console.log(err);
        return;
    }
    console.log(response);
    /*
    {
        "changes":[
            [
                4,
                {
                    "id":4,"name":"Box",
                    "phone":"111-555","age":7,
                    "gender":1,"surname":"Dom"
                }
                ]
        ],
        "errors":[]
    }
    */
});
{% endhighlight %}

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
 ValidationErrors|null isValidRecord(Object record, function callback)
{% endhighlight %}

Validates a record.

### Example
{% highlight javascript %}
model.isValidRecord(
    {
      id: 4,
      name: 'Box',
      phone: '',
      surname: 'Dom'
    },
function (err, response) {
    if (err){
        console.log(err);
        return;
    }
    console.log(response);
    /*
    {
      "phone":["Invalid phone number."]
    }
    */
});
{% endhighlight %}

---



