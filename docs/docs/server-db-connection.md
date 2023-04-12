---
title: Set a connection to the database
id: server-db-connection
prev: server-model.html
next: editors.html
---

As mentioned, we're using a MySQL database for our example. Below is  the code for the example wrapper for working with database connections.

`sql/MySqlPool.ts`:
{% highlight typescript %}
import sql, {Pool, PoolConfig} from 'mysql';
import {MySqlConnection} from 'ts-sql-query/connections/MySqlConnection';
import {MySqlPoolQueryRunner} from 'ts-sql-query/queryRunners/MySqlPoolQueryRunner';

const sqlConfig: PoolConfig = {
  host: 'localhost',
  user: 'test',
  password: 'hello_world',
  database: 'uikernel_test'
};

export class DBConnection extends MySqlConnection<'DBConnection'> {}

export class MySqlPool {
  static create(): MySqlPool {
    return new MySqlPool(sqlConfig);
  }

  private pool: Pool;

  constructor(config: PoolConfig) {
    this.pool = sql.createPool(config);
  }

  getConnection(): DBConnection {
    const sqlQueryRunner = new MySqlPoolQueryRunner(this.pool)

    return new DBConnection(sqlQueryRunner);
  }
}
{% endhighlight %}

Then let's setup and configure MySql.

For install MySql you can read [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)

And then we need configure database.

Create user:
{% highlight sql %}
CREATE USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY 'hello_world';
{% endhighlight %}

Create database:
{% highlight sql %}
CREATE DATABASE uikernel_test;
{% endhighlight %}

And create table:
{% highlight sql %}
USE uikernel_test;
CREATE TABLE users (
  id SERIAL,
  name VARCHAR(30),
  surname VARCHAR(30),
  phone VARCHAR(14),
  age TINYINT UNSIGNED,
  gender TINYINT UNSIGNED
);
{% endhighlight %}
