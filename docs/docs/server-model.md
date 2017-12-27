---
title: Creating a model
id: server-model
prev: server-validation.html
next: editors.html
---

Our model will have the following methods: `read`, `getRecord`, `update`, `create`, `delete`, `isValidRecord`and `getValidationDependency`.

Here, we're going to use [MySQL](https://github.com/mysqljs/mysql) and [Squel](https://hiddentao.com/squel/).

First, let's define `read`. 

`userGrid/model.js`:
{% highlight javascript %}
read: function (settings) {
    var data = {};
    var query = squel.select()
      .field('SQL_CALC_FOUND_ROWS *')
      .from('getting_started')
      .limit(settings.limit || 10)
      .offset(settings.offset || 0);

    if (settings.sort) {
      var sort = settings.sort[0];
      query.order(sort[0], sort[1] === 'asc');
    }

    if (settings.filters) {
      if (settings.filters.search) {
        var pattern = `%${settings.filters.search}%`;
        query.where('name LIKE ? OR surname LIKE ?', pattern, pattern);
      }

      if (settings.filters.age) {
        query.where('age = ?', settings.filters.age);
      }

      if (settings.filters.gender) {
        query.where('gender = ?', settings.filters.gender);
      }
    }

    return mysql.query(query)
      .then(function (result) {
        data.records = result.map(function (elem) {
          return [elem.id, elem];
        });
        return mysql.query('SELECT FOUND_ROWS() as count')
      })
      .then(function (result) {
        data.count = result[0].count;
        return data;
      })
}
{% endhighlight %}

The `read` method returns an object with two properties: `records` and `count`(the number of returned records).
  
Pay attention to this part:
{% highlight javascript %}
data.records = result.map(function (elem) {
                    return [elem.id, elem];
                });
                return MySQL.query('SELECT FOUND_ROWS() as count')
{% endhighlight %}

The value of `records` is an array consisting of arrays that store a record id as their first element and 
a record as the second one. 

For example:

{% highlight javascript %}
[
   [1, {id:1, name: "Sonya", surname: "Weaver", phone: "555-0159", age: 59, gender: 2}],
   [2, {id:2, name: "Bates", surname: "Weaver", phone: "555-0144", age: 54, gender: 2}],
   [3, {id:3, name: "Rodriguez", surname: "Terrell", phone: "555-0146", age: 40, gender: 1}]
]
{% endhighlight %}


Let's define methods for validation:

{% highlight javascript %}
isValidRecord: validator.isValidRecord.bind(validator),

getValidationDependency: validator.getValidationDependency.bind(validator)
{% endhighlight %}

Next, we'll define `getRecord`:

{% highlight javascript %}
getRecord: function (id, fields) {
        var query = squel.select()
            .from('getting_started')
            .where('id = ?', id);

        return MySQL.query(query)
            .then(function (result) {
                return result[0];
            });
}
{% endhighlight %}

The `getRecord` method returns a single record. 

Here's the code for `create`:

{% highlight javascript %}
create: function (data) {
    // UIKernel validator doesn't check the presence of fields , so we assign default values
    data = Object.assign({
      name: '',
      surname: '',
      age: '',
      phone: '',
      gender: ''
    }, data);

    var query = squel.insert()
      .into("getting_started")
      .setFields(data);

    return this.isValidRecord(data)
      .then(function (validationErrors) {
        if (validationErrors.isEmpty()) {
          return mysql.query(query); // insert a record in a table if data is valid
        }
        
        return Promise.reject(validationErrors); // return validation errors if data is invalid
      })
      .then(function (result) {
        return result.insertId;
      })
  }
{% endhighlight %}
 
If data is valid, `create` returns the id of the inserted record. Otherwise, it returns validation errors.

Let's define the `update` method:

{% highlight javascript %}
  update: function (records) {
    var promises = records.map(function (record) {
      var recordId = record[0];
      var values = record[1];
      var query = squel.update()
        .table('getting_started')
        .setFields(values)
        .where('id = ?', recordId);

      return this.isValidRecord(values)
        .then(function (validationErrors) {
          if (validationErrors.isEmpty()) {
            return mysql.query(query)
              .then(function () {
                return this.getRecord(recordId);
              }.bind(this))
              .then(function (record) {
                 return [record.id, record]
              })
          }

          return [recordId, validationErrors];
        }.bind(this))
        .catch(function (err) {
          console.log(err);
        });
    }, this);

    return Promise.all(promises)
  }
{% endhighlight %}

This method returns validation errors and updated records. The return value format is the same as for the `read` method.

Validation is used to highlight the form fields which were filled wrongly.
Updated records are used for updating of the grid.

Finally, let's define `delete`:

{% highlight javascript %}
 delete: function (id) {
        var query = squel.delete()
            .from("getting_started")
            .where('id = ?', id);
        return MySQL.query(query)
    }
{% endhighlight %}
  
The return value of `delete` can be different. It depends on the definition of this method in the client model.