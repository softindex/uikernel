import { Request, RequestHandler, Response } from 'express';
declare function asyncServerRouteHandler(handler: (req: Request, res: Response) => Promise<void>): RequestHandler;
export default asyncServerRouteHandler;
