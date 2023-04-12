import mysql, {Pool, PoolConfig} from 'mysql';
import {MySqlConnection} from 'ts-sql-query/connections/MySqlConnection';
import {MySqlPoolQueryRunner} from 'ts-sql-query/queryRunners/MySqlPoolQueryRunner';

const sqlConfig = {
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
    this.pool = mysql.createPool(config);
  }

  getConnection(): DBConnection {
    const sqlQueryRunner = new MySqlPoolQueryRunner(this.pool);

    return new DBConnection(sqlQueryRunner);
  }
}
