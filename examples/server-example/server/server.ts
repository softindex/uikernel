import bodyParser from 'body-parser';
import express, {NextFunction, Request, Response} from 'express';
import {api} from './api';

const PORT = process.env.PORT ?? 8000;

const app = express();
app.use(bodyParser.json());
app.use('/api', api);
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message);
  res.sendStatus(500);
});
app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
