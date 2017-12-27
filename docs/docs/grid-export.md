---
title: Export
id: grid-export
prev: grid-adapters.html
next: grid-express-api.html
---

UIKernel allows to export grid data into JSON and CSV files.

### async exportGridData

{% highlight javascript %}
  const file = await UIKernel.exportGridData(gridModel, columns, viewColumns, exporter, settings);
{% endhighlight %}

Exports grid data into a file.

**Parameters**:

| Type                                                  | Name        | Description                  |
|-------------------------------------------------------|-------------|------------------------------|
| [GridModel](/docs/grid-interface.html)                | gridModel   | *Required*. The Grid model to export data from |
| Object                                                | columns     | *Required*. [Grid Columns](/docs/grid-columns.html) |
| <span style="white-space:nowrap;"> String [ ] </span> | viewColumns | *Required*. Array of visible columns names |
| Function                                              | exporter    | *Required*. Function used to export data in needed format. List of predefined exporters listed below. |
| Object                                                | settings    | *Required*. Additional settings in format specified below. |

**`settings` object format**

| Type     | Name         | Description                 |
|----------|--------------|-----------------------------|
| Object   | sort         | *Optional*. Sorting parameters. It is expected to be an Object in format {column: 'columnName', direction: 'asc'}, where direction may be 'asc' or 'desc'.
| Number   | limit        | *Optional*. Maximum amount of items in records array(which will be acquired by means of gridModel.read()).
| Number   | offset       | *Optional*. Offset from the beginning of the records array(which will be acquired by means of gridModel.read()).

**Returns**: Promise which resolves with Object in format {mime: 'mimeString', data: fileData}.
Here mime will correspond to the file format that you are exporting into(e.g. 'text/csv', 'application/json').

---

## Exporters

### async toJSON
{% highlight javascript %}
  await UIKernel.toJSON(data);
{% endhighlight %}

Serializes data into a JSON file.

### async toCSV

{% highlight javascript %}
  await UIKernel.toCSV(data);
{% endhighlight %}

Serializes data into a CSV file.

----

## Usage example

{% highlight javascript %}
  // Let's suggest it is an Express.js middleware
  function exportRecords(req, res, next) => {
    const gridModel = new UIKernel.Models.Grid.Collection({
      data: [
        [1, {id:1, name: "Sonya", surname: "Weaver", phone: "555-0159", age: 59, gender: 2}],
        [2, {id:2, name: "Bates", surname: "Weaver", phone: "555-0144", age: 54, gender: 2}],
        [3, {id:3, name: "Rodriguez", surname: "Terrell", phone: "555-0146", age: 40, gender: 1}]
        // ...
      ]
    });
    const columns = {
      id: {
        name: 'ID',
        render: ['id', record =>record.id]
      },
      name: {
        name: 'First Name',
        render: ['name', record =>record.name]
      },
      surname: {
        name: 'Last Name',
        render: ['surname', record => record.surname]
      },
      phone: {
        name: 'Phone',
        render: ['phone', record => record.phone]
      },
      age: {
        name: 'Age',
        render: ['age', record => record.age]
      },
      gender: {
        name: 'Gender',
        render: ['gender', (record) => {
          switch (record.gender) {
            case 1:
              return 'Male';
            case 2:
              return 'Female';
            default:
              return 'Undefined';
          }
        }]
      }
    };
    const viewColumns = ['name', 'surname', 'phone', 'age', 'gender'];
    const settings = {
      sort: {
        column: 'name',
        direction: 'asc'
      },
      limit: 100,
      offset: 10
    };

    try {
      const file = await UIKernel.exportGridData(gridModel, columns, viewColumns, UIKernel.toJSON, settings);
      const now = (new Date()).toJSON();
      res.header('Content-Type', file.mime)
        .header('Content-Disposition', `attachment; filename="users_${now}.json"`)
        .send(file.data);
    } catch(err) {
      res.status(400).send({ error: err.message })
    }
  };

{% endhighlight %}
