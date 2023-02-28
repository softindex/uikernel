---
title: Grid Collection Model
id: grid-model-collection
prev: grid-model-xhr.html
next: filter-adapter.html
---

Grid Collection Model is a class which keeps its data inside
(works with an array of data passed to it as a parameter) and doesn't interact with the server.

*Grid Collection Model implements [Grid Model Interface](/docs/grid-interface.html){:target="_blank"}*

## Constructor

{% highlight javascript %}
  const gridCollectionModel = new UIKernel.Models.Grid.Collection(settings);
{% endhighlight %}

**Parameters**:

| Type                                                             | Name                      | Description                          |
|------------------------------------------------------------------|---------------------------|--------------------------------------|
| <span style="white-space:nowrap;"> \[ \] \[Any, Object\] </span> | settings.data             | *Optional*. Initial data. Array of records, where each record is an array of 2 fields: recordId(any serializable value) and record data(Object). It has the next structure: |
|                                                                  |                           | [                                                                                                               |
|                                                                  |                           |   ['id_1', {field1: 'val_11', field2: 'val_12', ...}],                                                          |
|                                                                  |                           |   ...,                                                                                                          |
|                                                                  |                           |   ['id_n', {field1: 'val_n1', field2: 'val_n2', ...}]                                                           |
|                                                                  |                           | ]                                                                                                               |
| Function                                                         | settings.filtersHandler   | *Optional*. Function to perform filtration in gridCollectionModel.read() method in according to the passed filtration rules |
| [Validator](/docs/validator.html)                                | settings.validator        | *Optional*. Validator. By default there is created a new [Validator](/docs/validator.html) instance.                        |
| String[]                                                         | settings.requiredFields   | *Optional*. Fields which should be always present in model's data, so if they are omitted in the data passed to the gridCollectionModel.create() method, these fields will be added anyway in the created record(with undefined value) |

**`filtersHandler`s arguments:**

| Type                                                             | Name    | Description                         |
|------------------------------------------------------------------|---------|-------------------------------------|
| <span style="white-space:nowrap;"> \[ \] \[Any, Object\] </span> | data    | Array of records to be performed, where each record is an array of 2 fields: recordId(any serializable value) and record data(Object). It has the next structure: |
|                                                                  |         | [                                                                                                               |
|                                                                  |         |   ['id_1', {field1: 'val_11', field2: 'val_12', ...}],                                                          |
|                                                                  |         |   ...,                                                                                                          |
|                                                                  |         |   ['id_n', {field1: 'val_n1', field2: 'val_n2', ...}]                                                           |
|                                                                  |         | ]                                                                                                               |
| Object                                                           | filters | Object with filtering criteria which will be passed in `settings` parameter of gridCollectionModel.read() method                                                       |

---

## Methods

### setData

{% highlight javascript %}
  gridCollectionModel.setData(data);
{% endhighlight %}

Set data of the model. The old data will be rewritten.

**Parameters**:

| Type                                                              | Name    | Description                          |
|-------------------------------------------------------------------|---------|--------------------------------------|
| <span style="white-space:nowrap;"> \[ \] \[Any, Object\] </span>  | data    | Array of records, where each record is an array of 2 fields: recordId(any serializable value) and record data(Object). It has the next structure: |
|                                                                   |         | [                                                                                                               |
|                                                                   |         |   ['id_1', {field1: 'val_11', field2: 'val_12', ...}],                                                          |
|                                                                   |         |   ...,                                                                                                          |
|                                                                   |         |   ['id_n', {field1: 'val_n1', field2: 'val_n2', ...}]                                                           |
|                                                                   |         | ]                                                                                                               |

---

### async create

{% highlight javascript %}
  const createdRecId = await gridCollectionModel.create(record);
{% endhighlight %}

Adds a record to the grid model data and returns an ID of the added record.

**Parameters**:

| Type     | Name    | Description                                 |
|----------|---------|---------------------------------------------|
| Object   | record  | *Required*. The record data to be created. Expected structure: `{field1Name: 'value1', ..., fieldNName: 'valueN'} |

**Returns**: Promise which resolves with an id of the created record.
             If passed record is invalid then the ValidationErrors instance will be thrown.

**Example**:

{% highlight javascript %}
  try {
    const createdRecId = await gridCollectionModel.create({
      id:131,
      name: "Sonya",
      surname: "Weaver",
      phone: "55501591",
      age: 59,
      gender: 2
    });
    console.log(createdRecId);   //45
  } catch(err) {
    console.log(err);
  }
{% endhighlight %}

----

### async read

{% highlight javascript %}
  const gridData = await gridCollectionModel.read(settings);
{% endhighlight %}

Retrieves grid records from the internal data structure.

**settings:**

| Type      | Name             | Description                         |
|-----------|------------------|-------------------------------------|
| String[ ] | settings.fields  | *Optional*. Field names to read    |
| Number    | settings.limit   | *Optional*. Maximum amount of result items      |
| Number    | settings.offset  | *Optional*. Offset from the beginning of the records array   |
| Object    | settings.filters | *Optional*. Object with filtering criteria. The structure of the object is up to you. The object will be passed to the function `filtersHandler()` taken in the constructor's `settings` argument.  |
| Array     | settings.sort    | *Optional*. Sorting order. Array of sorting parameters where each parameter is an array of 2 string values: sorted column name and sorting mode(asc/desc).             |
| Array     | settings.extra   | *Optional*. Record IDs, that are needed to be fetched additionally(despite filtering criteria)(explicitly returned in a result). Usually they are edited records that are displayed in spite of filters and the current page.   |

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
|                                                                   |                     | `{field1Name: 'value1', ..., fieldNName: 'valueN'}                                                                                        |

