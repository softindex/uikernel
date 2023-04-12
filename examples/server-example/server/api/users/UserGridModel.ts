/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {dynamicPick} from 'ts-sql-query/dynamicCondition';
import {
  GridModelReadResult,
  GridModelReadParams,
  IGridModel,
  GridModelUpdateResult,
  GridModelSortMode
} from 'uikernel/lib/grid/models/types/IGridModel';
import ValidationErrors from 'uikernel/lib/validation/ValidationErrors';
import {MySqlPool} from '../../sql/MySqlPool';
import {tUser} from '../../sql/UserTable';
import {Filters, UserField, UserRecord} from './types';
import {userValidator} from './userValidator';

const avaliableColumns = {
  id: tUser.id,
  name: tUser.name,
  surname: tUser.surname,
  phone: tUser.phone,
  age: tUser.age,
  gender: tUser.gender
};

export class UserGridModel implements IGridModel<number, UserRecord, Filters> {
  constructor(private pool: MySqlPool) {}

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

    const extraData = await connection
      .selectFrom(tUser)
      .select(select)
      .where(tUser.id.inIfValue(extra))
      .executeSelectMany();

    const records = [...extraData, ...data].map(({id, ...item}) => [id, item]) as [
      number,
      Pick<UserRecord, TField>
    ][];

    return {
      records,
      count
    };
  }

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
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw validationResult;
    }

    const connection = this.pool.getConnection();

    const insertId = await connection
      .insertInto(tUser)
      .set(record as UserRecord)
      .returningLastInsertedId()
      .executeInsert();

    return insertId;
  }

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
        await connection.update(tUser).set(record).where(tUser.id.equals(recordId)).executeUpdate();
      } catch (err) {
        result.push([recordId, err as Error]);
        continue;
      }

      result.push([recordId, record]);
    }

    return result;
  }

  async delete(id: number): Promise<number> {
    const connection = this.pool.getConnection();

    const deleteId = await connection.deleteFrom(tUser).where(tUser.id.equals(id)).executeDelete();

    return deleteId;
  }

  async isValidRecord(record: Partial<UserRecord>): Promise<ValidationErrors<UserField>> {
    return userValidator.isValidRecord(record);
  }

  getValidationDependency(fields: UserField[]): UserField[] {
    return userValidator.getValidationDependency(fields);
  }

  private getSelect(fields: UserField[]) {
    const fieldsToPick = Object.fromEntries(fields.map((field) => [field, true]));

    const pickedColumns = dynamicPick(avaliableColumns, fieldsToPick, ['id']);

    return pickedColumns;
  }

  private getWhere(filters: Filters | undefined) {
    return tUser.name
      .containsInsensitiveIfValue(filters?.search)
      .or(tUser.surname.containsInsensitiveIfValue(filters?.search))
      .or(tUser.phone.containsInsensitiveIfValue(filters?.search))
      .or(tUser.age.equalsIfValue(filters?.age))
      .or(tUser.gender.equalsIfValue(filters?.gender));
  }

  private getOrderBy(sort: [UserField, GridModelSortMode][] | undefined) {
    if (!sort?.[0]) {
      return null;
    }

    const [sortField, sortDirection] = sort[0];

    return `${sortField} ${sortDirection === 'asc' ? 'asc' : 'desc'}`;
  }
}
