---
title: Set a connection to the database
id: server-db-connection
prev: server-model.html
next: editors.html
---

As mentioned, we're using a MySQL database for our example. Below is  the code for the example wrapper for working with database connections.

`server/common/mysql.js`
{% highlight javascript %}

const pool = mysql.createPool(config.db);

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
  })

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
{% endhighlight %}
