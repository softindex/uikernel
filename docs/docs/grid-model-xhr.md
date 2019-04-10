---
title: Grid Xhr Model
id: grid-model-xhr
prev: grid-interface.html
next: grid-model-collection.html
---

Grid Xhr Model is a class that interacts with the server API holding the data.

*Grid Xhr Model implements [Grid Model Interface](/docs/grid-interface.html){:target="_blank"}*

## Constructor

{% highlight javascript %}
  const gridXhrModel = new UIKernel.Models.Grid.Xhr(settings);
{% endhighlight %}

**Parameters**:

| Type                              | Name               | Description                                                                             |
|-----------------------------------|--------------------|-----------------------------------------------------------------------------------------|
| String                            | settings.api       | *Required*. API address to interact with.                                                           |
| [Validator](/docs/validator.html) | settings.validator | *Optional*. Validator. By default there is created a new [Validator](/docs/validator.html) instance.      |
| Function                          | settings.xhr       | *Optional*. XHR interface. By default is used built-in xhr function, but you can override it here.  |

## Methods

### async create

{% highlight javascript %}
 const createdRecId = await gridXhrModel.create(record);
{% endhighlight %}

Create a new grid record.
It sends `POST` request with header `{'Content-type': 'application/json'}` and `body = JSON.stringify(record)`
to the URI = settings.api parameter taken in the constructor).
Validation is supposed to be performed at the server
(but you can also do explicit local validation calling gridXhrModel.isValidRecord(record) before).
If the server response is successful(Status 200) and it has field `error`(which is expected to be validation errors),
the ValidationErrors instance will be thrown.
In case of unexpected error(e.g. server response status !== 200) an Error instance will be thrown.
If the server response is successful(Status 200) and it doesn't have the field `error`,
so `serverResponse.data` will be resolved.

**Parameters**:

| Type     | Name    | Description                                 |
|----------|---------|---------------------------------------------|
| Object   | record  | *Required*. The record data to be created. Expected structure: `{field1Name: 'value1', ..., fieldNName: 'valueN'} |

**Example**:

{% highlight javascript %}
  try {
    const createdRecId = await gridXhrModel.create({
      id:131,
      name: "Sonya",
      surname: "Weaver",
      phone: "555-01591",
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
  const gridData = await gridXhrModel.read(settings);
{% endhighlight %}

Retrieves grid records from the server.
It sends `GET` request (or `POST` if received query string too large) to the URI = `settings.api` parameter taken in the constructor).
In successful case(response status == 200) returns server response, otherwise throws an error.

**Parameters**:

| Type                                                      | Name             | Description                                                                            |
|-----------------------------------------------------------|------------------|----------------------------------------------------------------------------------------|
| String [ ]                                                | settings.fields  | *Optional*. Array o field names(string values) to retrieve                                                        |
| Number                                                    | settings.limit   | *Optional*. Maximum amount of result items                                                                      |
| Number                                                    | settings.offset  | *Optional*. Offset from the beginning of the records array                                                                     |
| Object                                                    | settings.filters | *Optional*. Object with filtering criteria. The structure of the object is up to your servers' API.                                                      |
| <span style="white-space:nowrap;"> String [ ] [ ] </span> | settings.sort    | *Optional*. Sorting order. Array of sorting parameters where each parameter is an array of 2 string values: sorted column name and sorting mode(asc/desc). |
| String [ ]                                                | settings.extra   | *Optional*. Record IDs, that are needed to be fetched additionally(despite filtering criteria)(explicitly returned in a result). Usually they are edited records that are displayed in spite of filters and the current page of the grid. |

**Returns**: Promise which resolves with the server response which is expected to be an Object with the next structure:

| Type                                                            | Name                | Description                                               |
|-----------------------------------------------------------------|---------------------|-----------------------------------------------------------|
| <span style="white-space:nowrap;"> [ ] [String, Object] </span> | result.records      | Requested grid records with applied limit, offset, filters and sorting. Array of arrays. Expected to have the next structure:             |
|                                                                 |                     | [                                                                                                                                         |
|                                                                 |                     |   ["recordID1", {"field1Name": "value11", ..., "fieldNName":"value1N"}],                                                                  |
|                                                                 |                     |   ["recordID2", {"field1Name": "value21", ..., "fieldNName":"value2N"}],                                                                  |
|                                                                 |                     |   ...                                                                                                                                     |
|                                                                 |                     | ]                                                                                                                                         |
| Object [ ]                                                      | result.extraRecords | Extra records. Array of grid records which correspond to ids requested in settings.extra                                         |
| Number                                                          | result.count        | Number of records in `result.records`                                                                                                      |
| Object                                                          | result.totals       | Data for totals(bottom row with table data summary like 'Total costs' of costs table). Expected to be an Object with the next structure:  |
|                                                                 |                     | `{field1Name: 'value1', ..., fieldNName: 'valueN'}                                                                                        |

