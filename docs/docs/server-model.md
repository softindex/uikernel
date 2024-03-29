---
title: Creating a model
id: server-model
prev: server-validation.html
next: server-db-connection.html
---

Here, we're going to use [MySQL](https://github.com/mysqljs/mysql) and [ts-sql-query](https://ts-sql-query.readthedocs.io/en/stable/).

For our model we need to define `UserTable` using `ts-sql-query`.

`sql/UserTable.ts`:
{% highlight typescript %}
import {Table} from 'ts-sql-query/Table';
import {DBConnection} from './MySqlPool';

// define helper type for ts-sql-query
const enum Gender {
  Male = 1,
  Female = 2
}

// define UserTable class
export class UserTable extends Table<DBConnection, 'TUser'> {
  id = this.autogeneratedPrimaryKey('id', 'int');
  name = this.column('name', 'string');
  surname = this.column('name', 'string');
  phone = this.column('phone', 'string');
  age = this.column('age', 'int');
  gender = this.column<Gender>('gender', 'enum', 'Gender');

  constructor() {
    super('users') // pass table name in db
  }
}

// create UserTable object
export const tUser = new UserTable();
{% endhighlight %}

Our model will have the following methods: `read`, `getRecord`, `update`, `create`, `delete`, `isValidRecord` and
`getValidationDependency`. It's methods of `IGridModel` interface.

`api/users/UserGridModel.ts`:
{% highlight typescript %}
export class UserGridModel implements IGridModel<number, UserRecord, Filters> {
  constructor(private pool: MySqlPool) {}
}
{% endhighlight %}

First, let's create some helper methods: `getSelect`, `getWhere` and `getOrderBy`.

`api/users/UserGridModel.ts`:
{% highlight typescript %}
// we need helper object with all columns
const availableColumns = {
  id: tUser.id,
  name: tUser.name,
  surname: tUser.surname,
  phone: tUser.phone,
  age: tUser.age,
  gender: tUser.gender
};

class UserGridModel {
  // ...
  private getSelect(fields: UserField[]) {
    const fieldsToPick = Object.fromEntries(fields.map((field) => [field, true]));
    return dynamicPick(avaliableColumns, fieldsToPick, ['id']);
  }

  private getWhere(filters: Filters | undefined) {
    return tUser.name
      .containsInsensitiveIfValue(filters?.search)
      .or(tUser.surname.containsInsensitiveIfValue(filters?.search))
      .or(tUser.phone.containsInsensitiveIfValue(filters?.search))
      .or(tUser.age.equalsIfValue(filters?.age))
      .or(tUser.gender.equalsIfValue(filters?.gender))
  }

  private getOrderBy(sort: [UserField, GridModelSortMode][] | undefinde) {
    if (!sort?.[0]) {
      return null;
    }

    const [sortField, sortDirection] = sort[0];
    return `${sortField} ${sortDirection === 'asc' ? 'asc' : 'desc'}`;
  }
  // ...
}
{% endhighlight %}

Let's define `read`.

`api/users/UserGridModel.ts`:
{% highlight typescript %}
class UserGridModel {
  // ...
  async read<TField extends UserField>({
    fields,
    filters,
    limit,
    offset,
    sort,
    extra
  }: GridModelReadParams<number, UserRecord, TField, Filters>): Promise<
    GridModelReadResult<number, UserRecord, TField>
  > {
    const connection = this.pool.getConnection();

    const select = this.getSelect(fields);
    const where = this.getWhere(filters);
    const orderBy = this.getOrderBy(sort);

    const {data, count} = await connection
      .selectFrom(tUser)
      .select(select)
      .where(where)
      .orderByFromStringIfValue(orderBy)
      .limitIfValue(limit)
      .offsetIfValue(offset)
      .executeSelectPage();

    let allData = data;
    if (extra && extra.length !== 0) {
      const extraData = await connection
        .selectFrom(tUser)
        .select(select)
        .where(tUser.id.in(extra))
        .executeSelectMany();
      allData = [...extraData, ...data];
    }

    const records = allData.map(({id, ...item}) => [id, item]) as [number, Pick<UserRecord, TField>][];

    return {
      records,
      count
    };
  }
  // ...
}
{% endhighlight %}

The `read` method returns an object with two properties: `records` and `count` (the number of returned records).

Pay attention to this part:
{% highlight typescript %}
const records = allData.map(({id, ...item}) => [id, item]);
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

Next, we'll define `getRecord`:

{% highlight typescript %}
class UserGridModel {
  // ...
  async getRecord<TField extends UserField>(id: number, fields: TField[]): Promise<Pick<UserRecord, TField>> {
    const connection = this.pool.getConnection();

    const select = this.getSelect(fields);

    const result = await connection
      .selectFrom(tUser)
      .where(tUser.id.equals(id))
      .select(select)
      .executeSelectOne();

    return result as Pick<UserRecord, TField>;
  }
  // ...
}
{% endhighlight %}

The `getRecord` method returns a single record.

Next, we need validation methods. Let's define:

{% highlight typescript %}
class UserGridModel {
  // ...
  async isValidRecord(record: Partial<UserRecord>): Promise<ValidationErrors<UserField>> {
    return userValidator.isValidRecord(record);
  }

  async getValidationDependency(fields: UserField[]): UserField[] {
    return userValidator.getValidationDependency(fields);
  }
  // ...
}
{% endhighlight %}

Here's the code for `create`:

{% highlight typescript %}
class UserGridModel {
  // ...
  async create(record: Partial<UserRecord>): Promise<number> {
    const validationResult = await this.isValidRecord({
      name: '',
      surname: '',
      phone: '',
      age: undefined,
      gender: undefined,
      ...record
    });

    if (!validationResult.isEmpty()) {
      throw validationResult;
    }

    const connection = this.pool.getConnection();
    return await connection
      .insertInto(tUser)
      .set(record as UserRecord)
      .returningLastInsertedId()
      .executeInsert();
  }
  // ...
}
{% endhighlight %}

If data is valid, `create` returns the id of the inserted record. Otherwise, it returns validation errors.

Let's define the `update` method:

{% highlight typescript %}
class UserGridModel {
  // ...
  async update(changes: [number, Partial<UserRecord>][]): Promise<GridModelUpdateResult<number, UserRecord>> {
    const result: GridModelUpdateResult<number, UserRecord> = [];

    for (const [recordId, record] of changes) {
      const validationResult = await this.isValidRecord(record);
      if (!validationResult.isEmpty()) {
        result.push([recordId, validationResult]);
        continue;
      }

      const connection = this.pool.getConnection();
      try {
        await connection
          .update(tUser)
          .set(record)
          .where(tUser.id.equals(recordId))
          .executeUpdate();
      } catch (err) {
        result.push([recordId, err as Error]);
        continue;
      }

      result.push([recordId, record]);
    }

    return result;
  }
  // ...
}
{% endhighlight %}

This method returns validation errors and updated records. The return value format is the same as for the `read` method.

Validation is used to highlight the form fields which were filled wrongly.
Updated records are used for updating of the grid.

Finally, let's define `delete`:

{% highlight typescript %}
class UserGridModel {
  // ...
  async delete(id: number): Promise<void> {
    const connection = this.pool.getConnection();
    await connection
      .deleteFrom(tUser)
      .where(tUser.id.equals(id))
      .executeDelete();
  }
  // ...
}
{% endhighlight %}
