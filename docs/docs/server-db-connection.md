---
title: Set a connection to the database
id: server-db-connection
prev: server-model.html
next: editors.html
---

As mentioned, we're using a MySQL database for our example. Below is  the code for the example wrapper for working with database connections.

`server/common/mysql.js`
{% highlight javascript %}
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'passwordForRoot',
  database: 'database',
});

function executeQuery(connection, query) {
  return new Promise((resolve, reject) => {
    let text = query;
    let values = [];

    if (typeof query === 'object') {
      const param = query.toParam();
      text = param.text;
      values = param.values;
    }

    connection.query(text, values, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    });
  });
}

const MySQLWrapper = {
  /**
   * Executes query in separate pool connection
   */
  async query(query) {
    return await executeQuery(pool, query);
  },

  /**
   * Provide methods to execute in separate connection
   */
  getConnection() {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({
          async query(query) {
            return await executeQuery(connection, query);
          },
          release() {
            connection.release();
          }
        });
      });
    });
  }
};

module.exports = MySQLWrapper;
{% endhighlight %}

Also you need to create database, for this in mysql write this code

{% highlight javascript %}
CREATE DATABASE database
{% endhighlight %}

Finally, you need to create table 'records', in mysql write this code
{% highlight javascript %}
CREATE TABLE `records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
{% endhighlight %}