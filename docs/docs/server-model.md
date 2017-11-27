---
title: Creating a model
id: server-model
prev: server-validation.html
next: server-db-connection.html
---

Our model will have the following methods: `read`, `getRecord`, `update`, `create`, `delete`, `isValidRecord`and `getValidationDependency`.

Here, we're going to use [MySQL](https://github.com/mysqljs/mysql) and [Squel](https://hiddentao.com/squel/).

First, let's define `read`.

`userGrid/model.js`:
{% highlight javascript %}
async read(settings) {
    const query = squel.select()
      .from('records')
      .field('SQL_CALC_FOUND_ROWS id')
      .limit(settings.limit || 10)
      .offset(settings.offset || 0);

    for (const fieldName of settings.fields) {
      if (FIELDS.includes(fieldName)) {
        query.field(fieldName);
      }
    }

    if (settings.sort) {
      const [sortField, sortDirection] = settings.sort[0];
      if (FIELDS.includes(sortField)) {
        query.order(sortField, sortDirection === 'asc');
      }
    }

    if (settings.filters) {
      if (settings.filters.search) {
        const pattern = `%${settings.filters.search}%`;
        query.where('name LIKE ? OR surname LIKE ?', pattern, pattern);
      }
      if (settings.filters.age) {
        query.where('age = ?', settings.filters.age)
      }
      if (settings.filters.gender) {
        query.where('gender = ?', settings.filters.gender)
      }
    }

    const data = {};
    const connection = await MySQLWrapper.getConnection();

    try {
      const mainQueryResult = await connection.query(query);
      const secondQueryResult = await connection.query('SELECT FOUND_ROWS() as count');
      data.records = mainQueryResult.map(elem => [elem.id, elem]);
      data.count = secondQueryResult[0].count;
    } finally {
      connection.release();
    }

    return data;
  }
{% endhighlight %}

The `read` method returns an object with two properties: `records` and `count`(the number of returned records).

Pay attention to this part:
{% highlight javascript %}
data.records = mainQueryResult.map(elem => [elem.id, elem]);
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
async isValidRecord(record) {
    return await validator.isValidRecord(record);
  },

async getValidationDependency(record) {
    return await validator.getValidationDependency(record);
  },
{% endhighlight %}

Next, we'll define `getRecord`:

{% highlight javascript %}
async getRecord(id, fields) {
    const query = squel.select()
      .from('records')
      .where('id = ?', id);

    for (const fieldName of fields) {
      if (FIELDS.includes(fieldName)) {
        query.field(fieldName);
      }
    }

    const result = await MySQLWrapper.query(query);
    return result[0];
  }
{% endhighlight %}

The `getRecord` method returns a single record.

Here's the code for `create`:

{% highlight javascript %}
async create(data) {
    data = {
      name: null,
      surname: null,
      phone: null,
      age: null,
      gender: null,
      ...data
    };
    const query = squel.insert()
      .into('records');
    for (const fieldName of FIELDS) {
      if (data.hasOwnProperty(fieldName)) {
        query.set(fieldName, data[fieldName]);
      }
    }

    const validationResult = await this.isValidRecord(data);
    if (!validationResult.isEmpty()) {
      throw validationResult;
    }

    const queryResult = await MySQLWrapper.query(query);
    return queryResult.insertId;
  }
{% endhighlight %}

If data is valid, `create` returns the id of the inserted record. Otherwise, it returns validation errors.

Let's define the `update` method:

{% highlight javascript %}
  async update(records) {
      const result = [];

      for (const [recordId, record] of records) {
        const query = squel.update()
          .table('records')
          .where('id = ?', recordId);

        for (const fieldName of FIELDS) {
          if (record.hasOwnProperty(fieldName)) {
            query.set(fieldName, record[fieldName]);
          }
        }

        const validationResult = await this.isValidRecord(record);
        if (!validationResult.isEmpty()) {
          result.push([recordId, validationResult]);
          continue;
        }

        await MySQLWrapper.query(query);
        result.push([recordId, record]);
      }

      return result;
    }
{% endhighlight %}

This method returns validation errors and updated records. The return value format is the same as for the `read` method.

Validation is used to highlight the form fields which were filled wrongly.
Updated records are used for updating of the grid.

Finally, let's define `delete`:

{% highlight javascript %}
 async delete(id) {
   const query = squel.delete()
     .from('getting_started')
     .where('id = ?', id);
   return MySQLWrapper.query(query)
  }
{% endhighlight %}

The return value of `delete` can be different. It depends on the definition of this method in the client model.