**Example**:

{% highlight javascript %}
  try {
     const gridData = await gridXhrModel.read({
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
  const gridRecord = await gridXhrModel.getRecord(id, fields);
{% endhighlight %}

Fetch record data by `id`.
It sends `GET` request to the URI = '/:api/:id' (where `:api` is settings.api parameter taken in the constructor, `:id` = passed argument) 
with header `{'Content-type': 'application/json'}` and `body = JSON.stringify(fields)`
In successful case(response status == 200) returns server response, otherwise throws an error.

**Parameters**:

| Type       | Name    | Description                         |
|------------|---------|-------------------------------------|
| Any        | id      | *Required*. Record id to get data of.                              |
| String[ ]  | fields  | *Optional*. Grid fields to get values of. By default there is returned values of all the grid fields.   |

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
  const gridUpdateResult = await gridXhrModel.update(changes);
{% endhighlight %}

Applies records changes.
It sends `PUT` request with header `{'Content-type': 'application/json'}` and `body = JSON.stringify(changes)`
to the URI = settings.api parameter taken in the constructor.
Validation is supposed to be performed at the server (but you can also perform an explicit local validation calling
gridXhrModel.isValidRecord(record) before).
If the server response is successful(Status 200) then it will be resolved an array containing joined items of parsed 
server response from `serverResponse.changes`, `serverResponse.validation` (ValidationErrors instance will be created
for corresponding items) and `serverResponse.errors` (Error instance will be created for corresponding items).
In case of unexpected error(e.g. server response status !== 200) an Error instance will be thrown.

**Parameters**:

| Type                                                             | Name    | Description                                 |
|------------------------------------------------------------------|---------|---------------------------------------------|
| <span style="white-space:nowrap;"> \[ \] \[Any, Object\] </span> | changes | *Required*. Array of changed records data, where each record data is an array of 2 fields: recordId(any serializable value) and record data(Object). |

**Example**:

{% highlight javascript %}
  try {
    const gridUpdateResult = await gridXhrModel.update(
      [
        [4, {"name": "George", "gender": 1}],
        [5, 'something very wrong'],
        [7, {"name": "Alex", "gender": 'tomato'}]
      ]
    );
    
    /*
      Let's supose our server returned such a response in the HTTP body:
      {
        "changes": [
          [4, {"name": "George", "gender": 1}]
        ],
        "validation": [
          [7, {"gender": ["Invalid gender."]}]
        ],
        "errors": [
          // Note that such error should be put here if it is about some record,
          // else it should be returned appropriate server status
          [5, {"message": "Invalid record shape"}]
        ]
      }
    */
    
    console.log(gridUpdateResult);
    /*
    [
      // Applied valid record changes item
      [4, {"name": "George", "gender": 1}],
      // Error instance
      [5, Error("Invalid record shape")],
      // Shape: [recordId, validationErrorsInstance]
      [7, {"gender": ["Invalid gender."]}]
    ]
    */
  } catch(err) {
    console.log(err);
  }
});
{% endhighlight %}

---

### getValidationDependency

{% highlight javascript %}
  const dependantFields = gridXhrModel.getValidationDependency(fields);
{% endhighlight %}

Return fields(Array of string values) that need to be sent additionally to validate fields specified in passed parameters.
This method is required for creating group validators\(read details [here](/validator.html)\).

**Parameters**:

| Type       | Name    | Description                                                           |
|------------|---------|-----------------------------------------------------------------------|
| String[]   | fields  | *Required*. Array of fields to get their validation-dependant fields  |

---

### async isValidRecord

{% highlight javascript %}
  const validationRes = await gridXhrModelisValidRecord(record);
{% endhighlight %}

Validate specified record by means of the validator passed in the constructor, or the default one.
In case of an unexpected error it will be thrown(e.g. if there are async validation rules and the Internet connection doesn't work, or server responds with status !== 200) will be thrown.

**Parameters**:

| Type       | Name   | Description                                                                                                      |
|------------|--------|------------------------------------------------------------------------------------------------------------------|
| Object     | record | *Required*. Record to validate. Expected structure: `{field1Name: 'value1', ..., fieldNName: 'valueN'}`      |

**Returns**: Promise which resolves with *ValidationErrors*

{% highlight javascript %}
  try {
    const validationRes = await gridXhrModel model.isValidRecord({
      id: 4,
      name: 'Box',
      phone: '',
      surname: 'Dom'
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
