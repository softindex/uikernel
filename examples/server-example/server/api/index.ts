import {Router} from 'express';
import {userRouter} from './users/userRouter';

export const api = Router();

api.use('/users', userRouter);
