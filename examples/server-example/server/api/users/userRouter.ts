import {Router} from 'express';
import UIKernel from 'uikernel';
import {MySqlPool} from '../../sql/MySqlPool';
import {Filters, UserRecord} from './types';
import {UserGridModel} from './UserGridModel';

const pool = MySqlPool.create();

const model = new UserGridModel(pool);

export const userRouter: Router = UIKernel.gridExpressApi<number, UserRecord, Filters>()
  .model(model)
  .getRouter();

userRouter.delete('/:recordId', (req, res, next) => {
  const id = Number(req.params.recordId);

  if (isNaN(id)) {
    throw new Error('Invalid ID');
  }

  model
    .delete(id)
    .then(() => res.end())
    .catch(next);
});
