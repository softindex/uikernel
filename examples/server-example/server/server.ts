import bodyParser from 'body-parser';
import express, {NextFunction, Request, Response} from 'express';
import {MysqlError} from 'mysql';
import {api} from './api';

const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(bodyParser.json());

app.use('/api', api);

app.use((err: Error & MysqlError, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message ?? err.sqlMessage ?? 'Error');

  res.sendStatus(500);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