**Example**:

{% highlight javascript %}
  try {
     const gridData = await gridCollectionModel.read({
      limit: 10,
      offset: 0,
      sort: [['surname', 'asc']],
      fields: ['name', 'surname', 'phone', 'age', 'gender'],
      extra: [],
      filters: {search: 'John', age: '7'}
    });
    console.log(gridData);
    /*
    {
      "records": [
        [
          4,
          {
              "id": 4,
              "name": "Joanne",
              "surname": "Rowling",
              "phone": "111-555",
              "age": 41,
              "gender": 2
          }
        ]
      ],
      "count": 1
    }
    */
  } catch(err) {
    console.log(err);
  }
});
{% endhighlight %}

---

### async getRecord

{% highlight javascript %}
  const gridRecord = await gridCollectionModel.getRecord (id, fields);
{% endhighlight %}

Get record by ID.

**Parameters**:

| Type         | Name    | Description                         |
|--------------|---------|-------------------------------------|
| Any          | id      | *Required*. Record id to get data of.                              |
| String [ ]   | fields  | *Optional*. Grid fields to get values of. By default there is returned values of all the grid fields.   |

**Returns**: Promise which resolves with *Object* with record data. 
             It has the following structure: `{field1dName: 'value1', ..., fieldNName: 'valueN'}`.

**Example**:

{% highlight javascript %}
  try {
    const gridRecord = await gridXhrModel.getRecord(11, ['name', 'surname', 'phone', 'age', 'gender']);
    console.log(response);
    /*
    {
        id: 11,
        name: "Sonya",
        phone: "555-01591",
        age: 59,
        gender: 2,
        surname: "Weaver"
    }
    */
  } catch(err) {
    console.log(err);
  }
});
{% endhighlight %}

---

### async update

{% highlight javascript %}
  const gridUpdateResult = await gridCollectionModel.update(changes);
{% endhighlight %}

Applies record changes: validates each records and applies changes of valid records.

**Parameters**:

| Type                                                           | Name    | Description                                 |
|----------------------------------------------------------------|---------|---------------------------------------------|
| <span style="white-space:nowrap;"> [ ] \[Any, Object\] </span> | changes | *Required*. Array of changed records data, where each record data is an array of 2 fields: recordId(any serializable value) and record data(Object). |

**Returns**:

Promise which resolves with an Array where each item is an array of 2 fields:
 - in case of VALID record the array will consist of recordId and record data(Note that it will be returned only changes, not the full record).
 - in case of INVALID record the array will consist of recordId and ValidationErrors instance.

**Example**:

{% highlight javascript %}
  const gridUpdateResult = await gridCollectionModel.update(
    [
      [4, {"name": "George", "gender": 1}],
      [7, {"name": "Alex", "gender": 'tomato'}]
    ]
  );
  console.log(gridUpdateResult);
  /*
    [
      [4, {"name": "George", "gender": 1}],       // Applied valid record changes item
      [7, {"gender": ["Invalid gender."]}]        // ValidationErrors instance
    ]
  */
});
{% endhighlight %}

---

### getValidationDependency

{% highlight javascript %}
  const dependantFields = gridCollectionModel.getValidationDependency(fields);
{% endhighlight %}

**Returns**

Return fields(Array of string values) that need to be sent additionally to validate fields specified in passed parameters.
This method is required for creating group validators\(read details [here](/docs/validator.html)\).

**Parameters**:

| Type       | Name    | Description                                                           |
|------------|---------|-----------------------------------------------------------------------|
| String [ ] | fields  | *Required*. Array of fields to get their validation-dependant fields  |

---

### async isValidRecord

{% highlight javascript %}
  const validationRes = await gridCollectionModel.isValidRecord(record);
{% endhighlight %}

Validate specified record by means of the validator passed in the constructor, or the default one.
In case of an unexpected error it will be thrown(e.g. if there are async validation rules and the Internet connection doesn't work, or server responds with status !== 200) will be thrown.

**Parameters**:

| Type       | Name    | Description                                          |
|------------|---------|------------------------------------------------------|
| Object     | record  | *Required*. Record to validate. Expected structure:  |
|            |         |  `{field1Name: 'value1', ..., fieldNName: 'valueN'}` |

**Returns**: Promise which resolves with *ValidationErrors*

{% highlight javascript %}
  try {
    const validationRes = await gridXhrModel model.isValidRecord({
      id: 4,
      name: 'Michal',
      phone: '',
      surname: 'Jordan'
    });
    console.log(validationRes);
    /*
      {
        "phone":["Invalid phone number."]
      }
    */
  } catch(unexpectedError) {
    console.log(unexpectedError);
  }
});
{% endhighlight %}

_________

> Check out [Usage Example](/docs/first-grid-component.html).
